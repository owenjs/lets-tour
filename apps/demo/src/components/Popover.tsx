import { useLetsTourContext } from "@owenjs/lets-tour";
import { FC, useMemo } from "react";

const Popover = () => {
  const { currentStep, handleBack, handleNext, handleEndTour } = useLetsTourContext();

  const content = useMemo(() => {
    switch (currentStep) {
      case 0:
        return "The is Let's Tour demo page!";
      case 1:
        return "Step 2";
    }
  }, [currentStep]);

  return (
    <div className="rounded-xl border border-gray-100 p-4 shadow-xl bg-white">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <strong className="block font-medium text-gray-900">Welcome</strong>

          <p className="mt-1 text-sm text-gray-700">{content}</p>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleBack}
              className="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-100"
            >
              <span className="text-sm">Back</span>
            </button>
            <button
              onClick={handleNext}
              className="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-100"
            >
              <span className="text-sm">Next</span>
            </button>
          </div>
        </div>

        <button onClick={handleEndTour} className="text-gray-500 transition hover:text-gray-600">
          <span className="sr-only">Dismiss popup</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Popover;
