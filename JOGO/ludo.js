document.addEventListener("DOMContentLoaded", () => {
  // REFERÊNCIAS DOS CANVASES E VARIÁVEIS GLOBAIS
  const ludoCanvas = document.getElementById("ludoCanvas");
  const ludoContext = ludoCanvas.getContext("2d");

  const diceCanvas = document.getElementById("diceCanvas");
  const diceContext = diceCanvas.getContext("2d");

  let diceValue = 1;
  const numCelulas = 15;
  const tamanhoTabuleiro = ludoCanvas.width; // assume canvas quadrado
  const tamanhoCelula = tamanhoTabuleiro / numCelulas;

  // FUNÇÕES DE DESENHO (TABULEIRO E FORMAS)
  function quadrado(ctx, cor, coordenadas, corBorda = "black") {
    const [x, y, largura, altura] = coordenadas;
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, largura, altura);
    ctx.lineWidth = 2;
    ctx.strokeStyle = corBorda;
    ctx.strokeRect(x, y, largura, altura);
  }

  function circulo(ctx, cor, coordenadas, corBorda = "black") {
    const [x, y, raio] = coordenadas;
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
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const x = (startCellX + i * dx) * tamanhoCelula;
      const y = (startCellY + i * dy) * tamanhoCelula;
      ctx.fillRect(x, y, tamanhoCelula, tamanhoCelula);
      ctx.strokeRect(x, y, tamanhoCelula, tamanhoCelula);
    }
  }

  function drawludoCanvas() {
    // Desenha a grade do tabuleiro
    ludoContext.strokeStyle = "black";
    for (let i = 0; i <= numCelulas; i++) {
      const pos = i * tamanhoCelula;
      ludoContext.beginPath();
      ludoContext.moveTo(pos, 0);
      ludoContext.lineTo(pos, tamanhoTabuleiro);
      ludoContext.stroke();

      ludoContext.beginPath();
      ludoContext.moveTo(0, pos);
      ludoContext.lineTo(tamanhoTabuleiro, pos);
      ludoContext.stroke();
    }

    // Áreas coloridas do tabuleiro
    quadrado(ludoContext, "green", [0, 0, 280, 280]);
    quadrado(ludoContext, "red", [420, 0, 280, 280]);
    quadrado(ludoContext, "blue", [0, 420, 280, 280]);
    quadrado(ludoContext, "yellow", [420, 420, 280, 280]);

    // Quadrados internos
    quadrado(ludoContext, "white", [40, 40, 205, 205]); // verde
    quadrado(ludoContext, "white", [460, 40, 205, 205]); // vermelho
    quadrado(ludoContext, "white", [40, 460, 205, 205]); // azul
    quadrado(ludoContext, "white", [460, 460, 205, 205]); // amarelo

    // Círculos das áreas
    // Verde
    circulo(ludoContext, "green", [90, 200, 20]);
    circulo(ludoContext, "green", [190, 90, 20]);
    circulo(ludoContext, "green", [190, 200, 20]);
    circulo(ludoContext, "green", [90, 90, 20]);
    // Vermelho
    circulo(ludoContext, "red", [520, 200, 20]);
    circulo(ludoContext, "red", [610, 90, 20]);
    circulo(ludoContext, "red", [610, 200, 20]);
    circulo(ludoContext, "red", [520, 90, 20]);
    // Azul
    circulo(ludoContext, "blue", [90, 620, 20]);
    circulo(ludoContext, "blue", [190, 510, 20]);
    circulo(ludoContext, "blue", [190, 620, 20]);
    circulo(ludoContext, "blue", [90, 510, 20]);
    // Amarelo
    circulo(ludoContext, "yellow", [520, 620, 20]);
    circulo(ludoContext, "yellow", [610, 510, 20]);
    circulo(ludoContext, "yellow", [610, 620, 20]);
    circulo(ludoContext, "yellow", [520, 510, 20]);

    // Desenha as áreas centrais (triângulos)
    const centroX = 7.5 * tamanhoCelula;
    const centroY = 7.5 * tamanhoCelula;
    const inicioX = 6 * tamanhoCelula;
    const inicioY = 6 * tamanhoCelula;
    const fimX = 9 * tamanhoCelula;
    const fimY = 9 * tamanhoCelula;

    // Triângulo vermelho
    ludoContext.beginPath();
    ludoContext.moveTo(centroX, centroY);
    ludoContext.lineTo(inicioX, inicioY);
    ludoContext.lineTo(fimX, inicioY);
    ludoContext.closePath();
    ludoContext.fillStyle = "red";
    ludoContext.fill();
    ludoContext.stroke();

    // Triângulo verde
    ludoContext.beginPath();
    ludoContext.moveTo(centroX, centroY);
    ludoContext.lineTo(inicioX, inicioY);
    ludoContext.lineTo(inicioX, fimY);
    ludoContext.closePath();
    ludoContext.fillStyle = "green";
    ludoContext.fill();
    ludoContext.stroke();

    // Triângulo amarelo
    ludoContext.beginPath();
    ludoContext.moveTo(centroX, centroY);
    ludoContext.lineTo(fimX, inicioY);
    ludoContext.lineTo(fimX, fimY);
    ludoContext.closePath();
    ludoContext.fillStyle = "yellow";
    ludoContext.fill();
    ludoContext.stroke();

    // Triângulo azul
    ludoContext.beginPath();
    ludoContext.moveTo(centroX, centroY);
    ludoContext.lineTo(inicioX, fimY);
    ludoContext.lineTo(fimX, fimY);
    ludoContext.closePath();
    ludoContext.fillStyle = "blue";
    ludoContext.fill();
    ludoContext.stroke();
  }

  // Inicializa o tabuleiro e os caminhos
  drawludoCanvas();
  desenhaCaminho(ludoContext, "red", 7, 0, 0, 1); // Vermelho (de cima)
  desenhaCaminho(ludoContext, "green", 0, 7, 1, 0); // Verde (da esquerda)
  desenhaCaminho(ludoContext, "blue", 7, 14, 0, -1); // Amarelo (de baixo)
  desenhaCaminho(ludoContext, "yellow", 14, 7, -1, 0); // Azul (da direita)

 // FUNÇÕES RELATIVAS AO DADO
 function drawDiceFace(value) {
  // Limpa e desenha o fundo do canvas do dado
  diceContext.clearRect(0, 0, diceCanvas.width, diceCanvas.height);
  diceContext.fillStyle = "white";
  diceContext.fillRect(0, 0, diceCanvas.width, diceCanvas.height);
  diceContext.strokeStyle = "black";
  diceContext.lineWidth = 2;
  diceContext.strokeRect(0, 0, diceCanvas.width, diceCanvas.height);

  const size = diceCanvas.width;
  const center = size / 2;
  const offset = size * 0.2;

  function drawPip(x, y) {
    diceContext.beginPath();
    diceContext.arc(x, y, size * 0.1, 0, Math.PI * 2);
    diceContext.fillStyle = "black";
    diceContext.fill();
  }

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

function rolarDado() {
  diceValue = Math.floor(Math.random() * 6) + 1;
  console.log("Valor sorteado do dado:", diceValue);

  let animationCount = 8;
  const interval = setInterval(() => {
    const faceTemp = Math.floor(Math.random() * 6) + 1;
    drawDiceFace(faceTemp);
    animationCount--;
    if (animationCount <= 0) {
      clearInterval(interval);
      drawDiceFace(diceValue);
    }
  }, 100);
}

  
  // Configura o evento de clique no botão "Rolar dado"
  document.getElementById("rollButton").addEventListener("click", rolarDado);
  
  // Desenha a face inicial do dado
  drawDiceFace(diceValue);
});


