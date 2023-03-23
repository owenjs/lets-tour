import { TExtendedMaskProps } from "./Mask";
import { LetsTourStep } from "./types";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export type TTourContext = {
  steps: LetsTourStep[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  handleEndTour: () => void;
  handleBack: () => void;
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
