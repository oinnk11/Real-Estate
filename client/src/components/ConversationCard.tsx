import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import AccountContainer from "./AccountContainer";
import useAuthContext from "../hooks/useAuthContext";
import { markMessageAsSeen } from "../hooks/useMessage";
import { useEffect, useState } from "react";
import { format } from "date-fns";

const ConversationCard = ({ chat }) => {
  const { user: currentUser } = useAuthContext();
  const location = useLocation();
  const path = location.pathname;
  const { id, Messages, user1, user2 } = chat;

  const isActive = path === `/inbox/chat/${id}`;

  const currentUserId = currentUser.id;
  const otherUser = currentUserId === user1.id ? user2 : user1;

  const lastMessage = Messages.length > 0 ? Messages[0] : null;

  const isLastMessageSender = currentUser.id === lastMessage?.userId;

  const [isLastMessageSeen, setisLastMessageSeen] = useState(
    lastMessage?.isSeen ?? true
  );

  const onMarkAsSeen = async () => {
    await markMessageAsSeen(id);
    setisLastMessageSeen(true);
  };

  useEffect(() => {
    setisLastMessageSeen(lastMessage?.isSeen ?? true);
  }, [chat]);

  return (
    <Link
      to={`/inbox/chat/${id}`}
      className={twMerge(
        "flex items-center gap-2 w-full rounded-xl p-2 hover:bg-black/10 transition-colors duration-150",
        isActive && "bg-black/5"
      )}
      onClick={onMarkAsSeen}
    >
      <AccountContainer className="" />

      <div className="flex flex-col">
        <p
          className={
            !isLastMessageSeen && !isLastMessageSender
              ? "font-semibold"
              : "font-normal"
          }
        >
          {otherUser.name}
        </p>
        {lastMessage && (
          <p
            className={twMerge(
              "text-sm line-clamp-1",
              !isLastMessageSeen && !isLastMessageSender
                ? "font-medium"
                : "text-muted"
            )}
          >
            {isLastMessageSender && "You: "}
            {Messages[0].content} •{" "}
            {format(new Date(Messages[0].createdAt), "hh:mm a")}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ConversationCard;
