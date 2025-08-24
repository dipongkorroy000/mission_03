import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";
import bcrypt from "bcryptjs";

export const usersRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

usersRoutes.post("/create-user", async (req: Request, res: Response) => {
  try {
    const body = await req.body;
    // use zod schema -> it is a mongoose of on layer
    // const body = await CreateUserZodSchema.parseAsync(req.body);

    // const password = await bcrypt.hash(body.password, 10);
    // body.password = password

    // build in and custom instance method
    // const user = new User(body);
    // const password = await user.hashPassword(body.password);
    // user.password = password;
    // await user.save();

    // build in and custom static method
    // const password = await User.hashPassword(body.password);
    // body.password = password;

    await User.create(body);

    res.status(201).json({ success: true, message: "user created successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, error });
  }
});

usersRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json({ success: true, message: "all user retrived successfully", users });
});

usersRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const result = await User.findById(userId);

  res.status(200).json({ success: true, message: "user retrived successfully", result });
});

usersRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updateDoc = req.body;

  const result = await User.findByIdAndUpdate(userId, updateDoc, { new: true });

  res.status(200).json({ success: true, message: "user updated successfully", result });
});

usersRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  // const result = await User.findByIdAndDelete(userId);
  await User.findOneAndDelete({ _id: userId });

  res.status(200).json({ success: true, message: "user deleted successfully" });
});
