import useAuthContext from "../../hooks/useAuthContext.js";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import AccountContainer from "../AccountContainer.jsx";

const MessageBubble = ({ message, showAvatar }) => {
  const { user } = useAuthContext();
  const { content, sender } = message;

  const isSender = sender.id === user.id;
  const formatedSentTime = format(new Date(message.createdAt), "hh:mm a");

  return (
    <>
      <div
        className={twMerge(
          "max-w-[80%] w-fit my-1 flex gap-1 items-end",
          isSender && "ml-auto flex-row-reverse",
        )}
      >
        {!isSender &&
          (showAvatar ? (
            <AccountContainer className="size-6 mb-1" />
          ) : (
            <div className="size-6"></div>
          ))}
        <div
          className={twMerge(
            "p-2 rounded-xl w-fit peer",
            isSender ? "bg-primary text-white ml-auto" : "bg-black/5 ",
          )}
        >
          {content}
        </div>
        <p className="text-xs text-muted self-center opacity-0 peer-hover:opacity-100 pointer-events-none transition-opacity duration-200 peer-hover:delay-500 delay-0">
          {formatedSentTime}
        </p>
      </div>
    </>
  );
};
export default MessageBubble;
