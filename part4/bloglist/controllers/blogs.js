const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ erro: "invalid token" });
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id,
    });

    const newBlog = await blog.save();

    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();

    response.status(201).json(newBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const user = request.user;

    if (!user) {
      return response.status(401).json({ erro: "invalid token" });
    }

    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      response.status(401).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  try {
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    };
    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.status(200).json(updatedNote);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
