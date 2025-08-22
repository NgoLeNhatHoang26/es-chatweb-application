
import express from 'express';
import http from 'http'; // sử dụng http để tạo server
import { Server } from 'socket.io';
import cors  from 'cors';

const app = express(); // tạo backend server
app.use(cors());
app.get("/", (req, res) => {
  res.send("✅ Socket server is running");
});

const server = http.createServer(app); // tạo http server từ express app

const io = new Server(server, { // khởi tạo socket.io với server
  cors: { 
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
const onlineUsers = new Map();
// Dùng map để lưu userId <-> socket.id
io.on("connection", (socket) => {
  socket.on("join", (userId: string) => {
  onlineUsers.set(userId, socket.id);
  });

  socket.on("join-group", (groupId) => {
    socket.join(groupId);
  });

  socket.on("user-typing", ({ senderId, receiverId, type }) => {
    if (type === "user") {
      // Chat 1-1
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("user-typing", { senderId, receiverId, type });
      }
    } else if (type === "group") {
      // Chat nhóm → broadcast cho tất cả user trong room groupId, trừ sender
      socket.to(receiverId).emit("user-typing", { senderId, groupId: receiverId, type });
    }
  });

  socket.on("user-stop-typing", ({ senderId, receiverId, type }) => {
    if (type === "user") {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("user-stop-typing", { senderId, receiverId, type });
      }
    } else if (type === "group") {
      socket.to(receiverId).emit("user-stop-typing", { senderId, groupId: receiverId, type });
    }
  });


  socket.on("send-message", ({ message, receiverId, type }) => {
    if (type === "user") {
      // Tin nhắn 1-1
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receive-message", message);
      }
    }

    if (type === "group") {
      // Tin nhắn nhóm
      socket.to(receiverId).emit("receive-group-message", {
        groupId: receiverId,
        message
      });
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, sockId] of onlineUsers.entries()) {
      if (sockId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
  });
});

server.listen(3002, () => {
  console.log('Server is running on http://localhost:3002');
});
