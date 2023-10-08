import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [newBlogTitle, setBlogtitle] = useState("");
  const [newBlogAuthor, setBlogAuthor] = useState("");
  const [newBlogUrl, setBlogUrl] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      getBlogs();
    }
  }, []);

  const getBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const newblog = {
        author: newBlogAuthor,
        title: newBlogTitle,
        url: newBlogUrl,
      };

      const blog = await blogService.create(newblog);
      setBlogs(blogs.concat(blog));

      setNotification({
        type: "success",
        message: `a new blog ${newBlogTitle} by ${newBlogAuthor} added.`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);

      setBlogAuthor("");
      setBlogUrl("");
      setBlogtitle("");
    } catch (exception) {
      setNotification({
        type: "error",
        message: `error ${exception}.`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleTitleChange = (event) => {
    setBlogtitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({
        type: "error",
        message: `wrong username or password.`,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      Log in to application
      <div>
        username{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogList = () => (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in{" "}
        <button onClick={handleLogout} type="submit">
          logout
        </button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      Title <input value={newBlogTitle} onChange={handleTitleChange} />
      Author <input value={newBlogAuthor} onChange={handleAuthorChange} />
      Url <input value={newBlogUrl} onChange={handleUrlChange} />
      <button type="submit">create</button>
    </form>
  );

  return (
    <div>
      <Notification notification={notification} />
      {!user && loginForm()}
      {user && blogList()}
      {user && blogForm()}
    </div>
  );
};

export default App;
