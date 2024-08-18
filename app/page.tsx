"use client";
import { useState } from "react";
import AbdominalPainLocator from "./components/AbdominalPainLocator";
import FingerPainLocator from "./components/FingerPainLocator";
import StepButton from "./components/StepButton";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAbdominalAreaSelected, setIsAbdominalAreaSelected] = useState(false);
  const [isFingerAreaSelected, setIsFingerAreaSelected] = useState(false);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      {currentStep === 1 && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-gray-600 text-center">
            จุดไหนที่คุณปวดท้องมากที่สุด
          </h2>
          <AbdominalPainLocator
            onAreaSelected={() => setIsAbdominalAreaSelected(true)}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold mb-4 text-gray-600 text-center">
            จุดไหนที่คุณปวดนิ้วมากที่สุด
          </h2>
          <FingerPainLocator
            onAreaSelected={() => setIsFingerAreaSelected(true)}
          />
        </div>
      )}

      <div className="mt-6 flex space-x-4 w-full justify-center">
        {currentStep < 2 && (
          <StepButton
            label="ต่อไป"
            onClick={handleNext}
            disabled={!isAbdominalAreaSelected}
          />
        )}

        {currentStep === 2 && (
          <StepButton
            label="ต่อไป"
            onClick={() => {}}
            disabled={!isFingerAreaSelected}
          />
        )}
      </div>
    </div>
  );
}
