let cadastro;

function update(index, link) {
  //seleciona todas as tags que sejam td
  let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
  let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
  let inputs = document.querySelectorAll(
    `td[data-index-row='${index}'] > input`
  );
  let lenTds = tds.length - 1; //numero de tds de uma linha da tabela
  let linkUpdate = tds[lenTds - 1]; //retorna o conteudo da penultima td, no caso, o link de update
  let linkRemove = tds[lenTds];
  let lenInputs = inputs.length; //pega numero de inputs
  let button = inputs[lenInputs - 1]; //cria uma conexao com o input que é do tipo button

  linkUpdate.className = "hidden";
  linkRemove.className = "hidden";
  tds[lenTds - 2].className = "show"; //mostra butao de envio

  //esconde todos os campos de exibição de dados do cadastro
  for (let cont = 0; cont < spans.length; cont++) {
    if (spans[cont].className == "show") {
      spans[cont].className = "hidden";
    } else {
      spans[cont].className = "show";
    }
  }
  //mostra os campos de preenchimento para o cadastro
  for (let cont = 0; cont < inputs.length; cont++) {
    if (inputs[cont].className == "hidden") {
      inputs[cont].className = "show";
    }
  }
  //escuta se o botao foi clicado
  button.addEventListener("click", () => {
    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url = link;
    let data = {
      id: "",
      name: "",
      email: "",
      address: "",
      age: "",
      height: "",
      vote: "",
    };
    let dataToSend;
    http.open("POST", link, true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader("Content-Type", "application/json"); //constroi um cabecalho http para envio dos dados
    //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
    data.id = index;
    data.name = inputs[0].value;
    data.email = inputs[1].value;
    data.address = inputs[2].value;
    data.age = inputs[3].value;
    data.height = inputs[4].value;
    data.vote = inputs[5].value;
    dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
    http.send(dataToSend); //envia dados para o servidor na forma de JSON
    /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
    http.onload = () => {
      for (let cont = 0; cont < spans.length; cont++) {
        if (spans[cont].className == "hidden") {
          spans[cont].innerHTML = inputs[cont].value;
          spans[cont].className = "show";
        } /* else {
          spans[cont].className = "hidden";
        } */
      }

      //esconde os campos de preenchimento para o cadastro
      for (let cont = 0; cont < inputs.length; cont++) {
        if (inputs[cont].className == "show") {
          inputs[cont].className = "hidden";
        }
      }

      linkUpdate.className = "show";
      linkRemove.className = "show";
      tds[lenTds - 2].className = "hidden";
    };
    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready
    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */
    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio
    http.onreadystatechange = (e) => {
      if (http.readyState === 4 && http.status === 200) {
        //testa se o envio foi bem sucedido
        console.log(http.responseText);
      }
    };
  });
}

function remove(index, _name, link) {
  //(index,link)

  //escuta se o botao foi clicado

  const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
  const url = link;

  http.open("POST", link, true); //abre uma comunicação com o servidor através de uma requisição POST
  http.setRequestHeader("Content-Type", "application/json"); //constroi um cabecalho http para envio dos dados

  //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
  dataToSend = JSON.stringify({ name: _name }); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

  http.send(dataToSend); //envia dados para o servidor na forma de JSON

  /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

  /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready

    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */

  // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

  http.onload = () => {
    //seleciona todas as tags que sejam td
    let tr = document.querySelector(
      `table#list > tbody > tr[data-index-row='${index}']`
    );

    if (http.readyState === 4 && http.status === 200) {
      tr.remove();
      console.log(`Item ${index} removido com sucesso!`);
    } else {
      console.log(
        `Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`
      );
    }
  };
}
//Essa função recebe um objeto com os dados de cadastro de usuário. Valida um a um e caso haja algum erro
//indica o local e retorna false
function validaForm(data) {
  //validação de nome
  if (data._name.value == "") {
    alert(
      "Nenhum nome foi digitado, verifique o campo Nome e tente novamente."
    );
    data._name.focus();
    return false;
  }

  if (data._email == "") {
    alert(
      "Nenhum e-mail foi digitado, verifique o campo E-mail e tente novamente."
    );
    data._email.focus();
    return false;
  }

  if (data._address.value == "") {
    alert(
      "Nenhum endereço foi digitado, verifique o campo Endereço e tente novamente."
    );
    data._address.focus();
    return false;
  }

  if (!Number.isInteger(Number(data._age.value))) {
    alert("Esta idade não é válida, verifique se o valor é inteiro.");
    data._age.focus();
    return false;
  }

  if (data._age.value == "") {
    alert(
      "Nenhuma idade foi digitada, verifique o campo Idade e tente novamente."
    );
    data._age.focus();
    return false;
  }
  if (Number(data._age.value) < 0 || Number(data._age.value) > 100) {
    alert(
      "Valor inválido para idade, verifique o campo Idade e tente novamente."
    );
    data._age.focus();
    return false;
  }

  if (data._height.value == "") {
    alert(
      "Nenhuma altura foi digitada, verifique o campo Altura e tente novamente."
    );
    data._height.focus();
    return false;
  }

  if (Number(data._height.value) < 50 || Number(data._height.value) > 220) {
    alert(
      "Valor inválido para altura, verifique se o campo Altura está em centímetros e tente novamente."
    );
    data._height.focus();
    return false;
  }

  return true;
}

function add(inputs, link) {
  if (validaForm(inputs)) {
    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url = link;
    let data = {
      id: "",
      name: "",
      email: "",
      address: "",
      age: "",
      height: "",
      vote: "",
    };
    let dataToSend;
    http.open("POST", link, true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader("Content-Type", "application/json"); //constroi um cabecalho http para envio dos dados
    //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text

    /* data.id = index; */
    data.name = inputs._name.value;
    data.email = inputs._email.value;
    data.address = inputs._address.value;
    data.age = inputs._height.value;
    data.height = inputs._age.value;
    data.vote = inputs._vote.value;

    dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
    http.send(dataToSend); //envia dados para o servidor na forma de JSON
    /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

    http.onload = () => {
      inputs._name.value = "";
      inputs._email.value = "";
      inputs._address.value = "";
      inputs._height.value = "";
      inputs._age.value = "";
      inputs._vote.value = "";
      if (http.readyState === 4 && http.status === 200) {
        alert("Usuário cadastrado com sucesso!");
        //chamada de função de listagem de usuários na segunda tabela
        /* listar("/cadastro/list"); */
      } else {
        console.log(
          `Erro durante a tentativa de adição do usuário: ${_name}! Código do Erro: ${http.status}`
        );
      }
    };
  }
}
