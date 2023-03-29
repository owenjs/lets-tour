let isPassiveSupported = false;

try {
  const options = {
    get passive() {
      // This function will be called when the browser
      // attempts to access the passive property.
      isPassiveSupported = true;
      return false;
    }
  };

  // @ts-ignore
  window.addEventListener("test", null, options);
  // @ts-ignore
  window.removeEventListener("test", null, options);
} catch (err) {
  isPassiveSupported = false;
}

const makePassive = () => (isPassiveSupported ? { passive: true } : false);

export default makePassive;
