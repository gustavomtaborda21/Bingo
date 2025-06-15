const bingoBoard = document.getElementById('bingoBoard');
const numeroInput = document.getElementById('numeroInput');
const ultimaPedra = document.getElementById('ultimaPedra');
const numeroRodada = document.getElementById('numeroRodada');
const tipoRodada = document.getElementById('tipoRodada');
const btnConfig = document.getElementById('btnConfig');
const modalConfig = document.getElementById('modalConfig');
const fecharConfig = document.getElementById('fecharConfig');
const salvarConfig = document.getElementById('salvarConfig');
const inputRodada = document.getElementById('inputRodada');
const inputTipoRodada = document.getElementById('inputTipoRodada');
const inputPremios = document.getElementById('inputPremios');
const listaPremios = document.getElementById('listaPremios');
const fullscreenBola = document.getElementById('fullscreenBola');
const fullscreenNumero = document.getElementById('fullscreenNumero');
const fullscreenLetra = document.getElementById('fullscreenLetra');

const imagens = ['p1.jpg', 'p2.jpg', 'p3.jpg'];
let imgIndex = 0;

setInterval(() => {
  const img = document.querySelector('.slideshow img');
  imgIndex = (imgIndex + 1) % imagens.length;
  img.src = `patrocinadores/${imagens[imgIndex]}`;
}, 3000);

let sorteados = new Set();

function criarTabela() {
  bingoBoard.innerHTML = '';
  for (let i = 1; i <= 75; i++) {
    const cell = document.createElement('div');
    cell.textContent = i;
    cell.id = `num-${i}`;
    cell.addEventListener('click', () => {
      if (cell.classList.contains('sorteado')) {
        cell.classList.remove('sorteado');
        sorteados.delete(i);
      } else {
        cell.classList.add('sorteado');
        sorteados.add(i);
        ultimaPedra.textContent = i;
        mostrarNumeroEmTelaCheia(i);
      }
    });
    bingoBoard.appendChild(cell);
  }
}

criarTabela();

numeroInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const valor = parseInt(numeroInput.value);
    if (valor >= 1 && valor <= 75 && !sorteados.has(valor)) {
      sorteados.add(valor);
      ultimaPedra.textContent = valor;
      document.getElementById(`num-${valor}`).classList.add('sorteado');

      mostrarNumeroEmTelaCheia(valor);
      numeroInput.value = '';
    }
  }
});

function getLetra(num) {
  if (num <= 15) return 'B';
  if (num <= 30) return 'I';
  if (num <= 45) return 'N';
  if (num <= 60) return 'G';
  return 'O';
}

function mostrarNumeroEmTelaCheia(numero) {
  const letra = getLetra(numero);
  fullscreenLetra.textContent = letra;
  fullscreenNumero.textContent = numero;
  fullscreenBola.classList.remove('hidden');
  setTimeout(() => {
    fullscreenBola.classList.add('hidden');
  }, 3000);
}

btnConfig.addEventListener('click', () => {
  modalConfig.classList.remove('hidden');
});

fecharConfig.addEventListener('click', () => {
  modalConfig.classList.add('hidden');
});

salvarConfig.addEventListener('click', () => {
  const rodada = parseInt(inputRodada.value);
  const tipo = inputTipoRodada.value;
  const premios = inputPremios.value.split(',').map(p => p.trim()).filter(p => p);

  numeroRodada.textContent = `${rodada}ª`;
  tipoRodada.textContent = tipo;

  listaPremios.innerHTML = '';
  premios.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p;
    listaPremios.appendChild(li);
  });

  // Aplicar nova cor (se houver campo de cor no modal)
  const novaCor = document.getElementById('inputCorPrincipal');
  if (novaCor) {
    document.documentElement.style.setProperty('--cor-principal', novaCor.value);
  }

  modalConfig.classList.add('hidden');
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registrado!'))
    .catch(err => console.log('Erro no Service Worker:', err));
}
