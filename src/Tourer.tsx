import React, { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useLetsTourContext } from "./Context";
import { Mask } from "@reactour/mask";

export interface ITourerProps {
  render: () => ReactNode;
}

export const Tourer: FC<PropsWithChildren<ITourerProps>> = props => {
  const { render } = props;
  const { steps, isOpen, currentStep } = useLetsTourContext();

  // States needed for Popper.js
  const [referenceElement, setReferenceElement] = useState(document.querySelector(steps[0].selector));
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

  // Popper.js
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: steps[currentStep].placement || "right"
  });

  /**
   * Whenever the current step of the Tour changes
   * Query the new element in the Tour
   */
  useEffect(() => {
    setReferenceElement(document.querySelector(steps[currentStep].selector));
  }, [currentStep]);

  if (!isOpen) return null;

  /**
   * Creates a Popper.js popover for the current Tour Step element
   */
  return ReactDOM.createPortal(
    <>
      <div ref={setPopperElement} style={{ ...styles.popper, zIndex: "100000" }} {...attributes.popper}>
        {render()}
      </div>

      <Mask
        sizes={
          referenceElement?.getBoundingClientRect() || {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0
          }
        }
      />
    </>,
    document.querySelector("body")!
  );
};
