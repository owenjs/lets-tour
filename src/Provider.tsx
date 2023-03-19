import React, { FC, PropsWithChildren, ReactNode, useState } from "react";
import { LetsTourContext } from "./Context";
import { Tourer } from "./Tourer";
import { LetsTourStep } from "./types";

export interface ILetsTourProviderProps {
  isOpen?: boolean;
  steps: LetsTourStep[];
  popoverRender: () => ReactNode;
}

export const LetsTourProvider: FC<PropsWithChildren<ILetsTourProviderProps>> = props => {
  const { children, popoverRender, steps } = props;

  const [isOpen, setIsOpen] = useState(props.isOpen || false);
  const [currentStep, setCurrentStep] = useState(0);

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
        handleEndTour,
        handleBack,
        handleNext
      }}
    >
      {children}

      <Tourer render={popoverRender} />
    </LetsTourContext.Provider>
  );
};
