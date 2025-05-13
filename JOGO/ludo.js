let ludoCanvas = document.getElementById('ludoCanvas');
let ludoContext = ludoCanvas.getContext('2d');

const tamanhoTabuleiro = 704; // Múltiplo de 44 para melhor encaixe

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


for (var i = 0; i <= tamanhoTabuleiro; i += 44) {
    // vertical
    ludoContext.moveTo(i, 0);
    ludoContext.lineTo(i, tamanhoTabuleiro);

    // horizontal
    ludoContext.moveTo(0, i);
    ludoContext.lineTo(tamanhoTabuleiro, i);

    ludoContext.strokeStyle = 'black';
    ludoContext.stroke();
}




function drawludoCanvas(){


    quadrado(ludoContext, 'green', [0, 0, 250, 250], 'black');
    quadrado(ludoContext, 'red', [450, 0, 250, 250], 'black');
    quadrado(ludoContext, 'blue', [0, 450, 250, 250], 'black');
    quadrado(ludoContext, 'yellow', [450,  450 , 250, 250], 'black');

    quadrado(ludoContext, 'white', [40, 40, 175, 175], 'black');
    quadrado(ludoContext, 'white', [490, 40, 175, 175], 'black');
    quadrado(ludoContext, 'white', [40, 490, 175, 175], 'black');
    quadrado(ludoContext, 'white', [490, 490, 175, 175], 'black');


    circulo(ludoContext, 'green', [85, 170, 15], 'black');
    circulo(ludoContext, 'green', [170, 90, 15], 'black');
    circulo(ludoContext, 'green', [170, 170, 15], 'black');
    circulo(ludoContext, 'green', [85, 90, 15], 'black');

    circulo(ludoContext, 'red', [535, 170, 15], 'black');
    circulo(ludoContext, 'red', [620, 90, 15], 'black');
    circulo(ludoContext, 'red', [620, 170, 15], 'black');
    circulo(ludoContext, 'red', [535, 90, 15], 'black');

    circulo(ludoContext, 'blue', [85, 620, 15], 'black');
    circulo(ludoContext, 'blue', [170, 540, 15], 'black');
    circulo(ludoContext, 'blue', [170, 620, 15], 'black');
    circulo(ludoContext, 'blue', [85, 540, 15], 'black');

    circulo(ludoContext, 'yellow', [535, 620, 15], 'black');
    circulo(ludoContext, 'yellow', [620, 540, 15], 'black');
    circulo(ludoContext, 'yellow', [620, 620, 15], 'black');
    circulo(ludoContext, 'yellow', [535, 540, 15], 'black');

    

    // Caminho central
    quadrado(ludoContext, 'white', [250, 250, 200, 200], 'black');

    // Triângulos no centro
    ludoContext.fillStyle = 'green';
    ludoContext.beginPath();
    ludoContext.moveTo(250, 250);
    ludoContext.lineTo(350, 350);
    ludoContext.lineTo(250, 450);
    ludoContext.closePath();
    ludoContext.fill();
    ludoContext.stroke();

    ludoContext.fillStyle = 'red';
    ludoContext.beginPath();
    ludoContext.lineTo(250, 250);
    ludoContext.lineTo(450, 250);
    ludoContext.lineTo(400, 400);
    ludoContext.closePath();
    ludoContext.fill();
    ludoContext.stroke();

    ludoContext.fillStyle = 'blue';
    ludoContext.beginPath();
    ludoContext.moveTo(250, 450);
    ludoContext.lineTo(350, 350);
    ludoContext.lineTo(450, 450);
    ludoContext.closePath();
    ludoContext.fill();
    ludoContext.stroke();

    ludoContext.fillStyle = 'yellow';
    ludoContext.beginPath();
    ludoContext.moveTo(450, 450);
    ludoContext.lineTo(350, 350);
    ludoContext.lineTo(450, 250);
    ludoContext.closePath();
    ludoContext.fill();
    ludoContext.stroke();
}

drawludoCanvas();

