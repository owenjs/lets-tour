import { useEffect, useState } from "react";
import makePassive from "../helpers/isPassiveSupported";

const getWindowDimensions = () => ({
  width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
  height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
});

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(() => getWindowDimensions());

  useEffect(() => {
    const onResize = () => setWindowDimensions(getWindowDimensions());

    window.addEventListener("resize", onResize, makePassive());

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return windowDimensions;
};

export default useWindowDimensions;
