var firebaseConfig = {
     apiKey: "AIzaSyAjcbJQVeyRSrjTSfpLnB1vCo1tDckYHPw",
     authDomain: "home-72427.firebaseapp.com",
     projectId: "home-72427",
     storageBucket: "home-72427.appspot.com",
     messagingSenderId: "814479484913",
     appId: "1:814479484913:web:f33042d4937f4248d54650"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar serviço de autenticação
var auth = firebase.auth();

// Inicializar serviço do Banco de Dados
var db = firebase.firestore();

//Pegar os elementos inout do HTML
var inputEmail = document.getElementById("email");
var inputPass = document.getElementById("pass");

//Pegar os elmentos do input do cadastro
var nomeCadastro = document.getElementById("nomeCadastro");
var emailCadastro = document.getElementById("emailCadastro");
var passCadastro = document.getElementById("passCadastro");

var id;

//Função fazer login
function login() {
     let email = inputEmail.value;
     let pass = inputPass.value;

     auth.signInWithEmailAndPassword(email, pass)
          .then(() => {
               console.log("Loged", auth.currentUser);
               id = auth.currentUser.uid;
               verificaUsuario();

          })
          .catch(() => {
               alert("Usuário ou senha incorreto");

          })
}

// Verificar se o usuario que está logando tem um documento no BD
function verificaUsuario() {
     db.collection("usuarios").get().then(snapshot => {
          snapshot.forEach(doc => {
               if (id == doc.id) {
                    console.log("Usuário no banco");
                    window.location.replace("tarefa.html");
               }

          })

     }).catch(() => {
          alert("usuario inexistente no banco, contate o administrador");
     })

}

//Mostrar tela de cadastro
function mostrarCadastro() {
     let div = document.getElementsByClassName("telaCadastro")[0];
     div.classList.add("show");

     let fechar = document.querySelector(".telaCadastro img");

     fechar.addEventListener("click", () => {
          div.classList.remove("show");
     })
}

// Cadastrar usuario no sistema
function cadastrar() {

     let nameCad = nomeCadastro.value;
     let emailCad = emailCadastro.value
     let passCad = passCadastro.value;
     console.log(emailCad);

     auth.createUserWithEmailAndPassword(emailCad, passCad)
          .then(() => {

               // Criar coleção no banco de dados com a uid do usuario cadastrado
               id = auth.currentUser.uid;
               db.collection("usuarios").doc(id).set({
                    nome: nameCad,
                    tarefas: [],
               })
                    .then(() => {
                         console.log("Usuario inserido BD");
                         alert("Usuario cadastrado com sucesso")
                         window.location.replace("index.html");
                    })
                    .catch((err) => {
                         console.log(err, "Usuario não inserido BD");
                    })
          })
          .catch(err => {
               alert(err.message)
          })
}

//Função para fazer login usando a tecla enter do teclado
function presEnter() {
     if (window.event.keyCode === 13) {

          let button = document.querySelector("button");
          button.click();

     }
}


