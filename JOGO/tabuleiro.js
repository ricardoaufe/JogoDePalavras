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

//js para o design do tabuleiro do jogo Ludo
function drawLudoCanvas(ludoCanvas, numCelulas, tamanhoTabuleiro, tamanhoCelula) {
  const ludoContext = ludoCanvas.getContext("2d");
  ludoContext.clearRect(0, 0, ludoCanvas.width, ludoCanvas.height);
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

document.addEventListener("DOMContentLoaded", () => {
  const ludoCanvas = document.getElementById("ludoCanvas");
  const numCelulas = 15;
  const tamanhoTabuleiro = ludoCanvas.width; // assume canvas quadrado
  const tamanhoCelula = tamanhoTabuleiro / numCelulas;

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

  drawLudoCanvas(ludoCanvas, numCelulas, tamanhoTabuleiro, tamanhoCelula);
  const ludoContext = ludoCanvas.getContext("2d");
  desenhaCaminho(ludoContext, "red", 7, 0, 0, 1); // Vermelho (de cima)
  desenhaCaminho(ludoContext, "green", 0, 7, 1, 0); // Verde (da esquerda)
  desenhaCaminho(ludoContext, "blue", 7, 14, 0, -1); // Amarelo (de baixo)
  desenhaCaminho(ludoContext, "yellow", 14, 7, -1, 0); // Azul (da direita)
});
