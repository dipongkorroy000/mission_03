import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { client } from "../../config/mongodb";
import { ObjectId } from "mongodb";

export const todosRouter = express.Router();

// const filepath = path.join(__dirname, "../../../db/todo.json");

const db = client.db("todosNextLevel");
const todosCollection = db.collection("todos");

todosRouter.get("/", async (req: Request, res: Response) => {
  //   const data = fs.readFileSync(filepath, { encoding: "utf-8" });
  // console.log(data)
  const result = await todosCollection.find().toArray();

  res.json(result);
});

todosRouter.get("/:id", async (req: Request, res: Response) => {
  //   const data = fs.readFileSync(filepath, { encoding: "utf-8" });
  // console.log(req.params.id);
  const id = await req.params.id;
  const query = await { _id: new ObjectId(id) };
  const result = await todosCollection.findOne(query);

  res.json(result);
});

todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  const { title, description, priority, isCompleted } = req.body;

  // title, description , priority: High, Medium, Low, isCompleted: boolean
  const result = await todosCollection.insertOne({
    title,
    description,
    priority,
    isCompleted,
  });

  res.send(result);
});

todosRouter.patch("/update-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, description, isCompleted } = req.body;

  console.log(id);
  const updateDoc = {
    $set: {
      title: title,
      description: description,
      isCompleted: isCompleted,
    },
  };
  // upsert --> update : up, insert: sert

  const result = await todosCollection.updateOne({ _id: new ObjectId(id) }, updateDoc, { upsert: true });
  res.send(result)
});

todosRouter.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);

  const result = await todosCollection.deleteOne({ _id: new ObjectId(id) });
  res.send(result);
});
