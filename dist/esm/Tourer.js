import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useLetsTourContext } from "./Context";
import { Mask } from "./Mask";
export const Tourer = props => {
    const { render } = props;
    const { steps, isOpen, currentStep, maskPadding } = useLetsTourContext();
    // States needed for Popper.js
    const [referenceElement, setReferenceElement] = useState(document.querySelector(steps[0].selector));
    const [popperElement, setPopperElement] = useState(null);
    // Popper.js
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: steps[currentStep].placement,
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: steps[currentStep].offset || maskPadding
                }
            }
        ]
    });
    /**
     * Whenever the current step of the Tour changes
     * Query the new element in the Tour
     */
    useEffect(() => {
        setReferenceElement(document.querySelector(steps[currentStep].selector));
    }, [currentStep]);
    if (!isOpen)
        return null;
    /**
     * Creates a Popper.js popover for the current Tour Step element
     */
    return ReactDOM.createPortal(React.createElement(React.Fragment, null,
        React.createElement("div", Object.assign({ ref: setPopperElement, style: Object.assign(Object.assign({}, styles.popper), { zIndex: "100000" }) }, attributes.popper), render()),
        React.createElement(Mask, { referenceElement: referenceElement })), document.querySelector("body"));
};
//# sourceMappingURL=Tourer.js.map