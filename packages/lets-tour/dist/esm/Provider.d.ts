import { ComponentType, FC, PropsWithChildren } from "react";
import { TExtendedMaskProps } from "./Mask";
import { TLetsTourStep } from "./types";
export interface ILetsTourProviderProps extends TExtendedMaskProps {
    /**
     * Allow Tourer to be a controlled component
     * @default false
     */
    isOpen?: boolean;
    /**
     * Each step in the Tour
     */
    steps: TLetsTourStep[];
    /**
     * Component to render the popover
     */
    Component: ComponentType;
    /**
     * Fired whenever the Tour is opened
     */
    onOpen?: () => void;
    /**
     * Fired whenever the Tour is closed
     */
    onClose?: () => void;
    /**
     * Fired whenever the Tour Open or Closed state is changed
     * Allows the component to be controlled
     */
    onChange?: (isOpen: boolean) => void;
}
export declare const LetsTourProvider: FC<PropsWithChildren<ILetsTourProviderProps>>;
