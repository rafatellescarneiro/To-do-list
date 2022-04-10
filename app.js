
const campo = document.getElementById('nome-prod');
const btnAdd = document.getElementById('botao-add');
const clearBtn = document.getElementById('botao-del');
const label = document.getElementById('lista');
const rmvCheck = document.getElementById('del-check');
const checkbox = document.getElementById('checkbox');

let valorInf = [];
let lista = [];

const listaJSON = localStorage.getItem('lista');
const valorJSON = localStorage.getItem('valorpago')

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

const btnCalc = document.querySelector('.okdok');


btnAdd.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);
rmvCheck.addEventListener('click', removeCheck);

btnCalc.addEventListener('click', (e) =>{
  e.preventDefault();

  let preco = document.querySelector('#valorpago');
  let total = document.querySelector('#valueAdd');
  var doc = document.querySelectorAll('.lista1');
  let valor = preco.value;

    if(valor <= 0){
      alert('digite um valor')
    }else if(valor > 0){
      valorInf.forEach(total.value += valor) 
    }
  limpaCampo
 
})

function limpaCampo(){
  document.getElementById('valorpago').value = '0,00';
}

campo.addEventListener('keydown', function (event) {
  
  if (event.key === 'Enter') {
   
    addItem();
  }
});

