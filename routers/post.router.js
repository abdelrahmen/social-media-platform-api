const router = require("express").Router();
const postController = require("../controllers/post.controller");

//todo: implement get, post, put, delete
router.post("/post", postController.createPost);


module.exports = router;
