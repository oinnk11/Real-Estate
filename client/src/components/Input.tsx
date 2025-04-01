import React from "react";
import { twMerge } from "tailwind-merge";

const Input = ({
  width,
  placeholder,
  label,
  name,
  value,
  type = "text",
  classname,
}) => {
  return (
    <div className="space-y-1" style={{ width: width }}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div className="border rounded-lg overflow-hidden shadow-sm">
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          type={type}
          className={twMerge(
            "outline-none w-full py-2 px-3 text-sm",
            classname
          )}
        />
      </div>
    </div>
  );
};

export default Input;
