import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import env from "dotenv";

env.config();

let server: Server;

const port = 5000;

async function main() { 
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_PRO_NAME}:${process.env.MONGODB_PRO_PASS}@cluster0.azvkhy2.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0`
    );

    server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
