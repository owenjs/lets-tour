# Lets Tour

Dead simple React element Walk-Through package. Powered by [Popper.js](https://popper.js.org/) and [@reactour/mask](https://github.com/elrumordelaluz/reactour/tree/main/packages/mask)

Styling of popover is completely upto you!

> We're in Beta, breaking changes to come 😘

Coded with ❤️ by [owenjs](https://github.com/owenjs)

## [Demo](https://owenjs.github.io/lets-tour/)

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
        return "Step 1";
      case 1:
        return "Step 2";
    }
  }, [currentStep]);

  return (
    <div style={{ background: "#ffffff" }}>
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
    setIsOpen(true);
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

## Component API

## ILetsTourProviderProps

```jsx
import { LetsTourProvider } from "@owenjs/lets-tour";

const App = () => {
  const { setIsOpen } = useLetsTourContext();

  const handleOpenTour = () => {
    setIsOpen(true);
  };

  return <LetsTourProvider {...ILetsTourProviderProps}>{/* Rest of your React App! */}</LetsTourProvider>;
};
```

#### `isOpen?: boolean`

Allow Tourer to be a controlled component\
@default false

#### `steps: TLetsTourStep[]`

Each step in the Tour, see [TLetsTourStep](#TLetsTourStep)

#### `component: () => ReactNode`

Component to render the popover

#### `onOpen?: () => void`

Fired whenever the Tour is opened

#### `onClose?: () => void`

Fired whenever the Tour is closed

#### `onChange?: (isOpen: boolean) => void`

Fired whenever the Tour Open or Closed state is changed\
Allows the component to be controlled

#### `isDismissible?: boolean`

Should the Tour be dismissible by the user clicking on the backdrop?

#### `maskPadding?: [number, number]`

Padding around the Highlighted Area\
@default [10, 10]

#### `onBackdropClick?: MouseEventHandler<HTMLDivElement>`

Event handler for user clicks on the Tour backdrop

#### `onHighlightedAreaClick?: MouseEventHandler<SVGRectElement>`

Event handler for user clicks on the Highlighted Area

#### `backdropClassName?: string`

ClassName for the Tour backdrop

#### `highlightedAreaClassName?: string`

ClassName for the highlighted area of the Tour

#### `maskStyles?: Record`

Styles for the Mask\
Optionally extend the default styles using the `base` param

```ts
type maskStyles = {
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
```

## TTourContext

```jsx
import { useLetsTourContext } from "@owenjs/lets-tour";

const { ... } = useLetsTourContext();
```

#### `steps: TLetsTourStep[]`

Each step in the Tour, see [TLetsTourStep](#TLetsTourStep)

#### `isOpen: boolean`

Open state of the Tour

#### `setIsOpen: Dispatch<SetStateAction<boolean>>`

Set state for the open state of the Tour

#### `currentStep: number`

Current step of the Tour (starting at 0)

#### `setCurrentStep: Dispatch<SetStateAction<number>>`

Set state for the current step of the Tour (starting at 0)

#### `handleStartTour: () => void`

Start the Tour programmatically

#### `handleEndTour: () => void`

End the Tour programmatically

#### `handleBack: () => void`

Go back a step in the Tour

#### `handleNext: () => void`

Go forward a step in the Tour

## TLetsTourStep

#### `selector: string`

CSS selector use to position of the Tour Popover

#### `placement?: Placement`

Placement of Tour Popover around selected element\
@default auto

#### `offset?: [number, number]`

Offset the Tour Popper\
@default [0, 20]
