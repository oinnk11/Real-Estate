import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("sub", (userId) => {
      socket.join(userId);
    });

    socket.on("unsub", () => {
      console.log("Socket disconnected:", socket.id);
    });

    socket.on("typing", ({ userId }) => {
      socket.to(userId).emit("typing", { userId });
    });

    socket.on("stopTyping", ({ userId }) => {
      socket.to(userId).emit("stopTyping");
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
