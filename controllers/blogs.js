const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
	const body = request.body;
	const user = request.user;

	try {
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes || 0,
			user: user._id,
		});

		// Save the blog post to the database
		const savedBlog = await blog.save();
		// Add the saved blog's ID to the user's blogs array
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();

		// Respond with the saved blog
		response.status(201).json(savedBlog);
	} catch (error) {
		response.status(400).json({ error: error.message });
	}
});

blogRouter.delete("/:id", async (request, response) => {
	try {
		const blog = await Blog.findById(request.params.id);

		// Ensure the blog exists
		if (!blog) {
			return response.status(404).json({ error: "blog not found" });
		}

		// Check if the user deleting the blog is the creator
		if (blog.user.toString() !== request.user._id.toString()) {
			return response
				.status(403)
				.json({ error: "you are not authorized to delete this blog" });
		}

		// Delete the blog
		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).end();
	} catch (error) {
		response.status(400).json({ error: error.message });
	}
});

module.exports = blogRouter;
