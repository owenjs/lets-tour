import React, { FC } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ILetsTourProviderProps, LetsTourProvider, TLetsTourStep, useLetsTourContext } from "../index";

const scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

describe("Lets Tour", () => {
  let STEPS: TLetsTourStep[];
  let Popover: FC;

  const exec = (props?: Omit<ILetsTourProviderProps, "steps" | "Component">) => {
    const App = () => {
      const { handleStartTour, handleEndTour } = useLetsTourContext();

      return (
        <>
          <div data-tour-step="1">Step 1 Item</div>
          <div data-tour-step="2">Step 2 Item</div>
          <div data-tour-step="3">Step 3 Item</div>

          <button onClick={handleStartTour}>Open Tour</button>
          <button onClick={handleEndTour}>Close Tour</button>
        </>
      );
    };

    return render(
      <LetsTourProvider steps={STEPS} Component={Popover} {...props}>
        <App />
      </LetsTourProvider>,
      {
        container: document.body
      }
    );
  };

  beforeEach(() => {
    STEPS = [
      {
        selector: `[data-tour-step="1"]`
      },
      {
        selector: `[data-tour-step="2"]`
      },
      {
        selector: `[data-tour-step="3"]`
      }
    ];

    Popover = () => <div>Popover</div>;

    scrollIntoViewMock.mockReset();
  });

  it("should render without popover", () => {
    const { container } = exec();

    expect(screen.queryByText("Popover")).toBeNull();

    expect(container).toMatchSnapshot();
  });

  it("should render popover if open initially", () => {
    const { container } = exec({
      isOpen: true
    });

    waitFor(() => {
      expect(screen.queryByText("Popover")).not.toBeNull();
    });

    expect(container).toMatchSnapshot();
  });

  it("should render popover if user triggers 'handleStartTour'", () => {
    exec();

    fireEvent.click(screen.getByText("Open Tour"));

    expect(screen.queryByText("Popover")).not.toBeNull();
  });

  it("should fire the 'onOpen' handler if user triggers 'handleStartTour'", () => {
    const onOpen = jest.fn();

    exec({
      onOpen
    });

    fireEvent.click(screen.getByText("Open Tour"));

    expect(onOpen).toHaveBeenCalledTimes(1);
  });

  it("should fire the 'onChange' handler if user triggers 'handleStartTour'", () => {
    const onChange = jest.fn();

    exec({
      onChange
    });

    fireEvent.click(screen.getByText("Open Tour"));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("should close popover if user triggers 'handleEndTour'", () => {
    exec({
      isOpen: true
    });

    fireEvent.click(screen.getByText("Close Tour"));

    expect(screen.queryByText("Popover")).toBeNull();
  });

  it("should fire the onClose handler if user triggers 'handleEndTour'", () => {
    const onClose = jest.fn();

    exec({
      isOpen: true,
      onClose
    });

    fireEvent.click(screen.getByText("Close Tour"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("should fire the 'onChange' handler if user triggers 'handleEndTour'", () => {
    const onChange = jest.fn();

    exec({
      isOpen: true,
      onChange
    });

    fireEvent.click(screen.getByText("Close Tour"));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("should fire the 'onChange' handler twice if user triggers 'handleStartTour' and 'handleEndTour'", () => {
    const onChange = jest.fn();

    exec({
      onChange
    });

    fireEvent.click(screen.getByText("Open Tour"));

    fireEvent.click(screen.getByText("Close Tour"));

    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("should move the Tour forward by 1 if user triggers 'handeNext'", () => {
    Popover = () => {
      const { currentStep, handleNext } = useLetsTourContext();

      return (
        <>
          Popover {currentStep}
          <button onClick={handleNext}>Next</button>
        </>
      );
    };

    exec({
      isOpen: true
    });

    expect(screen.queryByText("Popover 0")).not.toBeNull();

    fireEvent.click(screen.getByText("Next"));

    expect(screen.queryByText("Popover 1")).not.toBeNull();
  });

  it("should move the Tour backwards by 1 if user triggers 'handleBack'", () => {
    Popover = () => {
      const { currentStep, handleNext, handleBack } = useLetsTourContext();

      return (
        <>
          Popover {currentStep}
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </>
      );
    };

    exec({
      isOpen: true
    });

    expect(screen.queryByText("Popover 0")).not.toBeNull();

    fireEvent.click(screen.getByText("Next"));

    expect(screen.queryByText("Popover 1")).not.toBeNull();

    fireEvent.click(screen.getByText("Back"));

    expect(screen.queryByText("Popover 0")).not.toBeNull();
  });

  it("should jump the Tour to step 3 when user triggers 'setCurrentStep'", () => {
    Popover = () => {
      const { currentStep, setCurrentStep } = useLetsTourContext();

      return (
        <>
          Popover {currentStep}
          <button onClick={() => setCurrentStep(2)}>Jump</button>
        </>
      );
    };

    exec({
      isOpen: true
    });

    expect(screen.queryByText("Popover 0")).not.toBeNull();

    fireEvent.click(screen.getByText("Jump"));

    expect(screen.queryByText("Popover 2")).not.toBeNull();
  });

  it("should close the Tour if user triggers 'handleBack' while on the first step", () => {
    Popover = () => {
      const { currentStep, handleBack } = useLetsTourContext();

      return (
        <>
          Popover {currentStep}
          <button onClick={handleBack}>Back</button>
        </>
      );
    };

    const onClose = jest.fn();
    const onChange = jest.fn();

    exec({
      isOpen: true,
      onClose,
      onChange
    });

    fireEvent.click(screen.getByText("Back"));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("should close the Tour if user triggers 'handleNext' while on the last step", () => {
    Popover = () => {
      const { currentStep, handleNext } = useLetsTourContext();

      return (
        <>
          Popover {currentStep}
          <button onClick={handleNext}>Next</button>
        </>
      );
    };

    const onClose = jest.fn();
    const onChange = jest.fn();

    exec({
      isOpen: true,
      onClose,
      onChange
    });

    fireEvent.click(screen.getByText("Next")); // First
    fireEvent.click(screen.getByText("Next")); // Second
    fireEvent.click(screen.getByText("Next")); // Last

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("should reset the 'currentStep' to 0, if user triggers 'handleEndTour'", () => {
    Popover = () => {
      const { currentStep, handleNext } = useLetsTourContext();

      return (
        <>
          Popover {currentStep}
          <button onClick={handleNext}>Next</button>
        </>
      );
    };

    exec({
      isOpen: true
    });

    fireEvent.click(screen.getByText("Next")); // First
    fireEvent.click(screen.getByText("Next")); // Second

    expect(screen.queryByText("Popover 2")).not.toBeNull();

    fireEvent.click(screen.getByText("Close Tour"));

    fireEvent.click(screen.getByText("Open Tour"));

    // The Tour has been reset
    expect(screen.queryByText("Popover 0")).not.toBeNull();
  });

  it("should reset the 'currentStep' to 0, if user triggers 'handleNext' while on the last step", () => {
    Popover = () => {
      const { currentStep, handleNext } = useLetsTourContext();

      return (
        <>
          Popover {currentStep}
          <button onClick={handleNext}>Next</button>
        </>
      );
    };

    exec({
      isOpen: true
    });

    fireEvent.click(screen.getByText("Next")); // First
    fireEvent.click(screen.getByText("Next")); // Second
    fireEvent.click(screen.getByText("Next")); // Last

    fireEvent.click(screen.getByText("Open Tour"));

    // The Tour has been reset
    expect(screen.queryByText("Popover 0")).not.toBeNull();
  });

  it("should scroll the current Tour step into view when the Tour is opened", () => {
    exec();

    fireEvent.click(screen.getByText("Open Tour"));

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });

  it("should scroll the current Tour step into view for each step", () => {
    exec();

    fireEvent.click(screen.getByText("Open Tour"));

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
  });

  it("should keep the Tour open if user clicks the backdrop, if 'isDismissible' is false", () => {
    const { container } = exec({
      backdropClassName: "myClass",
      isDismissible: false,
      isOpen: true
    });

    // Is Open initially
    expect(screen.queryByText("Popover")).not.toBeNull();

    // Click on the backdrop
    fireEvent.click(container.querySelector(".myClass")!);

    // Is still open
    expect(screen.queryByText("Popover")).not.toBeNull();
  });

  it("should close the Tour if user clicks the backdrop, if 'isDismissible' is true", () => {
    const { container } = exec({
      backdropClassName: "myClass",
      isDismissible: true,
      isOpen: true
    });

    // Is Open initially
    expect(screen.queryByText("Popover")).not.toBeNull();

    // Click on the backdrop
    fireEvent.click(container.querySelector(".myClass")!);

    // Is now closed
    expect(screen.queryByText("Popover")).toBeNull();
  });

  it("should call 'onBackdropClick' when the user clicks the backdrop, if 'isDismissible' is false", () => {
    const onBackdropClick = jest.fn();

    const { container } = exec({
      backdropClassName: "myClass",
      isDismissible: false,
      isOpen: true,
      onBackdropClick
    });

    // Click on the backdrop
    fireEvent.click(container.querySelector(".myClass")!);

    expect(onBackdropClick).toHaveBeenCalledTimes(1);
  });

  it("should call 'onBackdropClick' when the user clicks the backdrop, if 'isDismissible' is true", () => {
    const onBackdropClick = jest.fn();

    const { container } = exec({
      backdropClassName: "myClass",
      isDismissible: true,
      isOpen: true,
      onBackdropClick
    });

    // Click on the backdrop
    fireEvent.click(container.querySelector(".myClass")!);

    expect(onBackdropClick).toHaveBeenCalledTimes(1);
  });

  it("should render custom padding around popover if 'maskPadding' is set", () => {
    const { container } = exec({
      isOpen: true,
      maskPadding: [20, 20]
    });

    expect(container).toMatchSnapshot();
  });

  it("should call 'onHighlightedAreaClick' when the user clicks the highlighted area of the Tour", () => {
    const onHighlightedAreaClick = jest.fn();

    const { container } = exec({
      isOpen: true,
      highlightedAreaClassName: "myClass",
      onHighlightedAreaClick
    });

    // Click on the highlighted area
    fireEvent.click(container.querySelector(".myClass")!);

    expect(onHighlightedAreaClick).toHaveBeenCalledTimes(1);
  });

  it("should set a custom className for the backdrop if 'backdropClassName' is set", () => {
    const { container } = exec({
      isOpen: true,
      backdropClassName: "myClass"
    });

    expect(container).toMatchSnapshot();
  });

  it("should set a custom className for the highlighted area if 'highlightedAreaClassName' is set", () => {
    const { container } = exec({
      isOpen: true,
      highlightedAreaClassName: "myClass"
    });

    expect(container).toMatchSnapshot();
  });

  it("should apply custom styles to the mark using 'maskStyles'", () => {
    const { container } = exec({
      isOpen: true,
      maskStyles: {
        backdrop: base => ({ ...base, color: "red" }),
        highlightedArea: (base, pos) => ({
          ...base,
          color: "red",
          top: pos.y,
          left: pos.x,
          minWidth: pos.width,
          minHeight: pos.height
        })
      }
    });

    expect(container).toMatchSnapshot();
  });
});
