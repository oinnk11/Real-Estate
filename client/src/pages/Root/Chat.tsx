import { ArrowLeft, Loader2, Send } from "lucide-react";
import AccountContainer from "../../components/AccountContainer";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Input from "../../components/Input";
import socket from "../../utils/socket";
import {
  getMessagesByChat,
  markMessageAsSeen,
  sendMessage,
} from "../../hooks/useMessage";
import { toast } from "react-toastify";
import { getChatById } from "../../hooks/useChat";
import useAuthContext from "../../hooks/useAuthContext";
import MessageContainer from "../../components/message/MessageContainer";
import TypingIndicator from "../../components/TypingIndicator";

const MemoizedTypingIndicator = React.memo(({ name, isTyping }) => {
  if (!isTyping) return null;

  return <TypingIndicator name={name} isTyping={isTyping} />;
});

const Chat = () => {
  const { user: currentUser } = useAuthContext();

  const { id: chatId } = useParams();

  const [chatUser, setChatUser] = useState(null);

  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const typingTimeoutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [unseenMessage, setUnseenMessage] = useState(false);

  const typingIndicatorRef = useRef(null);

  const endRef = useRef(null);

  const scorllToEnd = () => {
    endRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const onMessageChange = (value) => {
    setMessage(value);

    socket.emit("typing", { userId: chatUser.id });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    if (!value.trim()) {
      socket.emit("stopTyping", { userId: chatUser.id });
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", { userId: chatUser.id });
    }, 2000);
  };

  const fetchChat = async () => {
    const response = await getChatById(chatId);

    if (response.success) {
      const chatData = response.data;
      const currentUserId = currentUser.id;
      const otherUser =
        currentUserId === chatData.user1.id ? chatData.user2 : chatData.user1;
      setChatUser(otherUser);
    }
  };

  const onSendMessage = async () => {
    const response = await sendMessage(chatId, message, chatUser.id);

    if (response.success) {
      setMessage("");
      socket.emit("stopTyping", { userId: chatUser.id });
    } else {
      toast.error(response.error);
    }
  };

  const fetchMessages = async () => {
    setMessagesLoading(true);

    const response = await getMessagesByChat(chatId);

    if (response.success) {
      setMessages(response.data);

      const unseenMessages = messages.filter(
        (msg) => !msg.isSeen && msg.userId !== currentUser.id
      );

      if (unseenMessages.length > 0) {
        await markMessageAsSeen(chatId);
      }
    } else {
      toast.error(response.error);
    }

    setMessagesLoading(false);
  };

  // Chat Events Handler
  useEffect(() => {
    const handleMessageSeen = ({ message }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === message.id ? { ...msg, isSeen: true } : msg
        )
      );
    };

    const handleReceiveMessage = async (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);

      if (newMessage.userId !== currentUser.id) {
        await markMessageAsSeen(chatId);
      }
    };

    const handleTyping = () => setIsTyping(true);

    const handleStopTyping = () => setIsTyping(false);

    socket.on("messageSeen", handleMessageSeen);
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    return () => {
      socket.off("messageSeen", handleMessageSeen);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, []);

  // Chat Change Handler
  useEffect(() => {
    if (!chatId) return;
    const loadChatData = async () => {
      await fetchChat();
      await fetchMessages();
    };

    loadChatData();
  }, [chatId]);

  // Scroll To Bottom Handler
  useEffect(() => {
    if (!messagesLoading || isTyping) {
      setTimeout(() => {
        scorllToEnd();
      }, 0);
    }
  }, [chatId, messagesLoading]);

  useEffect(() => {
    if (typingIndicatorRef.current) {
      const distanceFromBottom =
        window.innerHeight -
        typingIndicatorRef.current.getBoundingClientRect().bottom;

      if (distanceFromBottom > 0) {
        scorllToEnd();
      }
    }
  }, [isTyping]);

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto flex flex-col border-t hide-scrollbar">
      <header className="sticky top-0 bg-white flex items-center gap-4 border-b py-3 px-4">
        <Link
          to="/inbox"
          className="btn-neutral !rounded-full aspect-square md:hidden"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="flex items-center gap-2">
          <AccountContainer className="" />
          <span className="flex flex-col">
            <b>{chatUser?.name}</b>
            <p className="text-sm text-muted">{chatUser?.email}</p>
          </span>
        </div>
      </header>

      <div className="p-2 flex flex-col gap-2 justify-end mt-auto">
        {chatUser && (
          <div className="mx-auto flex items-center flex-col gap-2 mb-4">
            <AccountContainer className="" />

            <div className="flex flex-col items-center">
              <b>{chatUser?.name}</b>
              <p className="text-muted text-sm">{chatUser?.email}</p>
            </div>
            <i className="text-sm text-center text-muted">
              This is the start of your conversation.
            </i>
          </div>
        )}

        <div>
          {messagesLoading ? (
            <Loader2 className="animate-spin mx-auto mb-5" />
          ) : (
            messages.map((message, index) => {
              const prevMessage = messages[index - 1];
              const nextMessage = messages[index + 1];

              return (
                <MessageContainer
                  prevMessage={prevMessage}
                  message={message}
                  nextMessage={nextMessage}
                  key={`${chatId}-message-${message.id}`}
                />
              );
            })
          )}

          <div ref={endRef}></div>
        </div>

        <div ref={typingIndicatorRef}>
          <MemoizedTypingIndicator
            name={chatUser?.name ?? ""}
            isTyping={isTyping}
          />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          socket.emit("sendMessage", { chatId, message });
          onSendMessage();
        }}
        className="border-y sticky bottom-0 bg-white flex items-center gap-4 py-2 px-4 w-full"
      >
        <Input
          value={message}
          onChange={onMessageChange}
          name="message"
          width={"100%"}
          classname=""
          placeholder="Message..."
        />
        <button
          className="btn-neutral !rounded-full aspect-square !p-2"
          disabled={!!!message.trim()}
        >
          <Send className="size-5 text-primary" />
        </button>
      </form>
    </div>
  );
};

export default Chat;
