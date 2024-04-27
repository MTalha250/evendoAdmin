import React from "react";
import { Loader2 } from "lucide-react";

const AnimationButton = ({
  onClick,
  loadingText,
  loading,
  disabled,
  label,
  className,
}: {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
  loadingText?: string;
  label?: string;
  className?: string;
}) => {
  return (
    <React.Fragment>
      <button
        onClick={onClick}
        type="button"
        disabled={disabled}
        className={`flex items-center text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20 ${className}`}
      >
        {loading ? (
          <span
          className="flex items-center justify-center w-full h-full"
          >
            <Loader2 className="size-4 ltr:mr-2 rtl:ml-2 animate-spin" />
            {loadingText}
          </span>
        ) : (
          label
        )}
      </button>
    </React.Fragment>
  );
};

export default AnimationButton;
