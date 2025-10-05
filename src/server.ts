import express from "express";
import userRoutes from "./handlers/userHandler.js";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/home", (req, res) => {
  res.send("Hello world!, this is the start page of your API");
});

userRoutes(app);
