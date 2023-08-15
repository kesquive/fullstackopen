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

afterAll(async () => {
  await mongoose.connection.close();
});
