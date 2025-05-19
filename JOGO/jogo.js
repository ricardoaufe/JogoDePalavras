
//VARIÁVEIS GLOBAIS
let palavrasValidas = [];
let score = 0;
let selectedWord = "";
let letterInterval; 
 
const canvas = document.getElementById("jogoPalavra");
const ctx = canvas.getContext("2d");
const iniciarJogoButton = document.getElementById("iniciarJogo");
const validarPalavraButton = document.getElementById("validarPalavra");

//ARRAYS, ALFABETO E TEMPO
const letters = [];
const powerUps = [];
const alphabet = "ABBCCDDEFFGGHIJKLLMMNNOPQRRSSTTUVVWXYZ";
const vogais = "AAAEEEIIIOOOUU"; // Aumento de probabilidade
const weightedAlphabet = alphabet + vogais; // Junta tudo

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

  document.getElementById("modoJogo").style.display = "none";  // Oculta o container de dificuldades


  selectedWord = "";  // Reinicia a palavra formada e exibição
  document.getElementById("palavraFormada").textContent = "";
  

  clearInterval(letterInterval); // Limpa e inicia o intervalo de geração de letras
  letterInterval = setInterval(() => {
    generateLetter();
    letters.forEach(function(letter) {
      letter.speed = speed;
    });
  }, intervalo);
  generatePowerUp();
  startTimer();
}

//FUNÇÕES DE GERAÇÃO
function generateLetter() {
  const letter = {
    char: weightedAlphabet[Math.floor(Math.random() * weightedAlphabet.length)],
    x: Math.random() * canvas.width,
    y: 0,
    speed: 1
  };
  letters.push(letter);
  
}   

function generatePowerUp(){
  const tipos = ['clock', 'multiplier']
  // escolhe tipo aleatório
  const tipo = tipos[Math.floor(Math.random() * tipos.length)]
  
  const powerUp = {
    tipo: tipo,
    x: Math.random() * canvas.width,
    y: 0,
    speed: powerUpSpeed,
    width: 40,
    height: 40,
    //duração de efeito multiplier
    duration: tipo === 'multiplier' ? 10000 : 0
    };
    powerUps.push(powerUp)
}

setInterval(generatePowerUp, 10000);

// ATUALIZAÇÃO DO CANVAS (LOOP)
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // limpa toda a área do canvas  

  ctx.fillStyle = "black";
  letters.forEach((letter, index) => {
    letter.y += letter.speed; // o ' y ' + speed faz com que a letra desça (percorra o eixo das ordenadas)
    ctx.font = "30px Arial";
    ctx.fillText(letter.char, letter.x, letter.y); // desenha o caractere (letter.char) randomizado nas posições x e y (letter.x, letter.y)
  });

  powerUps.forEach((powerUp, index) => {
    powerUp.y += powerUp.speed

    if (powerUp.tipo === 'clock'){
      ctx.fillStyle = "transparent";
      ctx.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
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
  const padding = 25; // área extra para aumentar o hitbox


letters.forEach((letter, index) => { //letras
  ctx.font = "50px Arial";
  const metrics = ctx.measureText(letter.char);
  const textWidth = metrics.width;
  const textHeight = 50; 
  const letterTop = letter.y - textHeight;

  const xMin = letter.x - padding;
  const xMax = letter.x + textWidth + padding;
  const yMin = letterTop - padding;
  const yMax = letter.y + padding;
    
  if (offsetX > xMin && offsetX < xMax && offsetY > yMin && offsetY < yMax) {
    selectedWord += letter.char;
    letters.splice(index, 1);
    document.getElementById("palavraFormada").textContent = selectedWord; // atualiza a exibição da palavra formada
  }
});

const powerUpHitbox = 25; // autoexplicatório
powerUps.forEach((powerUp, index) => {

  if(
    offsetX > (powerUp.x - powerUpHitbox) &&
    offsetX < (powerUp.x + powerUp.width + powerUpHitbox) &&
    offsetY > (powerUp.y - powerUpHitbox) &&
    offsetY < (powerUp.y + powerUp.height + powerUpHitbox)
    ) {
    if (powerUp.tipo ==='clock'){
       tempoRestante += 10;
    } else if (powerUp.tipo ==='multiplier'){
      scoreMultiplier = 2;
      document.getElementById("multiplier").style.display = "block";

      setTimeout(() =>{
        scoreMultiplier = 1;
        document.getElementById("multiplier").style.display = "none";
      }, powerUp.duration);
    }
    powerUps.splice(index, 1);
    }
  });
  
  
});

document.addEventListener("keydown", function(event) { //teclas
  if (event.key === "Backspace") {
    // Remove a última letra da palavra formada
    selectedWord = selectedWord.slice(0, -1);
    document.getElementById("palavraFormada").textContent = selectedWord;
  } 
  // Se a tecla pressionada for Enter, valida a palavra
  else if (event.key === "Enter") {
    // Validação: converte a palavra formada para uppercase (pois as letras são maiúsculas)
    if (palavrasValidas.includes(selectedWord.toUpperCase())) {
      score += selectedWord.length * scoreMultiplier;
      document.getElementById("scoreDisplay").textContent = score;
      deleteWord();
    } else {
      alert("Palavra inválida!");
      deleteWord();
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

// Função para limpar a palavra formada
function deleteWord() {
  selectedWord = "";
  document.getElementById("palavraFormada").textContent = "";
}

function endGame(){
  clearInterval(letterInterval); // Para a geração de letras
  alert(`Parabéns!, sua pontuação foi: ${score}`)
  location.reload();
}
