const express = require("express");
const app = express();
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");

const port = 3000;
const address = "localhost";

/* ativa o uso do EJS e do Express-ejs-layouts */
app.set("view engine", "ejs");
app.use(expressLayouts);

/* Criando usando rotas simples que estão no arquivo routes.js */
app.use("/", routes);

/* Criando um servidor simples com o Node.js e o Express */
const server = app.listen(port, address, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`server listening on address ${host} and port ${port}`);
}); //http://localhost:3030
