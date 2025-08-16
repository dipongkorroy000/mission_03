"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../../config/mongodb");
const mongodb_2 = require("mongodb");
exports.todosRouter = express_1.default.Router();
// const filepath = path.join(__dirname, "../../../db/todo.json");
const db = mongodb_1.client.db("todosNextLevel");
const todosCollection = db.collection("todos");
exports.todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const data = fs.readFileSync(filepath, { encoding: "utf-8" });
    // console.log(data)
    const result = yield todosCollection.find().toArray();
    res.json(result);
}));
exports.todosRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   const data = fs.readFileSync(filepath, { encoding: "utf-8" });
    // console.log(req.params.id);
    const id = yield req.params.id;
    const query = yield { _id: new mongodb_2.ObjectId(id) };
    const result = yield todosCollection.findOne(query);
    res.json(result);
}));
exports.todosRouter.post("/create-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority, isCompleted } = req.body;
    // title, description , priority: High, Medium, Low, isCompleted: boolean
    const result = yield todosCollection.insertOne({
        title,
        description,
        priority,
        isCompleted,
    });
    res.send(result);
}));
exports.todosRouter.patch("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const result = yield todosCollection.updateOne({ _id: new mongodb_2.ObjectId(id) }, updateDoc, { upsert: true });
    res.send(result);
}));
exports.todosRouter.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    const result = yield todosCollection.deleteOne({ _id: new mongodb_2.ObjectId(id) });
    res.send(result);
}));
