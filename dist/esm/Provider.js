import React, { useEffect, useState } from "react";
import { LetsTourContext } from "./Context";
import { Tourer } from "./Tourer";
export const LetsTourProvider = props => {
    const { children, component, steps, onOpen, onClose, onChange, isDismissible, backdropClassName, highlightedAreaClassName, maskStyles, onBackdropClick, onHighlightedAreaClick, maskPadding } = props;
    const [isOpen, setIsOpen] = useState(props.isOpen || false);
    const [currentStep, setCurrentStep] = useState(0);
    /**
     * Allow state to be controlled from above
     */
    useEffect(() => {
        if (!props.isOpen)
            return;
        setIsOpen(props.isOpen);
    }, [props.isOpen]);
    /**
     * Fire listener events whenever the open state changes
     */
    useEffect(() => {
        onChange === null || onChange === void 0 ? void 0 : onChange(isOpen);
        if (isOpen) {
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        }
        else {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    }, [isOpen]);
    /**
     * Handle the Tour Ending
     * Close the Tour and reset the current step
     */
    const handleEndTour = () => {
        setIsOpen(false);
        setCurrentStep(0);
    };
    /**
     * Handle the Tour going backwards
     * If this is the first step, end the Tour
     */
    const handleBack = () => {
        const isFirst = currentStep === 0;
        if (isFirst) {
            handleEndTour();
        }
        else {
            setCurrentStep(s => s - 1);
        }
    };
    /**
     * Handle the Tour going forward
     * If this is the last step, end the Tour
     */
    const handleNext = () => {
        const isLast = currentStep === steps.length - 1;
        if (isLast) {
            handleEndTour();
        }
        else {
            setCurrentStep(s => s + 1);
        }
    };
    return (React.createElement(LetsTourContext.Provider, { value: {
            steps,
            isOpen,
            setIsOpen,
            currentStep,
            setCurrentStep,
            handleEndTour,
            handleBack,
            handleNext,
            isDismissible,
            backdropClassName,
            highlightedAreaClassName,
            maskStyles,
            onBackdropClick,
            onHighlightedAreaClick,
            maskPadding
        } },
        children,
        React.createElement(Tourer, { render: component })));
};
//# sourceMappingURL=Provider.js.map