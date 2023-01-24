const path = require("path");
const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
dotenv.config();
connectDB();

console.log(process.env.PORT);
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/test", (req, res) => {
  res.send("Api");
});

// deployment

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
