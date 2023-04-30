import { FC, CSSProperties, MouseEventHandler } from "react";
export type TExtendedMaskProps = {
    /**
     * Should the Tour be dismissible by the user clicking on the backdrop?
     */
    isDismissible?: boolean;
    /**
     * Padding around the Highlighted Area
     * @default [10, 10]
     */
    maskPadding?: [number, number];
    /**
     * Event handler for user clicks on the Tour backdrop
     */
    onBackdropClick?: MouseEventHandler<HTMLDivElement>;
    /**
     * Event handler for user clicks on the Highlighted Area
     */
    onHighlightedAreaClick?: MouseEventHandler<SVGRectElement>;
    /**
     * ClassName for the Tour backdrop
     */
    backdropClassName?: string;
    /**
     * ClassName for the highlighted area of the Tour
     */
    highlightedAreaClassName?: string;
    /**
     * Styles for the Mask
     * Optionally extend the default styles using the `base` param
     */
    maskStyles?: {
        /**
         * Styles for the Tour backdrop
         * @param base default styles
         */
        backdrop?: (base: CSSProperties) => CSSProperties;
        /**
         * Styles for the Tour Highlighted Area
         * @param base default styles
         * @param props
         * @param props.x x position of the Highlighted Area
         * @param props.y y position of the Highlighted Area
         * @param props.width width of the Highlighted Area
         * @param props.height height of the Highlighted Area
         */
        highlightedArea?: (base: CSSProperties, props: {
            x: number;
            y: number;
            width: number;
            height: number;
        }) => CSSProperties;
    };
};
export interface IMaskProps {
    referenceElement: Element | null;
}
export declare const Mask: FC<IMaskProps>;
