//Arquivo .env, contém informações de ambiente de desenvolvimento, como senhas, usuários, configs, etc
//Deve estar no .gitignore para n ser enviado nem baixado por outras pessoas
require('dotenv').config();
// import express from 'express';
const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTIONSTRING).then(() => {
    console.log('Conectei à base de dados')
  app.emit("pronto");
})
.catch(e => console.log(e));

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const routes = require("./routes");
const path = require("path");
const helmet = require('helmet');
const csrf = require('csurf');
const { middlewareGlobal, checkCsrfError, csrfTokenMiddleware } = require("./src/middleware/middleware");

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

const sessionOptions = session({
  secret: process.env.SECRET_KEY,
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flash());

app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

//Nossos próprios middlewares
app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfTokenMiddleware);
app.use(routes);

app.on("pronto", () => {
  app.listen(3000, () => {
    console.log("Acessar http://localhost:3000");
    console.log("Servidor executando na rota 3000");
  });
});
