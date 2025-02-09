const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createServer } = require("http");
const InitRoutes = require("./routes");
const cookieParser = require("cookie-parser");
// const { Server } = require("socket.io");

const connectDB = require("./config/MongoDB");
dotenv.config();

const app = express();
const server = createServer(app);

app.use(cookieParser());
app.use(express.json());
app.use(cors());
// Connect to MongoDB
connectDB();

// Init all routes
InitRoutes(app);

//Server
const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

