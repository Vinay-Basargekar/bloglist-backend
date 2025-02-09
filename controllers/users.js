const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs", {
		title: 1,
		author: 1,
		content: 1,
		likes: 1,
	});
	response.json(users);
});

usersRouter.post("/", async (request, response) => {
	const { username, name, password } = request.body;

	// Check if both username and password are provided
	if (!username || !password) {
		return response
			.status(400)
			.json({ error: "username and password are required" });
	}

	// Ensure username and password are at least 3 characters long
	if (username.length < 3 || password.length < 3) {
		return response.status(400).json({
			error: "username and password must be at least 3 characters long",
		});
	}

	// Check if the username is unique
	const existingUser = await User.findOne({ username });
	if (existingUser) {
		return response.status(400).json({ error: "username must be unique" });
	}

	// Hash the password before saving
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	// Create and save the new user
	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

module.exports = usersRouter;
