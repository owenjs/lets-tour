import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { usePopper } from "react-popper";
import { useLetsTourContext } from "./Context";
import { Mask } from "./Mask";
export const Tourer = props => {
    const { children } = props;
    const { steps, isOpen, currentStep } = useLetsTourContext();
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
        if (!isOpen)
            return;
        const currentStepReference = document.querySelector(steps[currentStep].selector);
        setReferenceElement(currentStepReference);
        // Scroll into view
        currentStepReference === null || currentStepReference === void 0 ? void 0 : currentStepReference.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "center"
        });
    }, [currentStep, isOpen]);
    if (!isOpen)
        return null;
    /**
     * Creates a Popper.js popover for the current Tour Step element
     */
    return ReactDOM.createPortal(React.createElement(React.Fragment, null,
        React.createElement("div", Object.assign({ ref: setPopperElement, style: Object.assign(Object.assign({}, styles.popper), { zIndex: "100000" }) }, attributes.popper), children),
        React.createElement(Mask, { referenceElement: referenceElement })), document.body);
};
//# sourceMappingURL=Tourer.js.map