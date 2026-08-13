require("dotenv").config();

const express = require("express");
const authMiddleware = require('./middleware/authMiddleware')
const errorHandler = require('./middleware/errorHandler')
const postRouter = require("./routes/posts");
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')

const app = express();

app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log("in middleware");
  next();
});

// route
app.use("/posts", authMiddleware, postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// error middleware
app.use(errorHandler);

app.listen(3001, () => {
  console.log("listening port 3001");
});
