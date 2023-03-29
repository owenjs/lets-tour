import { createContext, useContext } from "react";
export const LetsTourContext = createContext({
    steps: [],
    isOpen: false,
    // ToDo: add browser warnings if these have fired as the context is not set correctly
    setIsOpen: () => { },
    currentStep: 0,
    setCurrentStep: () => { },
    handleEndTour: () => { },
    handleBack: () => { },
    handleNext: () => { }
});
export const useLetsTourContext = () => {
    // ToDo: removed private variables from the return
    return useContext(LetsTourContext);
};
//# sourceMappingURL=Context.js.map