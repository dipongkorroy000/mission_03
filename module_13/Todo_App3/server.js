const http = require("http");
const path = require("path");
const fs = require("fs");
const { json } = require("stream/consumers");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method);

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;
  // req.url --alternative--> pathname
  // console.log(url, "url");

  if (req.url === "/" && req.method === "GET") {
    res.end("running server");
  }
  // get all todos
  else if (pathname === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(data);
  }
  // post todo
  else if (pathname === "/todos/create-todos" && req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      // console.log("data", data);
      const { title, body } = JSON.parse(data);
      // console.log("todo", { title, body });

      const createdAt = new Date().toLocaleString();

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });

      const parseTodos = JSON.parse(allTodos);

      parseTodos.push({ title, body, createdAt });

      fs.writeFileSync(filePath, JSON.stringify(parseTodos, null, 2), { encoding: "utf-8" });

      res.end(JSON.stringify({ title, body, createdAt }, null, 2));
    });
  }
  // get a todo by "/todo?title=prisma"
  // else if (req.url.startsWith("/todo") && req.method === "GET") {
  //   res.end("single todo");
  // }

  // alternative
  else if (pathname === "/todo" && req.method === "GET") {
    const title = url.searchParams.get("title");
    // console.log(title)

    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parseData = JSON.parse(data);

    const todo = parseData.find((todo) => todo.title === title);

    const stringifiedTodo = JSON.stringify(todo);

    res.end(stringifiedTodo);
  }

  // update a todo
  else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
    const title = url.searchParams.get("title");

    let data = "";

    req.on("data", (chunk) => {
      data = data + chunk;
    });

    req.on("end", () => {
      const { body } = JSON.parse(data);

      const todos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parseTodos = JSON.parse(todos);

      const todoIndex = parseTodos.findIndex((todo) => todo.title === title);

      parseTodos[todoIndex].body = body; // update body

      fs.writeFileSync(filePath, JSON.stringify(parseTodos, null, 2), { encoding: "utf-8" });

      res.end(JSON.stringify({ title, body, createdAt: parseTodos[todoIndex].createdAt }, null, 2));
    });
  }

  // delete a todo
  else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
    const title = url.searchParams.get("title");
   
    
  }

  // not found
  else {
    res.end("Router Not Found");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("✅ server listening to port 5000");
});

/**
 *  /Todos - GET - All Todos
 *  /Todos/create-todos Post create Todo
 *
 *
 *
 */
