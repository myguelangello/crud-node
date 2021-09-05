const express = require("express");
const app = express();
const routes = require("./routes");
const expressLayouts = require("express-ejs-layouts");
const { unlencoded } = require("express");

const port = 3000;
const address = "localhost";

const utils = require("./utils");

const faker = require("faker"); //modulo usado para criar dados fakes aleatorios para testes

let toggleBol = true; //para decidir o vote se é true ou false
// a palavra reservada global cria uma variável ou objeto global para o sistemas. Ele pode ser visto em qualquer parta do código ou dos módulos do projeto. Assim, Users podem ser vistos tanto aqui no index.js quanto em routes.js
/* global.users = [
  {
    name: "Myguel Angello Maciel de Abreu",
    email: "my@email.com",
    address: "Rua PJR, 1103",
    age: 20,
    height: 1.7,
    vote: true,
  },
  {
    name: "Wellington Wagner",
    email: "wwagner@email.com",
    address: "Rua Viewer, 13",
    age: 46,
    height: 1.79,
    vote: true,
  },
  {
    name: "Fulano Cicrano de tal",
    email: "fulano@email.com",
    address: "Rua da liberdade, 100",
    age: 31,
    height: 1.85,
    vote: true,
  },
];
 */

global.users = [];

for (let cont = 0; cont < 20; cont++) {
  users.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    age: utils.getRandomByInterval(15, 50, true),
    height: utils.getRandomByInterval(50, 220, true),
    vote: toggleBol,
  });
  toggleBol = !toggleBol;
}

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
