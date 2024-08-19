import http from "http";
import {WebSocketServer} from "ws";
import path from 'path';
const __dirname = path.resolve();

import express from "express";
import { Socket } from "dgram";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public")); //public 폴터를 유저에게 공개
app.get("/", (req, res) => res.render("home")); //홈페이지로 이동시 사용될 템플릿을 렌더해줌
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocketServer({ server })

// const handleConnecction = (Socket) => {
//   console.log(Socket)
// } 이 방법은 비추

const sockets = [];

wss.on("connection", (Socket) => {
  sockets.push(Socket);
  console.log("Connected to Browser ✅");
  Socket.on("close", () => console.log("Disconnected from the Browser ❌"))
  Socket.on("message", (message) => {
    const messageString = message.toString("utf8");
    sockets.forEach(aSocket => aSocket.send(messageString)); //각 브라우저를 aSocket으로 표시하고 메시지를 보낸다는 의미
  });
  // Socket.send("hello!!!");
})

server.listen(3000, handleListen);
