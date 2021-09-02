const express = require("express");
const router = express.Router();
/* const app = express(); */

//const faker = require("faker");

//let db = require("./db");

//db.criarDB("")

/* Especifica a pasta contendo arquivos estáticos. 
O nome 'public' não precisará ser colocado na rota 
Para serem alcançados os arquivos e pastas que estão dentro dele. 
Por isso na imagem que está na página home.ejs só há o indicativo para 'images' */
router.use(express.static("public"));

//Req é um objeto que recebe dados da requisição HTTP feita (request). Res permite enviar uma resposta ao navegador (Response)
router.get("/", (req, res) => {
  //callback - funcao que trata dado evento
  res.render("pages/home"); // posso omitir a extensão .ejs do home.ejs
});

router.get("/about", (req, res) => {
  //callback - funcao que trata dado evento
  res.render("pages/about");
});

router.get("/cadastro", (req, res) => {
  //a funcao render pode receber um pametro na forma de objeto literal
  //no caso, ela irá receber um objeto com campo chamado users e com valor igual ao vetor users
  res.render("pages/cadastro", { users: users });
});

router.post("/cadastro/remove", (req, res) => {
  console.log("aqui");
  let item = req.body.id; //pega o valor passado através do parâmetro id e atribui a variável item.
  console.log(req.body);
  users.splice(item, 1); //este método permite adicionar ou remover um item do vetor em uma dada posição.
  //res.render('pages/cadastro',{users:users});
  console.log(users);
  res.sendStatus(200); //envia mensagem 200 significando que as modificacoes foram ok
});

router.post("/cadastro/update", (req, res) => {
  //substitui os valores armazenados no item do vetor dado por id, por valores fornecidos como parametro vindos do navegador.
  //recebe dados do cliente na forma de um objeto JSON

  users[req.body.id].name = req.body.name;
  users[req.body.id].email = req.body.email;
  users[req.body.id].address = req.body.address;
  users[req.body.id].age = req.body.age;
  users[req.body.id].height = req.body.height;
  users[req.body.id].vote = req.body.vote;

  console.log("Dados recebidos: ", req.body); //mostra no console do servidor os dados recebidos

  res.sendStatus(200); //envia mensagem 2000 significando que as modificações foram OK
});

router.get("/cadastro/list", (req, res) => {
  //listar de usuarios cadastrado
});

/* Essa linha permite que este código seja exportado como um
módulo e possa ser usado em outras partes da aplicação.  */
module.exports = router;
