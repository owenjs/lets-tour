import { TExtendedMaskProps } from "./Mask";
import { TLetsTourStep } from "./types";
import { Dispatch, SetStateAction } from "react";
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
export declare const LetsTourContext: import("react").Context<TTourContext>;
export declare const useLetsTourContext: () => TTourContext;
