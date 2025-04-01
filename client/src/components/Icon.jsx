import { twMerge } from "tailwind-merge";

const Icon = ({ icon: Icon, classname, iconClassname }) => {
  return (
    <span
      className={twMerge(
        "size-7 aspect-square rounded-full bg-sky-50 flex items-center justify-center mr-1",
        classname
      )}
    >
      <Icon className={twMerge("size-5 text-primary", iconClassname)} />
    </span>
  );
};

export default Icon;
