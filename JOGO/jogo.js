
//VARIÁVEIS GLOBAIS
let palavrasValidas = [];
let score = 0;
let selectedWord = "";
let letterInterval; 
 
const canvas = document.getElementById("jogoPalavra");
const ctx = canvas.getContext("2d");
const iniciarJogoBotao = document.getElementById("iniciarJogo");
const validarPalavraBotao = document.getElementById("validarPalavra");

//ARRAYS, ALFABETO E TEMPO
const letters = [];
const powerUps = [];
const alfabeto = "ABBCCDDEFFGGHIJKLLMMNNOPQRRSSTTUVVWXYZ";
const vogais = "AAAEEEIIIOOOUU"; // aumento de probabilidade
const weightedAlphabet = alfabeto + vogais; // junta tudo 

let tempoRestante = 60;
let timerIntervalo;

let scoreMultiplier = 1; 
let powerUpSpeed = 1; 

//LÓGICA PARA INÍCIO DO JOGO
function startGame(dificuldade) {
  let speed, intervalo;
  if(dificuldade == 'facil'){
    speed = 1;
    intervalo = 550;
    powerUpSpeed = 2;

  } else if (dificuldade == 'medio'){
    speed = 2;
    intervalo = 550;
    powerUpSpeed = 3;

  } else if (dificuldade == 'dificil'){
    speed = 3;
    intervalo = 550;
    powerUpSpeed = 4;
    
  }
  
  // Exibe elementos do jogo
  canvas.style.display = "block";
  document.getElementById("palavraFormada").style.display = "block";
  document.getElementById('scoreDisplay').style.display = "block";
  document.getElementById('pontuacao').style.display = "block";
  document.getElementById('palavraFormada-text').style.display = "block";
  document.getElementById('timerDisplay').style.display = "block";

  document.getElementById("modoJogo").style.display = "none";  // cculta o container de dificuldades


  selectedWord = "";  // reinicia a palavra formada e exibição
  document.getElementById("palavraFormada").textContent = "";
  

  clearInterval(letterInterval); // limpa e inicia o intervalo de geração de letras
  letterInterval = setInterval(() => {
    generateLetter();
    letters.forEach(function(letter) {
      letter.speed = speed;
    });
  }, intervalo);
    setTimeout(() => {
    generatePowerUp();
    setInterval(generatePowerUp, 10000); // gera a cada 10s
}, 3000); // delay inicial de 3 segundos
  startTimer()
}

//FUNÇÕES DE GERAÇÃO
function generateLetter() {
  const letter = {
    char: weightedAlphabet[Math.floor(Math.random() * weightedAlphabet.length)],
    x: Math.random() * canvas.width,
    y: 0,
    speed: 1
  };
  letters.push(letter); // inclui uma nova letra na lógica de animação
  
}   

function generatePowerUp(){
  const tipos = ['clock', 'multiplier']
  const tipo = tipos[Math.floor(Math.random() * tipos.length)] // escolhe tipo aleatório
  
  const powerUp = {
    tipo: tipo,
    x: Math.random() * canvas.width,
    y: 0,
    speed: powerUpSpeed,
    width: 50,
    height: 50,
    duration: tipo === 'multiplier' ? 10000 : 0 //duração do multiplicador
    };
    powerUps.push(powerUp);
}

// ATUALIZAÇÃO DO CANVAS (LOOP)
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // limpa toda a área do canvas  

  ctx.fillStyle = "black";
  letters.forEach((letter, index) => {
    letter.y += letter.speed; // o ' y ' + speed faz com que a letra desça
    ctx.font = "30px Arial";
    ctx.fillText(letter.char, letter.x, letter.y); // desenha o caractere (letter.char) randomizado nas posições x e y (letter.x, letter.y)
  });

  powerUps.forEach((powerUp, index) => {
    
    powerUp.y += powerUp.speed

    if (powerUp.tipo === 'clock'){
      ctx.fillStyle = "transparent";
      ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
      ctx.fillStyle = "black";
      ctx.fillText("⏰", powerUp.x + 5, powerUp.y + 28);
    } else if (powerUp.tipo === 'multiplier') {
      ctx.fillStyle = "transparent";
      ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText("2X", powerUp.x + 5, powerUp.y + 28);
    }
    if (powerUp.y > canvas.height) {
      powerUps.splice(index, 1);
    }
  });

  requestAnimationFrame(update); //chama a função update() novamente, criando um loop infinito para manter a animação atualizada
}

update();

// EVENTOS (MOUSE E TECLADO)
canvas.addEventListener("click", (event) => { //mouse
  const { offsetX, offsetY } = event;
  
  function checarColisao(objects, hitbox, callback) { //calback é a função a ser executada quando houver colisão
    objects.forEach((obj, index) => { //obj => posição inicial do objeto
      const xMin = obj.x - hitbox; // subtrai para poder mover a posição um pouco para a esquerda
      const xMax = obj.x + 50 + hitbox;
      const yMin = obj.y - hitbox;
      const yMax = obj.y + 50 + hitbox;

      if (offsetX > xMin && offsetX < xMax && offsetY > yMin && offsetY < yMax) {
        callback(obj, index);
      }
    });
  }

  checarColisao(letters, 20, (letter, index) => {
    selectedWord += letter.char;
    letters.splice(index, 1);
    document.getElementById("palavraFormada").textContent = selectedWord;
  });

  checarColisao(powerUps, 20, (powerUp, index) => {
    if (powerUp.tipo === 'clock') {
      tempoRestante += 10;
    } else if (powerUp.tipo === 'multiplier') {
      scoreMultiplier = 2;
      document.getElementById("multiplier").style.display = "block";
      
      setTimeout(() => {
        scoreMultiplier = 1;
        document.getElementById("multiplier").style.display = "none";
      }, powerUp.duration);
    }
    powerUps.splice(index, 1); // sumir após clicar no powerUp
  });
});


document.addEventListener("keydown", function(event) { 
  if (event.key === "Backspace") {
    // Remover APENAS o último caractere da palavra formada
    selectedWord = selectedWord.slice(0, -1);
    document.getElementById("palavraFormada").textContent = selectedWord;
  } 
  else if (event.key === "Enter") { // Se Enter for pressionado, valida a palavra
    if (palavrasValidas.includes(selectedWord.toUpperCase())) { 
      score += selectedWord.length * scoreMultiplier;
      document.getElementById("scoreDisplay").textContent = score;
      deleteWord(); // Só apaga tudo se Enter for pressionado
    } else {
      alert("Palavra inválida!");
      deleteWord(); // Mantém apenas para Enter
    }
  }
});


function startTimer(){
  tempoRestante = 60;
  document.getElementById('timerDisplay').textContent = `Tempo restante: ${tempoRestante} seg`;

  timerIntervalo = setInterval(() => {
    tempoRestante--;
    document.getElementById('timerDisplay').textContent = `Tempo restante: ${tempoRestante} seg`;
 
  if (tempoRestante <= 0){
    clearInterval(timerIntervalo);
    endGame()
    }
  },1000)
} 

// função para limpar a palavra formada
function deleteWord() {
  selectedWord = "";
  document.getElementById("palavraFormada").textContent = "";
}

function endGame(){
  clearInterval(letterInterval); // para a geração de letras
  alert(`Parabéns!, sua pontuação foi: ${score}`)
  location.reload();
}
