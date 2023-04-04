import React, { ComponentType, FC, PropsWithChildren, useEffect, useState } from "react";
import { TExtendedMaskProps } from "./Mask";
import { LetsTourContext } from "./Context";
import { Tourer } from "./Tourer";
import { TLetsTourStep } from "./types";

export interface ILetsTourProviderProps extends TExtendedMaskProps {
  /**
   * Allow Tourer to be a controlled component
   * @default false
   */
  isOpen?: boolean;
  /**
   * Each step in the Tour
   */
  steps: TLetsTourStep[];
  /**
   * Component to render the popover
   */
  Component: ComponentType;
  /**
   * Fired whenever the Tour is opened
   */
  onOpen?: () => void;
  /**
   * Fired whenever the Tour is closed
   */
  onClose?: () => void;
  /**
   * Fired whenever the Tour Open or Closed state is changed
   * Allows the component to be controlled
   */
  onChange?: (isOpen: boolean) => void;
}

export const LetsTourProvider: FC<PropsWithChildren<ILetsTourProviderProps>> = props => {
  const {
    children,
    Component,
    steps,
    onOpen,
    onClose,
    onChange,
    isDismissible,
    backdropClassName,
    highlightedAreaClassName,
    maskStyles,
    onBackdropClick,
    onHighlightedAreaClick,
    maskPadding
  } = props;

  const [isOpen, setIsOpen] = useState(props.isOpen || false);
  const [currentStep, setCurrentStep] = useState(0);

  /**
   * Allow state to be controlled from above
   */
  useEffect(() => {
    if (!props.isOpen) return;

    setIsOpen(props.isOpen);
  }, [props.isOpen]);

  /**
   * Fire listener events whenever the open state changes
   */
  useEffect(() => {
    onChange?.(isOpen);

    if (isOpen) {
      onOpen?.();
    } else {
      onClose?.();
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
    } else {
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
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  return (
    <LetsTourContext.Provider
      value={{
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
      }}
    >
      {children}

      <Tourer>
        <Component />
      </Tourer>
    </LetsTourContext.Provider>
  );
};
