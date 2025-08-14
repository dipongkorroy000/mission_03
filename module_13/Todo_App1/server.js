const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method);

  if (req.url === "/" && req.method === "GET") {
    res.end("Start Server");
  } else if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, {
      "content-type": "text/plain",
      email: "ph@gmail.com",
    });

    res.end("hello todos");
  } else if (req.url === "/todo" && req.method === "GET") {
    // alternative of res.writeHead()
    res.setHeader("content-type", "text/plain");
    res.setHeader("email", "ph2@gmail.com");
    res.statusCode = 201;

    res.end("hello todo");
  } else if (req.url === "/todos/create-todos" && req.method === "POST") {
    res.end("Create Todos");
  } else {
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
