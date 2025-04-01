import { twMerge } from "tailwind-merge";

const Button = ({
  placeholder,
  classname,
  children,
  onClick,
  disabled,
  type,
}) => {
  return (
    <button
      className={twMerge(
        "flex items-center justify-center py-2 px-3 bg-primary rounded-lg text-white font-semibold hover:bg-primary/85 transition-colors disabled:opacity-70",
        classname
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {placeholder}
      {children}
    </button>
  );
};

export default Button;
