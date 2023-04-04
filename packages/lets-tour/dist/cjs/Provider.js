"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LetsTourProvider = void 0;
const react_1 = __importStar(require("react"));
const Context_1 = require("./Context");
const Tourer_1 = require("./Tourer");
const LetsTourProvider = props => {
    const { children, Component, steps, onOpen, onClose, onChange, isDismissible, backdropClassName, highlightedAreaClassName, maskStyles, onBackdropClick, onHighlightedAreaClick, maskPadding } = props;
    const [isOpen, setIsOpen] = (0, react_1.useState)(props.isOpen || false);
    const [currentStep, setCurrentStep] = (0, react_1.useState)(0);
    /**
     * Allow state to be controlled from above
     */
    (0, react_1.useEffect)(() => {
        if (!props.isOpen)
            return;
        setIsOpen(props.isOpen);
    }, [props.isOpen]);
    /**
     * Fire listener events whenever the open state changes
     */
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement(Context_1.LetsTourContext.Provider, { value: {
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
        react_1.default.createElement(Tourer_1.Tourer, null,
            react_1.default.createElement(Component, null))));
};
exports.LetsTourProvider = LetsTourProvider;
//# sourceMappingURL=Provider.js.map