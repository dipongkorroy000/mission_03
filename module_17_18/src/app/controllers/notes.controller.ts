import { Note } from "../models/notes.model";
import express, { Request, Response } from "express";
export const notesRoutes = express.Router()

notesRoutes.post("/create-note", async (req: Request, res: Response) => {
  const data = req.body;

  const note = await Note.create(data);
  res.status(201).json({ success: true, message: "created successfully", note });

  // notesRoutesroach -1 of creating a data
  //   const myNote = new Note({
  //     title: "Learning Express",
  //     tags: {
  //       label: "database",
  //     },
  //   });
  //   await myNote.save();
});

notesRoutes.get("/", async (req: Request, res: Response) => {
  // const notes = await Note.find();
  const notes = await Note.find().populate('user')
  res.status(200).json({ notes });
});

notesRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  // const note = await Note.findById(noteId);
  // alternative
  const note = await Note.findOne({ _id: noteId });

  res.status(200).json({ note });
});

notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updateDoc = req.body;

  // const result = await Note.findByIdAndUpdate(noteId, updateDoc, { new: true });
  // alternative
  // const result = await Note.updateOne({ _id: noteId }, updateDoc, { upsert: true });
  // alternative
  const result = await Note.findOneAndUpdate({ _id: noteId }, updateDoc, { upsert: true });

  res.status(200).json({ success: true, message: "Note updated successfully", result });
});

notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  // const result = await Note.findByIdAndDelete(noteId);
  // alternative
  // const result = await Note.deleteOne({ _id: noteId });
  // alternative
  const result = await Note.findOneAndDelete({ _id: noteId });

  res.status(200).json({ success: true, message: "Note Delete successfully", result });
});