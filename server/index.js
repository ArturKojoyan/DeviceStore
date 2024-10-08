require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");
const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes");
const errorHandler = require("./middleware/ErrorHandling");

const PORT = process.env.PORT || 3003;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));

app.use("/api", router);

app.get("/", (req, res) => res.send("Hello!"));

// last middleware
app.use(errorHandler);

const start = async () => { 
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server is running on ${PORT} port`));
  } catch (error) {
    console.log(error, "error");
  }
};

start();
