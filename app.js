const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const usersRouter = require("./controllers/users");
const blogRouter = require("./controllers/blogs");
const loginRouter = require("./controllers/login");

const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB");
	})
	.catch((error) => {
		logger.info("error connecting to MongoDB:", error.message);
	});

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", middleware.userExtractor, blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;