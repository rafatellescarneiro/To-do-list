const adicionar = document.getElementById("botao-add");
const limpar = document.getElementById("botao-del");
const remover = document.getElementById("del-check");
const entrada = document.getElementById("nome-prod");
const confirma = document.getElementById("ok-dok");
let valor = document.getElementById("valor-pago");
let saida = document.getElementById("main-box");

let valores = []
let listados = [];

function addItem(){
  if(entrada.value){
    listados.push({
      id: listados.length,
      checked: false,
      name: entrada.value
    })
    entrada.value = ''
    salvar();
    atualizarTela()
  }
}

const listaJSON = localStorage.getItem('listados')
const valoresJSON = localStorage.getItem('valores')

if(listaJSON){
  listados = JSON.parse(listaJSON)
  addItem()
  atualizarTela()
}

if(valoresJSON){
  valores = JSON.parse(valoresJSON)
  addItem()
  atualizarTela()
}

function salvar(){
  const listaJSON = JSON.stringify(listados);
  localStorage.setItem('listados', listaJSON);
  const valoresJSON = JSON.stringify(valores);
  localStorage.setItem('valores', valoresJSON);
}

function totalSoma(){
  let soma = 0
  for(let i = 0; i< valores.length; i++){
    soma += parseFloat(valores[i])
    document.getElementById("add-valor").placeholder = soma
  }
  salvar();
} 

function atualizarTela(){

  let saida = document.getElementById('tabela-li') 

  saida.innerText = ''

  for(let i = 0; i< listados.length; i++){
    
    const item = document.createElement('label');
    const box = document.createElement('input');
    const span = document.createElement('span');
    const val = document.createElement('p');

    box.id = "checkbox";
    box.type = "checkbox";
    box.checked = false;

    item.id = listados[i].id
    item.classList.add('listados')

    span.id = item.id;
    span.innerText = `Item: ${listados[i].name} `
    
    
    confirma.addEventListener('click', function(){
      if(valor.value){
        valores.push(valor.value)
        val.innerHTML = ` | Valor: ${valores.value}` 
        listados[i].valor = valores.valor
        valor.value = ''
        salvar();
        addItem()
        atualizarTela()
          }
          console.log(listados[i].valor)
      })

    saida.appendChild(item)
    item.appendChild(span)
    span.appendChild(val)
    item.appendChild(box)
    
    totalSoma();

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
  };
    
}

function limparLista(item){
  var listaLimpa = confirm('Deseja limpar toda lista?')
  if(listaLimpa === true){
        listados.splice(item);
        valores.splice(item);
        document.getElementById('add-valor').placeholder = 0
      } 
  salvar();
  atualizarTela();
  addItem()
}

function removerSelecionado(event) {
  let ckList = document.querySelectorAll("input[type=checkbox]:checked");

  ckList.forEach(function(el) {
    el.parentElement.parentElement.remove();
    let position = listados.indexOf(event.target.value);
    let valpos = valores.indexOf(event.target.value);
    listados.splice(position, 1);
    valores.splice(valpos, 1)
    return
  });
  salvar();
  atualizarTela();
}

adicionar.addEventListener('click', addItem)
limpar.addEventListener('click', limparLista)
remover.addEventListener('click', removerSelecionado)

entrada.addEventListener('keydown', function (event) {
  
  if (event.key === 'Enter') {
   
    addItem();
  }
})