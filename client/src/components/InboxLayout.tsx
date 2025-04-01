import { Outlet, useLocation } from "react-router-dom";
import ConversationCard from "./ConversationCard";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { getUserChats } from "../hooks/useChat";
import useAuthContext from "../hooks/useAuthContext";
import { Loader2 } from "lucide-react";
import socket from "../utils/socket";

const InboxLayout = () => {
  const { user } = useAuthContext();

  const location = useLocation();
  const isInboxPage = location.pathname === "/inbox";

  const [chats, setChats] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const fetchChats = async () => {
    const response = await getUserChats(user.id);

    if (response.success) {
      setChats(response.data);
    }
  };

  socket.on("receiveMessage", () => {
    fetchChats();
  });

  useEffect(() => {
    setIsChatLoading(true);
    fetchChats();
    setIsChatLoading(false);
  }, []);

  return (
    <div className="fluid max-md:p-0 flex h-full">
      <div
        className={twMerge(
          "max-w-[300px] w-full border-x py-4 px-2 h-[calc(100vh-80px)] overflow-y-auto",
          isInboxPage ? "max-md:max-w-full" : "max-md:w-0 max-md:hidden"
        )}
      >
        <h1 className="text-xl font-bold ml-2">Your Inbox</h1>

        <ul className="mt-4 space-y-1">
          {isChatLoading ? (
            <Loader2 className="animate-spin" />
          ) : chats.length > 0 ? (
            chats.map((chat) => (
              <li key={`chat-${chat?.id}`}>
                <ConversationCard chat={chat} />
              </li>
            ))
          ) : (
            <p className="text-center italic text-muted">
              No converstations yet.
            </p>
          )}
        </ul>
      </div>
      <div
        className={twMerge(
          "flex-1 md:border-r",
          isInboxPage && "max-md:w-0 max-md:hidden"
        )}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default InboxLayout;
