const router = require("express").Router();
const userController = require("../controllers/user.controller");

//todo: implement get, post, put, delete
router.post('/register', userController.registerUser);

module.exports = router;
