import { TExtendedMaskProps } from "./Mask";
import { LetsTourStep } from "./types";
import { Dispatch, SetStateAction } from "react";
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
export declare const LetsTourContext: import("react").Context<TTourContext>;
export declare const useLetsTourContext: () => TTourContext;
