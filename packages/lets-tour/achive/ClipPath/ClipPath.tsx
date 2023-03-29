import { FC, useEffect, useState } from "react";
import useWindowDimensions from "../helpers/window";

export interface IClipPathProps {
  element?: HTMLElement | null;
}

// ToDo: not working
export const ClipPath: FC<IClipPathProps> = props => {
  const { element } = props;

  const windowDimensions = useWindowDimensions();
  const [bounds, setBounds] = useState(() => element?.getBoundingClientRect());

  // Update Bounds whenever our element changes
  useEffect(() => setBounds(element?.getBoundingClientRect()), [element]);

  // Update Bounds whenever the screen size changes
  useEffect(() => setBounds(element?.getBoundingClientRect()), [windowDimensions.height, windowDimensions.width]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: windowDimensions.width,
        height: windowDimensions.height,
        clipPath: `rect(${bounds?.top || 0}px, ${bounds?.right || 0}px, ${bounds?.bottom || 0}px, ${
          bounds?.left || 0
        }px)`
      }}
    />
  );
};
