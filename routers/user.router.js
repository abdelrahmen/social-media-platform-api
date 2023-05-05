const router = require("express").Router();
const userController = require("../controllers/user.controller");

//todo: implement put
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/users", userController.getAllUsers);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
