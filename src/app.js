require("dotenv").config();

const express = require("express");
const postRouter = require("./routes/posts");
const userRouter = require('./routes/users')

const app = express();

app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log("in middleware");
  next();
});

// route
app.use("/posts", postRouter);
app.use("/users", userRouter);

// error middleware
app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.status || 500).json({
    message: err.message,
  });
});

app.listen(3001, () => {
  console.log("listening port 3001");
});
