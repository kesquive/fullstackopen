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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
