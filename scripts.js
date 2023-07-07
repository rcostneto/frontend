/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/usuarios';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.usuarios.forEach(item => insertList(item.nome, item.sobrenome, item.cpf, item.data_nascimento, item.email, item.login, item.senha="******", item.senha_novamente="******"))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um usuario na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputUser, inputSurname, inputCPF, inputBirth_date, inputEmail, inputLogin, inputPassword, inputPassword_again) => {
  const formData = new FormData();
  formData.append('nome', inputUser);
  formData.append('sobrenome', inputSurname);
  formData.append('cpf', inputCPF);
  formData.append('data_nascimento', inputBirth_date);
  formData.append('email', inputEmail);
  formData.append('login', inputLogin);
  formData.append('senha', inputPassword);
  formData.append('senha_novamente', inputPassword_again);

  let url = 'http://127.0.0.1:5000/usuario';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um usuario da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/usuario?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para validar CPF
  --------------------------------------------------------------------------------------
*/

/*
function TestaCPF(strCPF) {
  var Soma;
  var Resto;
  Soma = 0;
if (strCPF == "00000000000") return false;

for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}
var strCPF = "12345678909";
alert(TestaCPF(strCPF));
*/

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo usuario com nome, sobrenome, cpf, email, login, senha, senha_novamente 
  --------------------------------------------------------------------------------------
*/


const newItem = () => {
  let inputUser = document.getElementById("newInput").value;
  let inputSurname = document.getElementById("newSurname").value;
  let inputcpf = document.getElementById("newCPF").value;
  let inputBirth_date = document.getElementById("newBirth_date").value;
  let inputEmail = document.getElementById("newEmail").value;
  let inputLogin = document.getElementById("newLogin").value;
  let inputPassword = document.getElementById("newPassword").value;
  let inputPassword_again = document.getElementById("newPassword_again").value;


  if (inputUser === '') {
    alert("Escreva o nome do usuario!");
  } else if (inputSurname === '') {
    alert("Escreva o sobrenome do usuario!");
  } else if (inputcpf === '') { 
    alert("Digite o cpf!");
  } else if (inputBirth_date === '') {
    alert("Insira a data de nascimento!");
  } else if (inputEmail === '') {
    alert("Digite o email!");
  } else if (inputLogin === '') {
    alert("Digite o login!");
  } else if (inputPassword === '') {
    alert("Digite a senha!");
  } else if (inputPassword_again === '') {
    alert("Digite a senha novamente!");
  } else {
    insertList(inputUser, inputSurname, inputcpf, inputBirth_date, inputEmail, inputLogin, inputPassword, inputPassword_again)
    postItem(inputUser, inputSurname, inputcpf, inputBirth_date, inputEmail, inputLogin, inputPassword, inputPassword_again)
    alert("Usuario adicionado!")
  } 
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir usuarios na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nome, sobrenome, cpf, data_nascimento, email, login, senha, senha_novamente) => {
  var item = [nome, sobrenome, cpf, data_nascimento, email, login, senha, senha_novamente]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newInput").value = "";
  document.getElementById("newSurname").value = "";
  document.getElementById("newCPF").value = "";
  document.getElementById("newBirth_date").value = "";
  document.getElementById("newEmail").value = "";
  document.getElementById("newLogin").value = "";
  document.getElementById("newPassword").value = "";
  document.getElementById("newPassword_again").value = "";

  removeElement()
}