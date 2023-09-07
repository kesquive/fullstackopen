const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("all blogs are returned as json", async () => {
  const response = await api.get("/api/blogs");

  expect(response.headers["content-type"]).toMatch(/application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
}, 100000);

test("blog has a property named id", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].id).toBeDefined();
});

test("successfully create a new blog post", async () => {
  const newBlog = {
    title: "Hello America",
    author: "Peter",
    url: "peter.com/blog",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((n) => n.title);
  expect(contents).toContain("Hello America");
});

test("validate default value for property likes", async () => {
  const newBlog = {
    title: "Hello w/h likes",
    author: "None",
    url: "none.com/blog",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0);
});

test("validate missing value for title and url", async () => {
  const newBlog = {
    author: "Just me",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
});

test("succeeds to delete a blog", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToDelete = blogAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogAtEnd = await helper.blogsInDb();

  expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const contents = blogAtEnd.map((r) => r.title);

  expect(contents).not.toContain(blogToDelete.title);
});

test("update title of a blog", async () => {
  const blogAtStart = await helper.blogsInDb();
  const blogToUpdate = blogAtStart[0];
  blogToUpdate.likes = 50;

  await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(200);

  const blogsAtEnd = await helper.blogsInDb();
  const blogUpdated = blogsAtEnd[0];
  expect(blogUpdated.likes).toEqual(50);
});

afterAll(async () => {
  await mongoose.connection.close();
});
