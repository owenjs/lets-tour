import { TLetsTourStep } from "@owenjs/lets-tour";

export const TOUR_STEPS: TLetsTourStep[] = [
  {
    selector: '[data-tour-step="5"]',
    placement: "right-start",
    offset: [-10, 20]
  },
  {
    selector: '[data-tour-step="2"]',
    placement: "left"
  },
  {
    selector: '[data-tour-step="3"]',
    placement: "right"
  },
  {
    selector: '[data-tour-step="4"]',
    placement: "bottom"
  },
  {
    selector: '[data-tour-step="5"]',
    placement: "top"
  }
];
