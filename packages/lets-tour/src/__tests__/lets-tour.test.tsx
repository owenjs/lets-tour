import React, { FC } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ILetsTourProviderProps, LetsTourProvider, TLetsTourStep, useLetsTourContext } from "../index";

window.HTMLElement.prototype.scrollIntoView = jest.fn();

describe("Lets Tour", () => {
  let STEPS: TLetsTourStep[];
  let Popover: FC;

  const exec = (props?: Omit<ILetsTourProviderProps, "steps" | "Component">) => {
    const App = () => {
      const { handleStartTour } = useLetsTourContext();

      return (
        <>
          <div data-tour-step="1">Step 1 Item</div>
          <div data-tour-step="2">Step 2 Item</div>

          <button onClick={handleStartTour}>Open Tour</button>
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
      }
    ];

    Popover = () => <div>Popover</div>;
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
});
