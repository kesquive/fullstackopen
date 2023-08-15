const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Hello World",
    author: "Mario",
    url: "mario.com/blog",
    likes: 10,
  },
  {
    title: "Hello People",
    author: "John",
    url: "john.com/blog",
    likes: 3,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon", author: "me" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
