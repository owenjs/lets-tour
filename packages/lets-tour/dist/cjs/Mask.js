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
exports.Mask = void 0;
const react_1 = __importStar(require("react"));
const mask_1 = require("@reactour/mask");
const Context_1 = require("./Context");
const Mask = props => {
    const { referenceElement } = props;
    const { setIsOpen, isDismissible, backdropClassName, highlightedAreaClassName, maskStyles = {
        backdrop: base => (Object.assign({}, base)),
        highlightedArea: base => (Object.assign({}, base))
    }, onBackdropClick, onHighlightedAreaClick, maskPadding = [0, 0] } = (0, Context_1.useLetsTourContext)();
    /**
     * Dismiss the Tour if the user clicks on the backdrop
     * @param e HTMLDivElement click event
     */
    const handleBackDropClick = e => {
        if (isDismissible)
            setIsOpen(false);
        onBackdropClick === null || onBackdropClick === void 0 ? void 0 : onBackdropClick(e);
    };
    const maskId = (0, react_1.useId)();
    const clipId = (0, react_1.useId)();
    return (react_1.default.createElement(mask_1.Mask, { padding: maskPadding, maskId: maskId, clipId: clipId, className: backdropClassName, highlightedAreaClassName: highlightedAreaClassName, onClick: handleBackDropClick, onClickHighlighted: onHighlightedAreaClick, sizes: (referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.getBoundingClientRect()) || {
            bottom: 0,
            height: 0,
            left: 0,
            right: 0,
            top: 0,
            width: 0,
            x: 0,
            y: 0
        }, styles: {
            maskWrapper: maskStyles.backdrop,
            maskArea: (base) => (Object.assign({}, base)),
            maskRect: (base) => (Object.assign({}, base)),
            clickArea: (base) => (Object.assign({}, base)),
            // @ts-ignore typing wrong for the ReacTour Mask package!
            highlightedArea: maskStyles.highlightedArea
        } }));
};
exports.Mask = Mask;
//# sourceMappingURL=Mask.js.map