// require("dotenv").config();
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`
});

console.log('[ENVIRONMENT]:', process.env.NODE_ENV);

const express = require("express");
const logger = require('./middleware/logger')
const authMiddleware = require('./middleware/authMiddleware')
const errorHandler = require('./middleware/errorHandler')
const postRouter = require("./routes/posts");
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')

const app = express();

app.use(express.json());

// middleware
app.use(logger);

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
