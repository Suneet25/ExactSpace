let express = require("express");
let cors = require("cors");
let morgan = require("morgan");
let colors = require("colors");
let dotenv = require("dotenv");
let { connectDB } = require("./config/db");
const ChatRouter = require("./routes/ChatRoutes");

//config
dotenv.config();

let app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Chat
app.use("/api", ChatRouter);
//Home
app.use("/", (req, res) => {
  res.send("Welcome to the Chat App 📱");
});

//port

let port = process.env.PORT || 8000;

//listen to the server

app.listen(port, () => {
  try {
    connectDB;
    console.log("Connected to the DB 🚀".bgMagenta);
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is running on port ${port} 🎉`.bgYellow);
});
