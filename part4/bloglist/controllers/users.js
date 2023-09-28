const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (!username || !password) {
    return response
      .status(400)
      .json({ error: "username and password are required" });
  }

  if (password.length < 3) {
    return response.status(400).json({ error: "Password is too short (3)" });
  }

  if (username.length < 3) {
    return response.status(400).json({ error: "Username is too short (3)" });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username: username,
      name: name,
      passwordHash: passwordHash,
    });

    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

module.exports = usersRouter;
