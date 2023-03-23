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
   * @default 0
   */
  maskPadding?: number | [number, number];
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
   * Optionally extend the default styles using `base`
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

export interface IProps extends TExtendedMaskProps {
  referenceElement: Element | null;
}

const Mask: FC<IProps> = props => {
  const { referenceElement } = props;

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
    maskPadding = 0
  } = useLetsTourContext();

  /**
   * Dismiss the Tour if the user clicks on the backdrop
   * @param e HTMLDivElement click event
   */
  const handleBackDropClick: MouseEventHandler<HTMLDivElement> = e => {
    if (isDismissible) setIsOpen(false);

    onBackdropClick?.(e);
  };

  const maskId = useId();
  const clipId = useId();

  return (
    <ReacTourMask
      padding={maskPadding}
      maskId={maskId}
      clipId={clipId}
      className={backdropClassName}
      highlightedAreaClassName={highlightedAreaClassName}
      onClick={handleBackDropClick}
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

export default Mask;
