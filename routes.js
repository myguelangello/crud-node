const express = require("express");
const router = express.Router();
const app = express();

//const faker = require("faker");

//let db = require("./db");

//db.criarDB("")

/* Especifica a pasta contendo arquivos estáticos. 
O nome 'public' não precisará ser colocado na rota 
Para serem alcançados os arquivos e pastas que estão dentro dele. 
Por isso na imagem que está na página home.ejs só há o indicativo para 'images' */
router.use(express.static("public"));

router.get("/", (req, res) => {
  /* callback - funcao que trata dado evento  */
  res.render("pages/home"); // posso omitir a extensão .ejs do home.ejs
});

router.get("/about", (req, res) => {
  res.render("pages/about");
});

router.get("/cadastro", (req, res) => {
  let users = [
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
  res.render("pages/cadastro", {
    users,
  }); /* a função render para receber um objeto literal como parâmetro */
});

router.get("/cadastro/remove/:id", (req, res) => {
  res.send("Remoção realizada com sucesso!");
  //remover the user
});

router.get("/cadastro/update/:id", (req, res) => {
  res.send("Atualização realizada com sucesso!");
});

router.get("/cadastro/list", (req, res) => {
  //listar de usuarios cadastrado
});

/* Essa linha permite que este código seja exportado como um
módulo e possa ser usado em outras partes da aplicação.  */
module.exports = router;
