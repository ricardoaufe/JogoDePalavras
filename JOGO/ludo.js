let ludoCanvas = document.getElementById('ludoCanvas');
let ludoContext = ludoCanvas.getContext('2d');

const diceCanvas = document.getElementById("diceCanvas");
const diceContext = diceCanvas.getContext("2d");
let diceValue = 1;



function quadrado(ctx, cor, coordenada, corBorda = 'black') {
    const [x, y, largura, altura] = coordenada;
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, largura, altura);
    ctx.lineWidth = 2;
    ctx.strokeStyle = corBorda;
    ctx.strokeRect(x, y, largura, altura);
    
}

function circulo(ctx, cor, coordenada, corBorda = 'black') {
    const [x, y, raio] = coordenada;
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = corBorda;
    ctx.stroke();
}

function desenhaCaminho(ctx, cor, startCellX, startCellY, dx, dy) {
    ctx.fillStyle = cor;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;  // Garante que a largura da borda seja consistente
    for (let i = 0; i < 6; i++) {
        const x = (startCellX + i * dx) * tamanhoCelula;
        const y = (startCellY + i * dy) * tamanhoCelula;
        ctx.fillRect(x, y, tamanhoCelula, tamanhoCelula);
        ctx.strokeRect(x, y, tamanhoCelula, tamanhoCelula);
    }
}

function desenhaEstrela(ctx, centerX, centerY, raio, cor = 'red') {
    const spikes = 5;
    const step = Math.PI / spikes;
    let rot = Math.PI / 2 * 3;
    let x = centerX;
    let y = centerY;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - raio);
    for (let i = 0; i < spikes; i++) {
        x = centerX + Math.cos(rot) * raio;
        y = centerY + Math.sin(rot) * raio;
        ctx.lineTo(x, y);
        rot += step;

        x = centerX + Math.cos(rot) * (raio / 2);
        y = centerY + Math.sin(rot) * (raio / 2);
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(centerX, centerY - raio);
    ctx.closePath();
    ctx.fillStyle = cor;
    ctx.fill();
}

const numCelulas = 15;
const tamanhoTabuleiro = ludoCanvas.width; // Assumindo canvas quadrado
const tamanhoCelula = tamanhoTabuleiro / numCelulas;

