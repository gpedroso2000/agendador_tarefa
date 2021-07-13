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

//Inicializar banco
var db = firebase.firestore();

//Inicializar serviço de autenticação
var auth = firebase.auth();

//Variaveis
var name = "";
// var arrayTarefas = [];

// Documentos Html
var button = document.getElementById("btn");
var inputTarefa = document.getElementById("descricao");
var div = document.querySelector("#divTarefa");
var ola = document.getElementById("ola");


button.addEventListener("click", inserirTarefa);

carregarTarefa();

//Deslogar usuário
function logout() {
    auth.signOut()
        .then(() => {
            alert("Você foi deslogado");
            window.location.replace("index.html");

        })
        .catch(err => {
            console.log(err);
        })
}



//Carregar tarefas do banco e colocar na pagina ao entrar com usuario
function carregarTarefa() {

    //listar todos os documentos do banco
    db.collection("usuarios").get().then(snapshot => {
            snapshot.forEach(doc => {
                let id = auth.currentUser.uid;

                //Verificar se o id do usuario é igual ao documento retornado
                if (id == doc.id) {
                    let array = doc.data();
                    let tarefas = array.tarefas;

                    //Inserir boas vindas
                    let name = array.nome;
                    ola.innerHTML = `<p> Bem Vindo ${name}</p>`;

                    //Percore o array de tarefas do banco e coloca na variavel arrayTarefas
                    for (let i = 0; i < tarefas.length; i++) {
                        // arrayTarefas.push(tarefas[i]);

                        //Mostra a tarefa na pagina
                        div.innerHTML += `<div id="tarefa"> <span> ${tarefas[i]} </span> 
                    <button class="remove" onclick="remover(this)"> Remover </button> </div>`;

                    }
                }
            })
        })
        .catch(err => {
            console.log(err);

        })
}


//Inserir tarefas no banco e na pagina
function inserirTarefa() {
    let tarefa = inputTarefa.value;
    id = auth.currentUser.uid;

    //Inserir tarefa no banco
    db.collection("usuarios").doc(id).update({
            tarefas: firebase.firestore.FieldValue.arrayUnion(tarefa),

        })
        .then(() => {
            div.innerHTML += `<div id="tarefa"> <span> ${tarefa} </span> 
            <button class="remove" onclick="remover(this)"> Remover </button> </div>`;
            console.log("Tarefa Inserida");

        })
        .catch(err => {
            console.log(err);

        })
    inputTarefa.value = "";
}


//Remover tarefa 
function remover(e) {
    id = auth.currentUser.uid;

    //Pegar o elemento clicado
    var element = e.parentElement.children[0].innerText;
    console.log(element);

    //Pegar o pai do elemento clicado
    var pai = e.parentElement;

    //Remover tarefa do banco
    db.collection("usuarios").doc(id).update({
            tarefas: firebase.firestore.FieldValue.arrayRemove(element),
        })
        .then(() => {
            //Remover o elemento clicado da pagina
            pai.remove();

            console.log("Tarefa Deletada");

        })
        .catch(err => {
            console.log(err);

        })
}