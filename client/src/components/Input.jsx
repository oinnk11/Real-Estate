import { twMerge } from "tailwind-merge";

const Input = ({
  width,
  placeholder,
  label,
  name,
  value,
  type = "text",
  classname,
  disabled,
  onChange,
}) => {
  return (
    <div className="space-y-1" style={{ width: width }}>
      {label && <label className="text-sm font-medium">{label}</label>}
      <div
        className={twMerge(
          "border rounded-xl overflow-hidden shadow-sm",
          disabled ? "opacity-70" : ""
        )}
      >
        <input
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          type={type}
          className={twMerge(
            "outline-none w-full py-2 px-3 text-sm",
            classname
          )}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default Input;
