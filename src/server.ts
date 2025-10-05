import express from "express";
import userRoutes from "./handlers/userHandler.js";

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.json()); //used as I'm sending json data in the body of the request

app.get("/home", (req, res) => {
  res.send("Hello world!, this is the start page of your API");
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Body:`, req.body);
  next();
});

userRoutes(app);
