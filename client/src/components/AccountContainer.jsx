import { twMerge } from "tailwind-merge";
import profilePlaceholder from "../assets/profilePlaceholder.png";

const AccountContainer = ({ className }) => {
  return (
    <div
      className={twMerge(
        "rounded-full size-10 overflow-hidden flex items-center justify-center",
        className,
      )}
    >
      <img src={profilePlaceholder} className="object-contain" />
    </div>
  );
};

export default AccountContainer;
