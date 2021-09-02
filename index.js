const express = require("express");
const app = express();
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");
const { unlencoded } = require("express");

const port = 3000;
const address = "localhost";

// a palavra reservada global cria uma variável ou objeto global para o sistemas. Ele pode ser visto em qualquer parta do código ou dos módulos do projeto. Assim, Users podem ser vistos tanto aqui no index.js quanto em routes.js
global.users = [
  {
    name: "Myguel Angello Maciel de Abreu",
    address: "Rua PJR, 1103",
    email: "my@email.com",
    age: 20,
    height: 1.7,
    vote: true,
  },
  {
    name: "Wellington Wagner",
    address: "Rua Viewer, 13",
    email: "wwagner@email.com",
    age: 46,
    height: 1.79,
    vote: true,
  },
  {
    name: "Fulano Cicrano de tal",
    address: "Rua da liberdade, 100",
    email: "fulano@email.com",
    age: 31,
    height: 1.85,
    vote: true,
  },
];

/* ativa o uso do EJS e do Express-ejs-layouts */
app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Criando usando rotas simples que estão no arquivo routes.js */
app.use("/", routes);

/* Criando um servidor simples com o Node.js e o Express */
const server = app.listen(port, address, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`server listening on address ${host} and port ${port}`);
}); //http://localhost:3030
