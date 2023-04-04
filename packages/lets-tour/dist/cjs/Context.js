"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLetsTourContext = exports.LetsTourContext = void 0;
const react_1 = require("react");
exports.LetsTourContext = (0, react_1.createContext)({
    steps: [],
    isOpen: false,
    // ToDo: add browser warnings if these have fired as the context is not set correctly
    setIsOpen: () => { },
    currentStep: 0,
    setCurrentStep: () => { },
    handleStartTour: () => { },
    handleEndTour: () => { },
    handleBack: () => { },
    handleNext: () => { }
});
const useLetsTourContext = () => {
    // ToDo: removed private variables from the return
    return (0, react_1.useContext)(exports.LetsTourContext);
};
exports.useLetsTourContext = useLetsTourContext;
//# sourceMappingURL=Context.js.map