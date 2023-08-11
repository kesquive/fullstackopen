const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.forEach((blog) => {
    sum += blog.likes;
  });
  return sum;
};

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((max, obj) => {
    if (obj.likes > max.likes) {
      return {
        title: obj.title,
        author: obj.author,
        likes: obj.likes,
      };
    } else {
      return {
        title: max.title,
        author: max.author,
        likes: max.likes,
      };
    }
  });
  return favorite;
};

const mostBlogs = (blogs) => {
  const authorCounts = blogs.reduce((authorCount, blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1;
    return authorCount;
  }, {});
  let maxCount = Math.max(...Object.values(authorCounts));
  let mostFrequent = Object.keys(authorCounts).filter(
    (author) => authorCounts[author] === maxCount
  );
  return {
    author: mostFrequent[0],
    blogs: maxCount,
  };
};

const mostLikes = (blogs) => {
  const authorCounts = blogs.reduce((authorCount, blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + blog.likes;
    return authorCount;
  }, {});
  let maxLikes = Math.max(...Object.values(authorCounts));
  let mostLikes = Object.keys(authorCounts).filter(
    (author) => authorCounts[author] === maxLikes
  );
  return {
    author: mostLikes[0],
    likes: maxLikes,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
