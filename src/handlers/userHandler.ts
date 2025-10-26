import express, { Request, Response } from "express";
import { User, UserStore } from "../models/user.js";
import bcrypt from "bcrypt";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      username: req.body.username,
      password: req.body.password,
    };

    const pepper = process.env.BCRYPT_PEPPER || "";
    const saltRounds = process.env.SALT_ROUNDS || "10";

    const password_hash = bcrypt.hashSync(
      user.password + pepper,
      parseInt(saltRounds)
    );

    user.password = password_hash;
    const newUser = await store.create(user);
    console.log("Created user:", newUser);
    res.json(newUser);
  } catch (err) {
    console.error("Error in create handler:", err);
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await store.authenticate(username, password);
    if (user) {
      res.json({ success: true, user });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
  } catch (err) {
    console.error("Error in authenticate handler:", err);
    res.status(400).json({ success: false, error: err });
  }
};

const userRoutes = (app: express.Application) => {
  app.get("/users", index);
  app.post("/users", create);
  app.post("/users/authenticate", authenticate);
};

export default userRoutes;
