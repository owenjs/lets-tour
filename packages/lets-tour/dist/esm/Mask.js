import React, { useId } from "react";
import { Mask as ReacTourMask } from "@reactour/mask";
import { useLetsTourContext } from "./Context";
export const Mask = props => {
    const { referenceElement } = props;
    const { setIsOpen, isDismissible, backdropClassName, highlightedAreaClassName, maskStyles = {
        backdrop: base => (Object.assign({}, base)),
        highlightedArea: base => (Object.assign({}, base))
    }, onBackdropClick, onHighlightedAreaClick, maskPadding = [10, 10] } = useLetsTourContext();
    /**
     * Dismiss the Tour if the user clicks on the backdrop
     * @param e HTMLDivElement click event
     */
    const handleBackDropClick = e => {
        if (isDismissible)
            setIsOpen(false);
        onBackdropClick === null || onBackdropClick === void 0 ? void 0 : onBackdropClick(e);
    };
    const maskId = useId();
    const clipId = useId();
    return (React.createElement(ReacTourMask, { padding: maskPadding, maskId: maskId, clipId: clipId, className: backdropClassName, highlightedAreaClassName: highlightedAreaClassName, onClick: handleBackDropClick, onClickHighlighted: onHighlightedAreaClick, sizes: (referenceElement === null || referenceElement === void 0 ? void 0 : referenceElement.getBoundingClientRect()) || {
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
//# sourceMappingURL=Mask.js.map