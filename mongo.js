const mongoose = require("mongoose");

if (process.argv.length < 3) {
	console.log(
		"Please provide the password as an argument: node mongo.js <password>"
	);
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://vinaybasargekar13:${password}@cluster0.4qlrh.mongodb.net/blogList?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url).catch((err) => {
	console.error("Error connecting to MongoDB:", err.message);
});

// Define the blog schema
const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number,
});

// Create the Blog model
const Blog = mongoose.model("Blog", blogSchema);

// Create a new blog instance
const blog = new Blog({
	title: "Understanding Mongoose",
	author: "Jane Doe",
	url: "https://example.com/mongoose-guide",
	likes: 42,
});

// Save the blog entry to the database
blog
	.save()
	.then(() => {
		console.log("Blog saved!");
		mongoose.connection.close();
	})
	.catch((err) => {
		console.error("Error saving blog:", err.message);
		mongoose.connection.close();
	});
