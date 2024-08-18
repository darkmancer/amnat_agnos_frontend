import React from "react";

interface StepButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function StepButton({
  label,
  onClick,
  disabled = false,
}: StepButtonProps) {
  const baseClass = "px-4 py-3 rounded-xl w-full max-w-[448px] text-center";

  const enabledClass = "bg-blue-500 text-white";
  const disabledClass = "bg-gray-300 text-gray-500 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${disabled ? disabledClass : enabledClass}`}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
