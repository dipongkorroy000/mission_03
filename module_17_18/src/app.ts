import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./app/controllers/notes.controller";
import { usersRoutes } from "./app/controllers/users.controller";

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRoutes);

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
