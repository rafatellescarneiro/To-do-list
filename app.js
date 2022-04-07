
const campo = document.getElementById('nome-prod');
const btnAdd = document.getElementById('botao-add');
const label = document.getElementById('lista');


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
  updateScreen();
}


function updateScreen(status, indice){
    label.innerHTML = '';

    lista.forEach(function(item){
    const item1 = document.createElement('label');
    item1.classList.add('lista')
    item1.id = `i${item.id}`;
    item1.innerHTML = `
      <input type="checkbox" ${status} data-indice=${indice}>
      <div class="divmon">${item.name}</div>
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
        name: campo.value
      });
      
      campo.value = '';
      updateScreen();
      saveStorage();
    } else {
      alert('Insira o nome de um item!');
    }
  }


btnAdd.addEventListener('click', addItem);


campo.addEventListener('keydown', function (event) {
  
  if (event.key === 'Enter') {
   
    addItem();
  }
});