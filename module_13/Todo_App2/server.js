const http = require("http");

const data = [
  {
    title: "prisma", 
    body: "learning node",
    createdAt: "5/18/25, 1:25:02 AM" 
  }, {
    title: "typescript", 
    body: "learning node",
    createdAt: "5/18/25, 1:25:02 AM" 
  }
]

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method);

  if (req.url === "/" && req.method === "GET") {
    res.end("Start Server");
      
  } else if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
      email: "ph@gmail.com",
    });

    res.end(JSON.stringify(data));
      
  } else if (req.url === "/todosHtml" && req.method === "GET") {
      res.writeHead(200, {
      "content-type": "text/html",
      email: "ph@gmail.com",
    });

    res.end(`<h1>Hello World</h1> <h2>Hello World</h2> <h3>Hello World</h3>`);
      
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
