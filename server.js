
const http = require("http");
const fs = require("fs");
const path = require("path");

const comments = {
  1: [
    { id: 1, name: "Rahul", text: "Great post!" },
    { id: 2, name: "Priya", text: "Very helpful." }
  ],
  2: [
    { id: 3, name: "Amit", text: "Nice information!" },
    { id: 4, name: "Sneha", text: "Thanks for sharing." }
  ],
  3: [
    { id: 5, name: "John", text: "Amazing work!" }
  ]
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost:3000");

  // API: Get comments for a particular post
  if (url.pathname === "/comments" && req.method === "GET") {
    const postId = url.searchParams.get("post_id");

    if (!postId || !comments[postId]) {
      res.writeHead(404, {
        "Content-Type": "application/json"
      });

      return res.end(JSON.stringify({
        error: "Comments not found"
      }));
    }

    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify(comments[postId]));
  }

  // Serve frontend files
  const files = {
    "/": "index.html",
    "/index.html": "index.html",
    "/style.css": "style.css",
    "/script.js": "script.js"
  };

  const file = files[url.pathname];

  if (!file) {
    res.writeHead(404);
    return res.end("Page not found");
  }

  const filePath = path.join(__dirname, "public", file);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Server error");
    }

    const types = {
      ".html": "text/html",
      ".css": "text/css",
      ".js": "text/javascript"
    };

    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "text/plain"
    });

    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
