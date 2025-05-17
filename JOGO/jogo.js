// Declaração de variáveis globais
let palavrasValidas = [];
let score = 0;
let selectedWord = "";
let letterInterval; 
 // Para armazenar o intervalo de geração de letras

// Obtendo referências dos elementos do DOM
const canvas = document.getElementById("jogoPalavra");
const ctx = canvas.getContext("2d");
const iniciarJogoButton = document.getElementById("iniciarJogo");
const validarPalavraButton = document.getElementById("validarPalavra");

// Ajuste do canvas
canvas.width = window.innerWidth * 0.5; 
canvas.height = window.innerHeight * 0.5;

// Array e string para letras
const letters = [];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const vogais = "AAEEIIOOUU"; // Repetimos as vogais para aumentar sua probabilidade
const weightedAlphabet = alphabet + vogais; // Junta tudo

let tempoRestante = 60;
let timerIntervalo;

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

function endGame(){
  clearInterval(letterInterval); // Para a geração de letras
  alert(`Parabéns, sua pontuação foi: ${score}`)
  location.reload();
}

// Lê o arquivo palavras.txt usando FileReader (o usuário precisa selecionar o arquivo)
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(event) {
    palavrasValidas = event.target.result
      .split("\n")
      .map(line => line.trim().toUpperCase())  // Converte todas as linhas para uppercase
      .filter(line => line !== "");             // Remove linhas vazias
    console.log("Palavras válidas carregadas:", palavrasValidas);
  };
  reader.readAsText(file);
});

// Função para gerar letras aleatórias
function generateLetter() {
  const letter = {
    char: weightedAlphabet[Math.floor(Math.random() * weightedAlphabet.length)],
    x: Math.random() * canvas.width,
    y: 0,
    speed: 1
  };
  letters.push(letter);

  // Remove a letra se ela não for clicada após 10 segundos
  setTimeout(() => {
    const idx = letters.indexOf(letter);
    if (idx !== -1) {
      letters.splice(idx, 1);
    }
  }, 5000); // 5 segundos
}   

// Se desejar que letras sejam geradas antes de iniciar o jogo, comente ou remova a seguinte linha:
// letterInterval = setInterval(generateLetter, 2500);

// Função de atualização do canvas (animação)
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  letters.forEach((letter, index) => {
    letter.y += letter.speed;
    ctx.font = "30px Arial";
    ctx.fillText(letter.char, letter.x, letter.y);
    // Limita a posição x e y para que as letras não saiam do canvas
   

    // Remove a letra se ela ultrapassar o final do canvas
   
  });

  requestAnimationFrame(update);
}

update();

// Evento de clique no canvas para selecionar letras
canvas.addEventListener("click", (event) => {
  const { offsetX, offsetY } = event;
  const padding = 30; // Área extra para aumentar a "hitbox"

  letters.forEach((letter, index) => {
    ctx.font = "50px Arial";
    const metrics = ctx.measureText(letter.char);
    const textWidth = metrics.width;
    const textHeight = 30; // Altura aproximada conforme o tamanho da fonte
    const letterTop = letter.y - textHeight;

    const xMin = letter.x - padding;
    const xMax = letter.x + textWidth + padding;
    const yMin = letterTop - padding;
    const yMax = letter.y + padding;
    
    if (offsetX > xMin && offsetX < xMax && offsetY > yMin && offsetY < yMax) {
      selectedWord += letter.char;
      letters.splice(index, 1);
      // Atualiza a exibição da palavra formada
      document.getElementById("palavraFormada").textContent = selectedWord;
    }
  });
});


// Listener global para tratar Backspace (apagar última letra) e Enter (validar a palavra)
document.addEventListener("keydown", function(event) {
  // Se a tecla pressionada for Backspace
  if (event.key === "Backspace") {
    event.preventDefault();  // Impede o comportamento padrão (como voltar página)
    // Remove a última letra da palavra formada
    selectedWord = selectedWord.slice(0, -1);
    document.getElementById("palavraFormada").textContent = selectedWord;
  } 
  // Se a tecla pressionada for Enter, valida a palavra
  else if (event.key === "Enter") {
    event.preventDefault();
    // Validação: converte a palavra formada para uppercase (pois as letras são maiúsculas)
    if (palavrasValidas.includes(selectedWord.toUpperCase())) {
      score += 10;
      document.getElementById("scoreDisplay").textContent = score;
      deleteWord();
    } else {
      alert("Palavra inválida!");
      deleteWord();
    }
  }
});



// Função para limpar a palavra formada
function deleteWord() {
  selectedWord = "";
  document.getElementById("palavraFormada").textContent = "";
}



// Listener para o botão de iniciar o jogo
 
  function startGame(dificuldade) {
  let speed, intervalo;
  if(dificuldade == 'facil'){
    speed = 1;
    intervalo = 1500;
  } else if (dificuldade == 'medio'){
    speed = 2;
    intervalo = 1000;

  } else if (dificuldade == 'dificil'){
    speed = 3;
    intervalo = 700;
  
  }
  
  // Exibe elementos do jogo
  canvas.style.display = "block";
  document.getElementById("palavraFormada").textContent = "block";
  document.getElementById('scoreDisplay').style.display = "block";
  document.getElementById('pontuacao').style.display = "block";
  document.getElementById('palavraFormada-text').style.display = "block";
  document.getElementById('timerDisplay').style.display = "block";

  
  // Oculta o container de dificuldades
  document.getElementById("modoJogo").style.display = "none";

  // Reinicia a palavra formada e exibição
  selectedWord = "";
  document.getElementById("palavraFormada").textContent = "";
  
  // Limpa e inicia o intervalo de geração de letras
  clearInterval(letterInterval);
  letterInterval = setInterval(() => {
    generateLetter();
    // Aqui você pode ajustar as velocidades de cada letra conforme a dificuldade
    letters.forEach(function(letter) {
      letter.speed = speed;
    });
  }, intervalo);

  startTimer();
}

// Primeiro, ao clicar em "Jogar", mostramos as dificuldades
document.getElementById("iniciarJogo").addEventListener("click", function() {
  // Oculta o botão "Jogar"
  this.style.display = "none";
  // Exibe o container de dificuldades
  document.getElementById("modoJogo").style.display = "flex";
  document.getElementById("modoJogo").style.justifyContent = "center";
  document.getElementById("modoJogo").style.flexDirection = "row";

});

// Eventos para os botões de dificuldade
document.getElementById("facil").addEventListener("click", function() {
  startGame("facil");
});
document.getElementById("medio").addEventListener("click", function() {
  startGame("medio");
});
document.getElementById("dificil").addEventListener("click", function() {
  startGame("dificil");
});

  document.getElementById('medio').style.display = "block";