function drawludoCanvas(){

    ludoContext.strokeStyle = 'black';
    for (let i = 0; i <= numCelulas; i++) {
        const pos = i * tamanhoCelula;

        // Linhas verticais
        ludoContext.beginPath();
        ludoContext.moveTo(pos, 0);
        ludoContext.lineTo(pos, tamanhoTabuleiro);
        ludoContext.stroke();

        // Linhas horizontais
        ludoContext.beginPath();
        ludoContext.moveTo(0, pos);
        ludoContext.lineTo(tamanhoTabuleiro, pos);
        ludoContext.stroke();
}


    quadrado(ludoContext, 'green', [0, 0, 280, 280], 'black');
    quadrado(ludoContext, 'red', [420, 0, 280, 280], 'black');
    quadrado(ludoContext, 'blue', [0, 420, 280, 280], 'black');
    quadrado(ludoContext, 'yellow', [420,  420 , 280, 280], 'black');

    quadrado(ludoContext, 'white', [40, 40, 205, 205], 'black'); // verde
    quadrado(ludoContext, 'white', [460, 40, 205, 205], 'black'); // vermelho
    quadrado(ludoContext, 'white', [40, 460, 205, 205], 'black'); // azul
    quadrado(ludoContext, 'white', [460, 460, 205, 205], 'black'); // amarelo


    circulo(ludoContext, 'green', [90, 200, 20], 'black');
    circulo(ludoContext, 'green', [190, 90, 20], 'black');
    circulo(ludoContext, 'green', [190, 200, 20], 'black');
    circulo(ludoContext, 'green', [90, 90, 20], 'black');

    circulo(ludoContext, 'red', [520, 200, 20], 'black');
    circulo(ludoContext, 'red', [610, 90, 20], 'black');
    circulo(ludoContext, 'red', [610, 200, 20], 'black');
    circulo(ludoContext, 'red', [520, 90, 20], 'black');

    circulo(ludoContext, 'blue', [90, 620, 20], 'black');
    circulo(ludoContext, 'blue', [190, 510, 20], 'black');
    circulo(ludoContext, 'blue', [190, 620, 20], 'black');
    circulo(ludoContext, 'blue', [90, 510, 20], 'black');

    circulo(ludoContext, 'yellow', [520, 620, 20], 'black');
    circulo(ludoContext, 'yellow', [610, 510, 20], 'black');
    circulo(ludoContext, 'yellow', [610, 620, 20], 'black');
    circulo(ludoContext, 'yellow', [520, 510, 20], 'black');

      
    // === 1. Triângulos centrais ===
    const centroX = 7.5 * tamanhoCelula;
    const centroY = 7.5 * tamanhoCelula;
    const inicioX = 6 * tamanhoCelula;
    const inicioY = 6 * tamanhoCelula;
    const fimX = 9 * tamanhoCelula;
    const fimY = 9 * tamanhoCelula;


    // Triângulo vermelho (topo)
    ludoContext.beginPath();
    ludoContext.moveTo(centroX, centroY);
    ludoContext.lineTo(inicioX, inicioY);
    ludoContext.lineTo(fimX, inicioY);
    ludoContext.closePath();
    ludoContext.fillStyle = 'red';
    ludoContext.fill();
    ludoContext.stroke();

    // Triângulo verde (esquerda)
    ludoContext.beginPath();
    ludoContext.moveTo(centroX, centroY);
    ludoContext.lineTo(inicioX, inicioY);
    ludoContext.lineTo(inicioX, fimY);
    ludoContext.closePath();
    ludoContext.fillStyle = 'green';
    ludoContext.fill();
    ludoContext.stroke();

    // Triângulo amarelo (direita)
    ludoContext.beginPath();
    ludoContext.moveTo(centroX, centroY);
    ludoContext.lineTo(fimX, inicioY);
    ludoContext.lineTo(fimX, fimY);
    ludoContext.closePath();
    ludoContext.fillStyle = 'yellow';
    ludoContext.fill();
    ludoContext.stroke();

    // Triângulo azul (embaixo)
    ludoContext.beginPath();
    ludoContext.moveTo(centroX, centroY);
    ludoContext.lineTo(inicioX, fimY);
    ludoContext.lineTo(fimX, fimY);
    ludoContext.closePath();
    ludoContext.fillStyle = 'blue';
    ludoContext.fill();
    ludoContext.stroke();

    // === Casas seguras com estrela ===
    const casasSeguras = [
        [1, 6], [2, 8], [6, 1], [6, 13],
        [8, 2], [8, 12], [13, 6], [12, 8]
    ];

    casasSeguras.forEach(([linha, coluna]) => {
        const x = coluna * tamanhoCelula + tamanhoCelula / 2;
        const y = linha * tamanhoCelula + tamanhoCelula / 2;
        desenhaEstrela(ludoContext, x, y, tamanhoCelula / 3, 'black');
    });

}

drawludoCanvas();

