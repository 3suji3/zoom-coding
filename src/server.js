import path from 'path';
const __dirname = path.resolve();

import express from "express";

const app = express();

app.set('view engine', "pug");
app.set("views", __dirname + "/src/views");
app.use("/public", express.static(__dirname + "/src/public")); //public 폴터를 유저에게 공개
app.get("/", (req, res) => res.render("home")); //홈페이지로 이동시 사용될 템플릿을 렌더해줌
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen)