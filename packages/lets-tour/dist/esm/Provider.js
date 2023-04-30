import React, { useEffect, useRef, useState } from "react";
import { LetsTourContext } from "./Context";
import { Tourer } from "./Tourer";
export const LetsTourProvider = props => {
    const { children, Component, steps, onOpen, onClose, onChange, isDismissible, backdropClassName, highlightedAreaClassName, maskStyles, onBackdropClick, onHighlightedAreaClick, maskPadding } = props;
    const hasMounted = useRef(false);
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
        // On fire listener events after initial mount
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }
        onChange === null || onChange === void 0 ? void 0 : onChange(isOpen);
        if (isOpen) {
            onOpen === null || onOpen === void 0 ? void 0 : onOpen();
        }
        else {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        }
    }, [isOpen]);
    /**
     * Handle the Tour Starting
     * Open the Tour and reset the current step
     */
    const handleStartTour = () => {
        setIsOpen(true);
    };
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
            handleStartTour,
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
        React.createElement(Tourer, null,
            React.createElement(Component, null))));
};
//# sourceMappingURL=Provider.js.map