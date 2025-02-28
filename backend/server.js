const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("http");
const InitRoutes = require("./routes");
const cookieParser = require("cookie-parser");
//socket.io
const { Server } = require("socket.io");
const Message = require("./models/Message");

const connectDB = require("./config/MongoDB");
dotenv.config();

const app = express();
const server = createServer(app);

// Thiết lập middleware trước
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Kết nối MongoDB trước
connectDB().then(() => {
  // Khởi tạo Socket.IO sau khi đã kết nối MongoDB
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", async (messageData) => {
      try {
        const message = new Message(messageData);
        await message.save();
        io.emit("receiveMessage", message);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Khởi tạo routes
  InitRoutes(app);

  // Khởi động server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
