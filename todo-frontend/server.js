const express = require("express");
const path = require("path");
const app = express();
app.use(express.static("./dist/todo-frontend"));
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/todo-frontend/" });
});
app.listen(process.env.PORT || 8080, () => {
  console.log("app running");
});
