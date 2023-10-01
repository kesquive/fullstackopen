const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const bcrypt = require("bcrypt");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("admin", 10);
  const user = new User({
    username: "admin",
    name: "admin",
    passwordHash,
  });

  newUser = await user.save();

  await Blog.deleteMany({});

  const blogObject = helper.initialBlogs.map(
    (blog) =>
      new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        user: newUser._id.toString(),
        likes: blog.likes ? blog.likes : 0,
      })
  );

  const promiseArray = blogObject.map((blog) => {
    blog.save();
    newUser.blogs = newUser.blogs.concat(blog._id);
  });

  await Promise.all(promiseArray);
  await newUser.save();
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

describe("CRUD operations for Blogs", () => {
  let headers;

  beforeEach(async () => {
    const user = {
      username: "admin",
      password: "admin",
    };

    const loginUser = await api.post("/api/login").send(user);

    headers = {
      Authorization: `Bearer ${loginUser.body.token}`,
    };
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
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtEnd.map((n) => n.title);
    expect(contents).toContain("Hello America");
  });

  test("unauthorized for create a new blog post", async () => {
    const newBlog = {
      title: "Hello America",
      author: "Peter",
      url: "peter.com/blog",
      likes: 3,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
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
      .set(headers)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0);
  });

  test("validate missing value for title and url", async () => {
    const newBlog = {
      author: "Just me",
    };

    await api.post("/api/blogs").set(headers).send(newBlog).expect(400);
  });

  test("succeeds to delete a blog", async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToDelete = blogAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204);

    const blogAtEnd = await helper.blogsInDb();

    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogAtEnd.map((r) => r.title);

    expect(contents).not.toContain(blogToDelete.title);
  });

  test("update title of a blog", async () => {
    const blogAtStart = await helper.blogsInDb();
    const blogToUpdate = blogAtStart[0];
    blogToUpdate.likes = 50;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const blogUpdated = blogsAtEnd[0];
    expect(blogUpdated.likes).toEqual(50);
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("123456", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "kesquive",
      name: "kesquive",
      password: "secret",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "123456",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if password is too short", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "other",
      name: "Superuser",
      password: "12",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("Password is too short (3)");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
