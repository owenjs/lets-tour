import React, { FC, useId, CSSProperties, MouseEventHandler } from "react";
import { Mask as ReacTourMask } from "@reactour/mask";
import { useLetsTourContext } from "./Context";

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
    highlightedArea?: (
      base: CSSProperties,
      props: {
        x: number;
        y: number;
        width: number;
        height: number;
      }
    ) => CSSProperties;
  };
};

export interface IMaskProps {
  referenceElement: Element | null;
}

export const Mask: FC<IMaskProps> = props => {
  const { referenceElement } = props;

  const maskId = useId();
  const clipId = useId();

  const {
    setIsOpen,
    isDismissible,
    backdropClassName,
    highlightedAreaClassName,
    maskStyles = {
      backdrop: base => ({ ...base }),
      highlightedArea: base => ({ ...base })
    },
    onBackdropClick,
    onHighlightedAreaClick,
    maskPadding = [10, 10]
  } = useLetsTourContext();

  /**
   * Dismiss the Tour if the user clicks on the backdrop
   * @param e HTMLDivElement click event
   */
  const handleBackDropClick: MouseEventHandler<HTMLDivElement> = e => {
    if (isDismissible) setIsOpen(false);

    onBackdropClick?.(e);
  };

  return (
    <ReacTourMask
      padding={maskPadding}
      maskId={maskId}
      clipId={clipId}
      className={backdropClassName}
      onClick={handleBackDropClick}
      highlightedAreaClassName={highlightedAreaClassName}
      onClickHighlighted={onHighlightedAreaClick}
      sizes={
        referenceElement?.getBoundingClientRect() || {
          bottom: 0,
          height: 0,
          left: 0,
          right: 0,
          top: 0,
          width: 0,
          x: 0,
          y: 0
        }
      }
      styles={{
        maskWrapper: maskStyles.backdrop,
        maskArea: (base: any) => ({ ...base }),
        maskRect: (base: any) => ({ ...base }),
        clickArea: (base: any) => ({ ...base }),
        // @ts-ignore typing wrong for the ReacTour Mask package!
        highlightedArea: maskStyles.highlightedArea
      }}
    />
  );
};