// Caminhos corretos para o centro
desenhaCaminho(ludoContext, 'red', 7, 0, 0, 1);       // Vermelho (de cima)
desenhaCaminho(ludoContext, 'green', 0, 7, 1, 0);     // Verde (da esquerda)
desenhaCaminho(ludoContext, 'yellow', 7, 14, 0, -1);  // Amarelo (de baixo)
desenhaCaminho(ludoContext, 'blue', 14, 7, -1, 0);    // Azul (da direita)
// Garante que o script será executado após o DOM estar pronto
document.addEventListener("DOMContentLoaded", function() {
  const diceCanvas = document.getElementById("diceCanvas");
  const diceContext = diceCanvas.getContext("2d");
  let diceValue = 1;  // Valor inicial do dado
  
  // Função para desenhar a face do dado com base no valor recebido
  function drawDiceFace(value) {
    // Limpa o canvas
    diceContext.clearRect(0, 0, diceCanvas.width, diceCanvas.height);
    
    // Desenha o fundo branco com borda
    diceContext.fillStyle = "white";
    diceContext.fillRect(0, 0, diceCanvas.width, diceCanvas.height);
    diceContext.strokeStyle = "black";
    diceContext.lineWidth = 2;
    diceContext.strokeRect(0, 0, diceCanvas.width, diceCanvas.height);
    
    // Define parâmetros para os "pips"
    const size = diceCanvas.width;
    const center = size / 2;
    const offset = size * 0.2;
    
    // Função auxiliar para desenhar um pip
    function drawPip(x, y) {
      diceContext.beginPath();
      diceContext.arc(x, y, size * 0.1, 0, Math.PI * 2);
      diceContext.fillStyle = "black";
      diceContext.fill();
    }
    
    // Desenha os pips de acordo com o valor
    switch (value) {
      case 1:
        drawPip(center, center);
        break;
      case 2:
        drawPip(center - offset, center - offset);
        drawPip(center + offset, center + offset);
        break;
      case 3:
        drawPip(center - offset, center - offset);
        drawPip(center, center);
        drawPip(center + offset, center + offset);
        break;
      case 4:
        drawPip(center - offset, center - offset);
        drawPip(center + offset, center - offset);
        drawPip(center - offset, center + offset);
        drawPip(center + offset, center + offset);
        break;
      case 5:
        drawPip(center - offset, center - offset);
        drawPip(center + offset, center - offset);
        drawPip(center, center);
        drawPip(center - offset, center + offset);
        drawPip(center + offset, center + offset);
        break;
      case 6:
        drawPip(center - offset, center - offset);
        drawPip(center + offset, center - offset);
        drawPip(center - offset, center);
        drawPip(center + offset, center);
        drawPip(center - offset, center + offset);
        drawPip(center + offset, center + offset);
        break;
      default:
        console.log("Valor inválido para o dado:", value);
    }
  }
  
  // Função para rolar o dado
  function rollDice() {
    // Gera um valor aleatório entre 1 e 6 e atualiza diceValue
    diceValue = Math.floor(Math.random() * 6) + 1;
    console.log("Valor sorteado do dado:", diceValue);
    
    // Animação simples para simular a rolagem: mostra faces aleatórias
    let animationCount = 8;
    let interval = setInterval(() => {
      let faceTemp = Math.floor(Math.random() * 6) + 1;
      drawDiceFace(faceTemp);
      animationCount--;
      if (animationCount <= 0) {
        clearInterval(interval);
        // Desenha a face final com o valor sorteado
        drawDiceFace(diceValue);
      }
    }, 100);
  }
  
  // Configura o evento de clique no botão "Rolar dado"
  document.getElementById("rollButton").addEventListener("click", rollDice);
  
  // Desenha a face inicial do dado
  drawDiceFace(diceValue);
});



class Peca {
  constructor(cor, baseX, baseY, rota) {
    this.cor = cor;
    this.baseX = baseX; // Coordenada X na base (antes de sair)
    this.baseY = baseY; // Coordenada Y na base
    this.rota = rota; // Array de [x, y] que representa o caminho no tabuleiro
    this.posicaoAtual = -1; // -1 indica que a peça ainda está na base
  }

  // Obtém as coordenadas atuais da peça
  get posicao() {
    if (this.posicaoAtual === -1) {
      return [this.baseX, this.baseY];
    }
    return this.rota[this.posicaoAtual];
  }
}

// Exemplo de rota para peças vermelhas
const rotaVermelha = [
    [520, 90],  // ponto de saída no tabuleiro
    [395, 25],
    [395, 71],
    [395, 118],
    [395, 166],    
    [395, 214],
    [395, 261],
    [443, 306],
    [490, 306],
    [537, 306],
    [583, 306],
    [630, 306],
    [677, 306],
    [677, 353],
    [677, 400], // casa de chegada

];
// Exemplo de rota para peças verdes 
const rotaVerde = [
    [90, 520],  // ponto de saída no tabuleiro
    [140, 520],
    [190, 520],
    [240, 520],
    [290, 520],    
    [340, 520],
    [390, 520],
    [440, 520],
    [490, 520],
    [540, 520],
    [590, 520],
    [640, 520],
    [690, 520],
    [740, 520],
    [790, 520], // casa de chegada
]