class Peca {
  constructor(cor, baseX, baseY, rota, borda = '3px solid black') {
    this.cor = cor;
    this.baseX = baseX; // Coordenada X na base (antes de sair)
    this.baseY = baseY; // Coordenada Y na base
    this.rota = rota; // Array de [x, y] que representa o caminho no tabuleiro
    this.posicaoAtual = -1; // -1 indica que a peça ainda está na base
    this.borda = borda; // Cor da borda da peça
  }

  // Obtém as coordenadas atuais da peça
  get posicao() {
    if (this.posicaoAtual === -1) {
      return [this.baseX, this.baseY];
    }
    return this.rota[this.posicaoAtual];
  }
}

// rota para peças vermelhas
const rotaVermelha = [
    [520, 90],  // ponto de saída no tabuleiro
    [395, 25],
    [395, 71],
    [395, 118],
    [395, 166],    
    [395, 214], //5
    [395, 261],
    [443, 306],
    [490, 306],
    [537, 306],
    [583, 306], //10
    [630, 306],
    [677, 306],
    [677, 353], 
    [677, 400], 
    [630, 400], //15
    [583, 400],
    [537, 400],
    [490, 400],
    [443, 400],
    [395, 447], //20
    [395, 493],
    [395, 537],
    [395, 583],
    [395, 630],
    [395, 677], //25
    [350, 677],
    [303, 677],
    [303, 630],
    [303, 583],
    [303, 537], //30
    [303, 493],
    [303, 447],
    [257, 400],
    [210, 400],
    [163, 400], //35
    [117, 400],
    [70, 400],
    [23, 400],
    [23, 353],
    [23, 306], //40
    [70, 306],
    [117, 306],
    [163, 306],
    [210, 306],
    [257, 306], //45
    [303, 261],
    [303, 214],
    [303, 166],
    [303, 118],
    [303, 71], //50
    [303, 25],
    [350, 25],
    [350, 71],
    [350, 118],
    [350, 166], //55
    [350, 214],
    [350, 261],
    [350, 300],

];
// rota para peças verdes 
const rotaVerde = [
    [90, 90],  // ponto de saída no tabuleiro
    [23, 306],
    [70, 306],
    [117, 306],
    [163, 306],
    [210, 306], //5
    [257, 306], 
    [303, 261],
    [303, 214],
    [303, 166],
    [303, 118], //10
    [303, 71], 
    [303, 25],
    [350, 25],
    [395, 25],
    [395, 71], //15
    [395, 118],
    [395, 166],    
    [395, 214],
    [395, 261],
    [443, 306], //20
    [490, 306],
    [537, 306],
    [583, 306], 
    [630, 306],
    [677, 306], //25
    [677, 353], 
    [677, 400], 
    [630, 400], 
    [583, 400],
    [537, 400], //30
    [490, 400],
    [443, 400],
    [395, 447], 
    [395, 493],
    [395, 537], //35
    [395, 583],
    [395, 630],
    [395, 677], 
    [350, 677],
    [303, 677], //40
    [303, 630],
    [303, 583],
    [303, 537],
    [303, 493],
    [303, 447], //45
    [257, 400],
    [210, 400],
    [163, 400], 
    [117, 400],
    [70, 400], //50
    [23, 400],
    [23, 353],
    [70, 353],
    [117, 353],
    [163, 353], //55
    [210, 353],
    [257, 353],
    [303, 353],
    
];
// rota para peças azuis
const rotaAzul = [
    [190, 620],  // ponto de saída no tabuleiro
    [303, 677], 
    [303, 630],
    [303, 583],
    [303, 537],
    [303, 493], //5
    [303, 447], 
    [257, 400],
    [210, 400],
    [163, 400], 
    [117, 400], //10
    [70, 400], 
    [23, 400],
    [23, 353],
    [23, 306],
    [70, 306], //15
    [117, 306],
    [163, 306],
    [210, 306], 
    [257, 306], 
    [303, 261], //20
    [303, 214],
    [303, 166],
    [303, 118], 
    [303, 71], 
    [303, 25], //25
    [350, 25],
    [395, 25],
    [395, 71], 
    [395, 118],
    [395, 166], //30    
    [395, 214],
    [395, 261],
    [443, 306], 
    [490, 306],
    [537, 306], //35
    [583, 306], 
    [630, 306],
    [677, 306], 
    [677, 353], 
    [677, 400], //40
    [630, 400], 
    [583, 400],
    [537, 400], 
    [490, 400],
    [443, 400], //45
    [395, 447], 
    [395, 493],
    [395, 537], 
    [395, 583],
    [395, 630], //50
    [395, 677], 
    [350, 677],
    [350, 630],
    [350, 583],
    [350, 537], //55
    [350, 493],
    [350, 447],
    [350, 400],

];
// rota para peças amarelas
const rotaAmarela = [
    [610, 510],  // ponto de saída no tabuleiro
    [677, 400], 
    [630, 400], 
    [583, 400],
    [537, 400], 
    [490, 400], //5
    [443, 400], 
    [395, 447], 
    [395, 493],
    [395, 537], 
    [395, 583], //10
    [395, 630], 
    [395, 677], 
    [350, 677],
    [303, 677], 
    [303, 630], //15
    [303, 583],
    [303, 537],
    [303, 493], 
    [303, 447], 
    [257, 400], //20
    [210, 400],
    [163, 400], 
    [117, 400], 
    [70, 400], 
    [23, 400], //25
    [23, 353],
    [23, 306],
    [70, 306], 
    [117, 306],
    [163, 306], //30
    [210, 306], 
    [257, 306], 
    [303, 261], 
    [303, 214],
    [303, 166], //35
    [303, 118], 
    [303, 71], 
    [303, 25], 
    [350, 25],
    [395, 25], //40
    [395, 71], 
    [395, 118],
    [395, 166],    
    [395, 214],
    [395, 261], //45
    [443, 306], 
    [490, 306],
    [537, 306], 
    [583, 306], 
    [630, 306], //50
    [677, 306], 
    [677, 353],
    [630, 353], 
    [583, 353], 
    [537, 353], 
    [490, 353], 
    [443, 353], 
    [395, 353], 

];

