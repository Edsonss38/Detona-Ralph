// Estado geral do jogo
const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    enemy: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
  },

  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },

  actions: {
    timerId: null,
    countDownTimerId: null,
  },
};

// Função que decrementa o tempo do jogo
function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert('Game Over! O seu resultado foi: ' + state.values.result);
  }
}

function playSound(audioName) {
  let audio = new Audio(`../assets/audios/${audioName}.mp3`);
  audio.volume = 0.2;
  audio.play();
}

// Função que escolhe aleatoriamente um quadrado para ser o inimigo
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
}

// Função que adiciona o evento de clique em cada quadrado
function addListenerHitbox() {
  state.view.squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound('hit');
      }
    });
  });
}

function startGame() {
  // Resetar valores
  state.values.currentTime = 60;
  state.values.result = 0;
  state.view.score.textContent = 0;
  state.view.timeLeft.textContent = state.values.currentTime;

  // Limpar intervalos antigos (se existirem)
  clearInterval(state.actions.timerId);
  clearInterval(state.actions.countDownTimerId);

  // Iniciar de novo
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

document.querySelector('#start-btn').addEventListener('click', startGame);

// Inicializa o jogo adicionando os listeners
function init() {
  addListenerHitbox();
}

// Chama a função de inicialização
init();
