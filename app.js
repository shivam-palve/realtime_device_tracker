/*const express = require('express');
const app = express();
const path = require("path");
const http = require("http");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
  socket.on("send-location", function(data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function() {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", function(req, res) {
  res.render("index");
});

server.listen(3000);*/
const express = require('express');
const app = express();
const path = require("path");
const http = require("http");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
  console.log(`New connection: ${socket.id}`);  // Debugging line

  socket.on("send-location", function(data) {
    console.log(`Location received from ${socket.id}:`, data);  // Debugging line
    io.emit("receive-location", { id: socket.id, ...data });
  });

  socket.on("disconnect", function() {
    console.log(`User disconnected: ${socket.id}`);  // Debugging line
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", function(req, res) {
  res.render("index");
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});


