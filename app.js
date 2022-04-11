
const campo = document.getElementById('nome-prod');
const btnAdd = document.getElementById('botao-add');
const clearBtn = document.getElementById('botao-del');
const label = document.getElementById('lista');
const rmvCheck = document.getElementById('del-check');
const checkbox = document.getElementById('checkbox');
let valorPago = document.getElementById('valueAdd');
let inputValor = document.getElementById('valorpago')
const btnCalc = document.getElementById('okdok');

var valorInf = [];
let lista = [];

const listaJSON = localStorage.getItem('lista');
let valorJSON = localStorage.getItem('valorpago');

if (listaJSON) {
  
  lista = JSON.parse(listaJSON);
  updateScreen();
}

if (valorJSON) {
  
  valorInf = JSON.parse(valorJSON);
  updateScreen();
}

function removeItem(id) {
  
  const novaLista = [];
  lista.forEach(function (item) {
    if (item.id !== id) {
      novaLista.push(item);
    }
  })
  lista = novaLista;
  saveStorage();
  updateScreen();
}

function updateScreen(status, indice){
    label.innerHTML = '';
   

    lista.forEach(function criarItem(item){

    const item1 = document.createElement('label');

    item1.className = 'lista1'
    item1.classList.add('lista')
    item1.id = Math.floor(Math.random() * 2000);
    item1.innerHTML = `
      <input type="checkbox" ${status} data-indice=${indice} id="checkbox">
      <span class="divmon"id="divmon">${item.name}</span>
    `;   

    

    const btn = document.createElement('button');
    btn.innerHTML = 'x';
    btn.onclick = function () {
      removeItem(item.id);
    }

    item1.appendChild(btn);

    document.getElementById('lista').appendChild(item1)

    
    const popup = document.querySelector('.modalId')
    
     document.querySelectorAll('span').forEach(item =>{
       item.addEventListener('click', ()=>{
           popup.style.display = 'block'
    })
    
    })

    popup.onclick = event => {
      const clicked = event.target.classList[0];
        if(clicked === 'popup-close' || clicked === 'modalId'){
          popup.style.display = 'none';    
      } 
    }
  
  })
}

function saveStorage() {
    
    const listaJSON = JSON.stringify(lista);
    localStorage.setItem('lista', listaJSON);
    const valorJSON = JSON.stringify(valorInf);
    localStorage.setItem('valorpago', valorJSON)
}

function addItem() {
    
    if (campo.value) {
      
      lista.push({
        id: Date.now(),
        checked: false,
        name: campo.value
      });
      
      campo.value = '';
      updateScreen();
      saveStorage();
    } else {
      alert('Insira o nome de um item!');
    }
}

function clearList(item){
  var limpar = confirm('Deseja limpar toda lista?')
    if(limpar === true){
          lista.splice(item);
        }
    saveStorage();
    updateScreen();
  } 

function removeCheck(){
    var doc = document.querySelectorAll('.lista1');
    doc.forEach(x => {
     if(x.querySelector('input').checked){
       x.remove()
     }
     saveStorage();
    });
}

function adicionarValor(){

  if (inputValor.value) {
      
    valorInf.push(inputValor.value);
    console.log(valorInf)
    saveStorage();
    somarItens()
  } else {
    alert('Insira o valor do produto!');
  }
  
}

function somarItens(){
  
  let total = document.getElementById('valueAdd').value
  let soma = 0;
  for(var i= 0; i < valorInf.length; i++){
  soma += parseFloat(valorInf[i]);
  }  

  total += soma;
  saveStorage();

  document.querySelector('#valueAdd').innerHTML = `R$${total}`

}

btnCalc.addEventListener('click', adicionarValor);
btnAdd.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);
rmvCheck.addEventListener('click', removeCheck);

function limpaCampo(){
  document.getElementById('valorpago').value = '';
}

campo.addEventListener('keydown', function (event) {
  
  if (event.key === 'Enter') {
   
    addItem();
  }
});

inputValor.addEventListener('keydown', function (event) {
  
  if (event.key === 'Enter') {
    
  }
});


