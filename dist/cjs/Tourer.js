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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tourer = void 0;
const react_1 = __importStar(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_popper_1 = require("react-popper");
const Context_1 = require("./Context");
const Mask_1 = __importDefault(require("./Mask"));
const Tourer = props => {
    const { render } = props;
    const { steps, isOpen, currentStep, maskPadding } = (0, Context_1.useLetsTourContext)();
    // States needed for Popper.js
    const [referenceElement, setReferenceElement] = (0, react_1.useState)(document.querySelector(steps[0].selector));
    const [popperElement, setPopperElement] = (0, react_1.useState)(null);
    // Popper.js
    const { styles, attributes } = (0, react_popper_1.usePopper)(referenceElement, popperElement, {
        placement: steps[currentStep].placement,
        modifiers: [
            {
                name: "offset",
                options: {
                    offset: steps[currentStep].offset || maskPadding
                }
            }
        ]
    });
    /**
     * Whenever the current step of the Tour changes
     * Query the new element in the Tour
     */
    (0, react_1.useEffect)(() => {
        setReferenceElement(document.querySelector(steps[currentStep].selector));
    }, [currentStep]);
    if (!isOpen)
        return null;
    /**
     * Creates a Popper.js popover for the current Tour Step element
     */
    return react_dom_1.default.createPortal(react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", Object.assign({ ref: setPopperElement, style: Object.assign(Object.assign({}, styles.popper), { zIndex: "100000" }) }, attributes.popper), render()),
        react_1.default.createElement(Mask_1.default, { referenceElement: referenceElement })), document.querySelector("body"));
};
exports.Tourer = Tourer;
//# sourceMappingURL=Tourer.js.map