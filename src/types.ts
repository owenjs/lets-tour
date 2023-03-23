import { Placement } from "@popperjs/core";

export type LetsTourStep = {
  /**
   * CSS selector use to position of the Tour Popover
   */
  selector: string;
  /**
   * Placement of Tour Popover around selected element
   * @default auto
   */
  placement?: Placement;
};
