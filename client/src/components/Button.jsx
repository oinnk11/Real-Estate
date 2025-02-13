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
      className={twMerge("btn-primary", classname)}
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
