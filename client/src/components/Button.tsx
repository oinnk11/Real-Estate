import React from "react";
import { twMerge } from "tailwind-merge";

const Button = ({ placeholder, classname }) => {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center h-10 px-4 bg-primary rounded-lg text-white font-semibold hover:bg-primary/85 transition-colors",
        classname
      )}
    >
      {placeholder}
    </button>
  );
};

export default Button;
