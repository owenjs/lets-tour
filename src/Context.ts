import { TExtendedMaskProps } from "./Mask";
import { TLetsTourStep } from "./types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TTourContext = {
  /**
   * Each step in the Tour
   */
  steps: TLetsTourStep[];
  /**
   * Open state of the Tour
   */
  isOpen: boolean;
  /**
   * Set state for the open state of the Tour
   */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /**
   * Current step of the Tour (starting at 0)
   */
  currentStep: number;
  /**
   * Set state for the current step of the Tour (starting at 0)
   */
  setCurrentStep: Dispatch<SetStateAction<number>>;
  /**
   * End the Tour programmatically
   */
  handleEndTour: () => void;
  /**
   * Go back a step in the Tour
   */
  handleBack: () => void;
  /**
   * Go forward a step in the Tour
   */
  handleNext: () => void;
} & TExtendedMaskProps;

export const LetsTourContext = createContext<TTourContext>({
  steps: [],
  isOpen: false,
  // ToDo: add browser warnings if these have fired as the context is not set correctly
  setIsOpen: () => {},
  currentStep: 0,
  setCurrentStep: () => {},
  handleEndTour: () => {},
  handleBack: () => {},
  handleNext: () => {}
});

export const useLetsTourContext = () => {
  // ToDo: removed private variables from the return
  return useContext(LetsTourContext);
};
