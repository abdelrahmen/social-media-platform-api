const Post = require("../routers/user.router");
const jwt = require("jsonwebtoken");

exports.createPost = async (req, res) => {
  try {
    const { text, image } = req.body;
    const token = req.headers.authorization || req.headers.Authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const createdBy = decoded.userId;

    const post = new Post({
      text,
      image,
      createdBy,
    });

    await post.save();

    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const token = req.headers.authorization || req.headers.Authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const createdBy = decoded.userId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      text,
      createdBy,
    };

    post.comments.push(comment);

    await post.save();

    res.status(201).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
