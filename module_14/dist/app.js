"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = require("./app/todos/todos.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const userRouter = express_1.default.Router();
app.use("/todos", todos_routes_1.todosRouter);
app.use("/users", userRouter);
app.get("/", (req, res) => {
    res.send("Welcome to Todo app");
});
// when any route not match then call this middleware and this middleware position is fixed
app.use((req, res) => {
    res.status(404).json({ message: "Route Not Found" });
});
// when server error found then call this middleware and this middleware position is fixed
app.use((error, req, res, next) => {
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
exports.default = app;
/**
 * -------------- Basic file structure -------
 * server --> server handling like - starting, closing , error handling, only related to server
 * app file --> routing handle, middleware, route related error handling,
 * app folder--> app business logic handling like create, read, update, delete, database related works
 *
 */
