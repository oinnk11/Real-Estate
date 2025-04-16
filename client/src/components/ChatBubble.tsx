import AccountContianer from "./AccountContainer";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import socket from "../utils/socket";

const ChatBubble = ({ isSender, message, isLast }) => {
  const { isSeen, createdAt, content } = message;

  return (
    <div
      className={twMerge(
        "flex items-end gap-2 ml-auto w-full",
        isSender ? "justify-end" : "justify-start",
      )}
    >
      {!isSender && <AccountContianer className="!size-7" />}
      <div
        className={twMerge(
          "flex flex-col gap-0.5 max-w-[80%] 2xl:max-w-[60%]",
          isSender ? "items-end" : "items-start",
        )}
      >
        <p
          className={twMerge(
            "text-xs text-muted w-fit mt-1",
            isSender && "ml-auto",
          )}
        >
          {format(new Date(createdAt), "hh:mm a")}
        </p>
        <div
          className={twMerge(
            "rounded-xl p-2 w-fit",
            isSender ? "bg-primary text-white" : "bg-black/5",
          )}
        >
          <p>{content}</p>
        </div>
        {isSender && isLast && (
          <i className="text-xs text-muted w-fit mr-2 ml-auto">
            {isSeen ? "Seen" : "Sent"}
          </i>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
