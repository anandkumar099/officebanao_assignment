const express = require("express");
var multer = require("multer");
const app = express();
app.use(express.json());
app.use("/images", express.static("uploads"));

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: async function (req, file, callback) {
    const nanoid = await import("nanoid");
    req.body.filename = nanoid.nanoid() + "_" + file.originalname;
    callback(null, req.body.filename);
  },
});
exports.upload = multer({ storage: storage }).single("image");

const Router = require("./routes/routes");
const sequelize = require("./db_config");
const ToDoNote = require("./schema/notes_model");

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    await ToDoNote.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDb();

app.use("/api/v1", Router);
app.get("/", (req, res) => {
  return res.end("hello");
});
app.listen("3000", "0.0.0.0", () => {
  console.log("server is running...");
});
