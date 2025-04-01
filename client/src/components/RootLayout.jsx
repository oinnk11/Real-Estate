import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import socket from "../utils/socket";
import useAuthContext from "../hooks/useAuthContext";
import { toast } from "react-toastify";

const RootLayout = () => {
  const location = useLocation();
  const isInbox = location.pathname.includes("inbox");

  const { user } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      socket.emit("sub", user.id);
    }
  }, [user]);

  useEffect(() => {
    const handleReceiveMessageNotification = (message) => {
      if (!isInbox)
        toast(
          <div>
            <strong>New message from {message.sender.name}</strong>
            <p>{message.content}</p>
          </div>,
          {
            onClick: () => {
              navigate(`/inbox/chat/${message.chatId}`);
              toast.dismiss();
            },
          }
        );
    };

    socket.on("receiveMessage", handleReceiveMessageNotification);

    return () => {
      socket.off("receiveMessage", handleReceiveMessageNotification);
    };
  }, [isInbox]);

  return (
    <>
      <Navbar />
      <Outlet />
      {!isInbox && <Footer />}
    </>
  );
};

export default RootLayout;