// Exemplo de rota para peças azuis
const rotaAzul = [
    [90, 620],  // ponto de saída no tabuleiro
    [140, 620],
    [190, 620],
    [240, 620],
    [290, 620],    
    [340, 620],
    [390, 620],
    [440, 620],
    [490, 620],
    [540, 620],
    [590, 620],
    [640, 620],
    [690, 620],
    [740, 620],
    [790, 620], // casa de chegada
]


// Criação das peças para a cor vermelha:
const pecasVermelhas = [
    new Peca('red', 520, 90, rotaVermelha),
    new Peca('red', 610, 90, rotaVermelha),
    new Peca('red', 520, 200, rotaVermelha),
    new Peca('red', 610, 200, rotaVermelha),
    new Peca('red', 520, 300, rotaVermelha),
    new Peca('red', 610, 300, rotaVermelha),
    new Peca('red', 520, 400, rotaVermelha),
    new Peca('red', 610, 400, rotaVermelha),
    new Peca('red', 520, 500, rotaVermelha),
    new Peca('red', 610, 500, rotaVermelha),
    new Peca('red', 520, 600, rotaVermelha),
    new Peca('red', 610, 600, rotaVermelha),
    new Peca('red', 520, 700, rotaVermelha),
    new Peca('red', 610, 700, rotaVermelha),
    
];


function moverPeca(peca, diceValue) {
  // Se a peça está na base, só sai se tirar 6
  if (peca.posicaoAtual === -1) {
    if (diceValue === 6) {
      peca.posicaoAtual = 0; // Coloca a peça na primeira casa da rota
    } else {
      console.log("Você precisa tirar 6 para sair da base!");
      return; // Não executa movimento
    }
  } else {
    let novaPosicao = peca.posicaoAtual + diceValue;
    // Verifica se o movimento é válido (não ultrapassa a rota)
    if (novaPosicao < peca.rota.length) {
      peca.posicaoAtual = novaPosicao;
    } else {
      console.log("Movimento inválido: ultrapassaria a meta!");
      return;
    }
  }

  // Após atualizar a posição, é hora de redesenhar as peças
  desenharPecas();
}

function desenharPecas() {
  // Primeiro redesenha o tabuleiro 
  drawludoCanvas();

  // Em seguida desenha as peças vermelhas (repita para as demais cores, se necessário)
  pecasVermelhas.forEach(peca => {
    const [x, y] = peca.posicao;
    circulo(ludoContext, peca.cor, [x, y, 20], 'black');
  });
}

function desenharRota(rota, cor = 'black') {
  // Desenha linhas conectando os pontos da rota
  ludoContext.strokeStyle = cor;
  ludoContext.lineWidth = 2;
  ludoContext.beginPath();
  rota.forEach((coord, index) => {
    const [x, y] = coord;
    // No primeiro ponto, move o "cursor" da linha para a posição inicial
    if (index === 0) {
      ludoContext.moveTo(x, y);
    } else {
      ludoContext.lineTo(x, y);
    }
  });
  ludoContext.stroke();

  // Desenha um círculo e o índice em cada ponto
  rota.forEach((coord, index) => {
    const [x, y] = coord;
    // Círculo
    ludoContext.beginPath();
    ludoContext.arc(x, y, 5, 0, Math.PI * 2);
    ludoContext.fillStyle = 'white';  // Fundo branco para destacar o ponto
    ludoContext.fill();
    ludoContext.strokeStyle = cor;
    ludoContext.stroke();

    // Índice (opcional)
    ludoContext.font = "12px Arial";
    ludoContext.fillStyle = cor;
    ludoContext.fillText(index, x + 8, y - 8);
  });
}
desenharRota(rotaVermelha, 'red');
