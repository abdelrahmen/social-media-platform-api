const express = require("express");
const path = require("path");

const userRouter = require("./routers/user.router");
const app = express();

app.get("/", (req, res) => {
  res.send(path.join("./public", "index.html"));
});

app.use("/users", userRouter);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is listening on port 3000`);
});
