let titulo =  document.getElementById("input-titulo");
let data =  document.getElementById("data");
let descricao =  document.getElementById("descricao");
let lista =  document.getElementById("lista");

let btnSalvar = document.getElementById("btn-salvar");



btnSalvar.addEventListener("click", salvarTarefa);


function  salvarTarefa() {

    
    let tarefa = {
        id: `${Date.now()}`,
        titulo: titulo.value.trim(),
        descricao: descricao.value.trim(),
        data: data.value.trim(),
        status: "null",

    }

    let error = false;

   
    if(tarefa.titulo == ""){
        titulo.classList.add('error');
        error = true;
    } 

    if(tarefa.descricao == "") {
        descricao.classList.add("error");
        error = true;
    };

    if(tarefa.data == ""){
        data.classList.add("error");
        error = true;
    };

    if(error){
        alert("Todos os Campos devem ser preenchidos corretamente")
        return;
    } 

    
     

    localStorage.setItem(`${tarefa.id}`, JSON.stringify(tarefa));
    titulo.value = '';
    descricao.value = '';
    data.value = '';

    data.classList.remove("error");
    titulo.classList.remove("error");
    descricao.classList.remove("error");

     mostrarTarefas();
    
}

function update(tf){
    
   let tarefa = JSON.parse(localStorage.getItem(tf));
        tarefa.status =  (tarefa.status == "null") ? "check": "null";
    
        localStorage.setItem(tarefa.id,JSON.stringify(tarefa));
    
}

 function remover(id){
     localStorage.removeItem(id);
    mostrarTarefas();
}

function formatarData(d){

const data = new Date(d);
const dia = data.getUTCDate().toString().padStart(2, '0');
const mes = (data.getUTCMonth()+1).toString().padStart(2,'0');
const ano = data.getFullYear().toString().padStart(2,'0');

const diasDaSemana = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado'
  ];


return `${diasDaSemana[(parseInt(data.getUTCDay()))]} ${dia} / ${mes} / ${ano} as ${data.getHours()}:${data.getMinutes()}`;
}


function mostrarTarefas(){

    lista.innerHTML = "";
     getAllListas();

    
    if(dados.length < 1){
        lista.innerHTML =`<center><h1>A sua lista de Tarefas está vazia</h1></center>`;
        requestAnimationFrame;
    }


let check = "";
    for(let tarefa in dados){
        if(dados[tarefa].status != "null") check = "checked";
        lista.innerHTML += `
        <div class="tarefa">
            <input type="checkbox" id="${dados[tarefa].id}"  ${check} onClick="update(${dados[tarefa].id})" >
            <label for="${dados[tarefa].id}"></label>
            <div class="tarefa-dados">

            <h3>${formatarData(dados[tarefa].data)}</h3>
                <h2>${dados[tarefa].titulo}</h2>
                <p>${dados[tarefa].descricao}</p>
                <p></p>
            </div>
            <i class="fa fa-trash" aria-hidden="true" onClick="remover(${dados[tarefa].id})"></i>
            
            
        </div>
        `;
        check = "";
    }
    
} 

function getAllListas(){
    dados = [];
    const listas = Object.keys(localStorage);
    
    for(let item in listas){
        console.log(listas[item]);
      dados.push(JSON.parse(localStorage.getItem(listas[item])));
    }

     dados.sort((a,b)=>{
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);

        return dataA - dataB;

    });

    
}


mostrarTarefas();
