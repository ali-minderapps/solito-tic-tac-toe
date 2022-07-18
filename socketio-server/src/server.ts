var express = require("express");
var path = require("path");

import socketServer from "./socket";
import "reflect-metadata";
import * as http from "http";

var app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

var PORT = 9000;

app.get("/", function (req, res) {
  res.status(200).send("Hello world");
});

var server = http.createServer(app);

server.listen(PORT, function () {
  console.log("Server is running on PORT:", PORT);
});

socketServer(server);
