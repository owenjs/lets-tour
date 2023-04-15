import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useLetsTourContext } from "./Context";
import { Mask } from "./Mask";

export interface ITourerProps {}

export const Tourer: FC<PropsWithChildren<ITourerProps>> = props => {
  const { children } = props;
  const { steps, isOpen, currentStep } = useLetsTourContext();

  // States needed for Popper.js
  const [referenceElement, setReferenceElement] = useState(document.querySelector(steps[0].selector));
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  // Popper.js
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: steps[currentStep].placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: steps[currentStep].offset || [0, 20]
        }
      }
    ]
  });

  /**
   * Whenever the current step of the Tour changes
   * Query the new element in the Tour
   */
  useEffect(() => {
    if (!isOpen) return;

    const currentStepReference = document.querySelector(steps[currentStep].selector);

    setReferenceElement(currentStepReference);

    // Scroll into view
    currentStepReference?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
  }, [currentStep, isOpen]);

  if (!isOpen) return null;

  /**
   * Creates a Popper.js popover for the current Tour Step element
   */
  return ReactDOM.createPortal(
    <>
      <div ref={setPopperElement} style={{ ...styles.popper, zIndex: "100000" }} {...attributes.popper}>
        {children}
      </div>

      <Mask referenceElement={referenceElement} />
    </>,
    document.querySelector("body")!
  );
};
