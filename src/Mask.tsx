import React, { FC, useId, CSSProperties } from "react";
import { Mask as ReacTourMask } from "@reactour/mask";
import { useLetsTourContext } from "./Context";

export type TExtendedMaskProps = {
  /**
   * Should the Tour be dismissible by the user clicking on the backdrop?
   */
  isDismissible?: boolean;
  /**
   * ClassName for the Tour backdrop
   */
  backdropClassName?: string;
  /**
   * ClassName for the highlighted area of the Tour
   */
  highlightedAreaClassName?: string;
  maskStyles?: {
    backdrop?: (base: CSSProperties) => CSSProperties;
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
    }
  } = useLetsTourContext();

  const handleBackDropClick = () => {
    if (isDismissible) setIsOpen(false);
  };

  const maskId = useId();
  const clipId = useId();

  return (
    <ReacTourMask
      maskId={maskId}
      clipId={clipId}
      className={backdropClassName}
      highlightedAreaClassName={highlightedAreaClassName}
      onClick={handleBackDropClick}
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
