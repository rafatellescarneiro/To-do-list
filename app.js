
const campo = document.getElementById('nome-prod');
const btnAdd = document.getElementById('botao-add');
const clearBtn = document.getElementById('botao-del');
const label = document.getElementById('lista');
const rmvCheck = document.getElementById('del-check')
const checkbox = document.getElementById('checkbox');

let lista = [];

const listaJSON = localStorage.getItem('lista');

if (listaJSON) {
  
  
  lista = JSON.parse(listaJSON);
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
   

    lista.forEach(function(item){
    const item1 = document.createElement('label');
    item1.setAttribute('class', `tod-item ${item.id}`);
    item1.classList.add('lista')
    item1.id = `i${item.id}`;
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
    });   

    
}

function saveStorage() {
    
    const listaJSON = JSON.stringify(lista);
    localStorage.setItem('lista', listaJSON);
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
    doc.forEach(item => {
     if(item.querySelector('input').checked){
       item.remove()
     }
    })
    
    saveStorage();

}



 

btnAdd.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearList);
rmvCheck.addEventListener('click', removeCheck)
  

campo.addEventListener('keydown', function (event) {
  
  if (event.key === 'Enter') {
   
    addItem();
  }
});