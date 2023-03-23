# Lets Tour

Dead simple React element Walk-Through package. Powered by [Popper.js](https://popper.js.org/) and [@reactour/mask](https://github.com/elrumordelaluz/reactour/tree/main/packages/mask)

Styling of popover is completely upto you!

> We're in Beta, breaking changes to come 😘

Coded with ❤️ by [owenjs](https://github.com/owenjs)

## Install

```shell
yarn add @owenjs/lets-tour
```

## Usage

```jsx
import { LetsTourProvider, useLetsTourContext } from "@owenjs/lets-tour";
import { useEffect, useMemo } from "react";

/**
 * Each step in the Tour
 */
const STEPS = [
  {
    selector: ".step-1"
  },
  {
    selector: ".step-2"
  }
];

/**
 * Popover component and Styling
 */
const Popover = () => {
  const { currentStep, handleBack, handleNext } = useLetsTourContext();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return "Step 1"
      case 1:
        return "Step 2"
    }
  }, [currentStep]);

  return (
    <div style={{background: "#ffffff"}}>
      {content}
      <button onClick={handleBack}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

/**
 * Main app component
 */
const App = () => {
  const { setIsOpen } = useLetsTourContext();
  
  const handleOpenTour = () => {
    setIsOpen(true)
  };
  
  return (
    <LetsTourProvider steps={STEPS} component={Popover}>
      <div className="step-1">Step 1 Item</div>
      <div className="step-2">Step 2 Item</div>
      
      <button onClick={handleOpenTour}>Open Tour</button>
      
      {/* Rest of your React App! */}
    </LetsTourProvider>
  );
};
```
