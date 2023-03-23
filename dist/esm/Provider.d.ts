import { FC, PropsWithChildren, ReactNode } from "react";
import { TExtendedMaskProps } from "./Mask";
import { LetsTourStep } from "./types";
export interface ILetsTourProviderProps extends TExtendedMaskProps {
    /**
     * Allow Tourer to be a controlled component
     * @default false
     */
    isOpen?: boolean;
    /**
     * Each step in the Tour
     */
    steps: LetsTourStep[];
    /**
     * Component to render the popover
     */
    component: () => ReactNode;
    /**
     * Fired whenever the Tour is opened
     */
    onOpen?: () => void;
    /**
     * Fired whenever the Tour is closed
     */
    onClose?: () => void;
    /**
     * Fired whenever the Tour Open is Closed state is changed
     * Allows the component to be controlled
     */
    onChange?: (isOpen: boolean) => void;
}
export declare const LetsTourProvider: FC<PropsWithChildren<ILetsTourProviderProps>>;
