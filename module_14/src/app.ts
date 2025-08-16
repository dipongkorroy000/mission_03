import express, { Application, NextFunction, Request, Response } from "express";
import { todosRouter } from "./app/todos/todos.routes";
import fs from "fs";
import { error } from "console";
const app: Application = express();

app.use(express.json());

const userRouter = express.Router();

app.use("/todos", todosRouter);
app.use("/users", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Todo app");
});

// when any route not match then call this middleware and this middleware position is fixed
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route Not Found" });
});

// when server error found then call this middleware and this middleware position is fixed
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  // when error call --> must be call next
  if (error) {
    console.log(error, "error");

    res.status(400).json({ message: "something went wrong, from global error handler", error });
  }
});

// app.get("/todos/:title/:body",(req: Request, res: Response) => {
//   console.log("from query", req.query);
//   console.log("from params", req.params);

//   const data = fs.readFileSync(filepath, { encoding: "utf-8" });

//   // console.log(data)

//   res.json(data);
// });

export default app;

/**
 * -------------- Basic file structure -------
 * server --> server handling like - starting, closing , error handling, only related to server
 * app file --> routing handle, middleware, route related error handling,
 * app folder--> app business logic handling like create, read, update, delete, database related works
 *
 */