// Criação das peças para a cor vermelha:
const pecasVermelhas = [
    new Peca('red', 520, 90, rotaVermelha),
    new Peca('red', 610, 90, rotaVermelha),
    new Peca('red', 520, 200, rotaVermelha),
    new Peca('red', 610, 200, rotaVermelha),
];
console.log('Peças vermelhas:', pecasVermelhas);

function desenharPecas() {
  // Primeiro redesenha o tabuleiro 
  drawludoCanvas();

  // Em seguida desenha as peças vermelhas (repita para as demais cores, se necessário)
  pecasVermelhas.forEach(peca => {
    const [x, y] = peca.posicao;
    circulo(ludoContext, peca.cor, [x, y, 20], 'red');
  });
}

function moverPeca(peca, diceValue) {
  if (pecasVermelhas.length > 0) {
    console.log('Posição inicial da primeira peça:', pecasVermelhas[0].posicao);
  }
  
  // Se a peça está na base, só sai se tirar 6
  if (peca.posicaoAtual === -1) {
    if (diceValue === 6) {
      peca.moverPara = (1); // Coloca a peça na primeira casa da rota
      console.log("Peça saiu da base para a posição 1.");
    } else {
      console.log("Você precisa tirar 6 para sair da base!");
      return; // Não executa movimento
    }
  } else {
    let novaPosicao = peca.posicaoAtual + diceValue;
    // Verifica se o movimento é válido (não ultrapassa a rota)
    if (novaPosicao >= peca.rota.length) {
     novaPosicao = peca.rota.lenght - 1; // Coloca na última posição da rota
    }
    peca.moverPara(novaPosicao);
    console.log(`Peça movida para a posição ${novaPosicao}`);
  // Após atualizar a posição, é hora de redesenhar as peças
  }
  desenharPecas();
}

const dado = rolarDado();
console.log("Valor do dado:", dado);

const minhaPeca = pecasVermelhas[0];
moverPeca(minhaPeca, dado);

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
