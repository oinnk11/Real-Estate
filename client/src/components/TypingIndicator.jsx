import { useEffect, useState } from "react";
import AccountContainer from "./AccountContainer";

const TypingIndicator = ({ name, isTyping }) => {
  const [dotCount, setDotCount] = useState(1);

  // Typing indicator handler
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {isTyping && (
        <div className="flex items-end gap-1">
          <AccountContainer className="size-6" />
          <span className="rounded-xl p-2 bg-black/5 w-[150px]">
            {name.split(" ")[0]} is typing{".".repeat(dotCount)}
          </span>
        </div>
      )}
    </>
  );
};

export default TypingIndicator;
