import { Placement } from "@popperjs/core";

export type TLetsTourStep = {
  /**
   * CSS selector use to position of the Tour Popover
   */
  selector: string;
  /**
   * Placement of Tour Popover around selected element
   * @default auto
   */
  placement?: Placement;
  /**
   * Offset the Tour Popper
   * @default [0, 20]
   * ToDo: Add these values to the maskPadding prop for the user
   */
  offset?: [number, number];
};
