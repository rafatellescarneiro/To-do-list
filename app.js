const adicionar = document.getElementById("botao-add");
const limpar = document.getElementById("botao-del");
const remover = document.getElementById("del-check");
const entrada = document.getElementById("nome-prod");
const valor = document.getElementById("valor-pago");
const confirma = document.getElementById("ok-dok"); 
let total = document.getElementById("add-valor");
let saida = document.getElementById("main-box");
let listados = [];
let valores = [];

const listaJSON = localStorage.getItem('listados')
const valorJSON = localStorage.getItem('valores')

if(listaJSON){
  listados = JSON.parse(listaJSON)
  atualizarTela()
}
if(valorJSON){
  valores = JSON.parse(valorJSON)
  atualizarTela()
}

function salvar(){
  const listaJSON = JSON.stringify(listados);
  localStorage.setItem('listados', listaJSON);

  const valorJSON = JSON.stringify(valores);
  localStorage.setItem('valores', valorJSON)
}

function totais(){
  let soma = 0
  for(let i = 0; i< valores.length; i++){
    soma += parseFloat(valores[i])
    document.getElementById("add-valor").placeholder = soma
  }
}

function atualizarTela(){
  let saida = document.getElementById('main-box') 
  saida.innerHTML = ''

  listados.forEach(function (element){

    const item = document.createElement('label');
    const box = document.createElement('input');
    const span = document.createElement('span');

    box.id = "checkbox";
    box.type = "checkbox";
    box.checked = false;

    item.id = element.id
    item.classList.add('listados')

    for(let i = 0; i < valores.length; i++){
      var valueProduct = valores[i];
      span.id = item.id;
    span.innerHTML = `Item: ${element.nome} | Valor: ${valueProduct}`
    }

    saida.appendChild(item)
    item.appendChild(span)
    span.appendChild(box)

    totais()

    const popup = document.querySelector(".modalId");

    document.querySelectorAll("span").forEach(item =>{
      item.addEventListener('click', ()=>{
          popup.style.display = "block"
      });
    });

    popup.onclick = event =>{
      const clicked = event.target.classList[0];
        if(clicked === 'popup-close' || clicked === 'modalId' || clicked === 'ok-dok'){
          if(!valor.value && clicked === 'ok-dok'){
            popup.style.display = 'none';
          }
        popup.style.display = 'none';  
      } 
    }
  });
}


function addItem(){
  if((entrada.value).length >= 3){

    listados.push({
      id: listados.length,
      checked: false,
      nome: entrada.value
    })
    entrada.value = ''
    salvar();
    atualizarTela();
  }else{
    alert('Insira um item com 3 ou mais caracteres');
    entrada.value = ''
  }
}

function limparLista(item){
  var listaLimpa = confirm('Deseja limpar toda lista?')
  if(listaLimpa === true){
        listados.splice(item);
        valores.splice(item)
      }
  salvar();
  atualizarTela();
}


function removerSelecionado(event) {
  let ckList = document.querySelectorAll("input[type=checkbox]:checked");
  ckList.forEach(function(el) {
    el.parentElement.parentElement.remove();
    let position = listados.indexOf(event.target.value);
    let valuePosition = valores.indexOf(event.target.value)
    listados.splice(position, 1);
    valores.splice(valuePosition, 1)
    return
  });
  salvar();
  atualizarTela();
}

function precificar(){
  if(valor.value){
    valores.push(valor.value)
    valor.value = null  
    salvar();
    atualizarTela();
  }else{
    alert('Insira um valor maior que zero');
    valor.value = null
  }
}



adicionar.addEventListener('click', addItem)
limpar.addEventListener('click', limparLista)
remover.addEventListener('click', removerSelecionado)
confirma.addEventListener('click', precificar)

entrada.addEventListener('keydown', function (event) {
  
  if (event.key === 'Enter') {
   
    addItem();
  }
});