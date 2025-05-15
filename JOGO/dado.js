//js relacionado ao dado

const diceCanvas = document.getElementById("diceCanvas");
const diceContext = diceCanvas.getContext("2d");

let diceValue = 1;

 // FUNÇÕES RELATIVAS AO DADO
function desenharDado(value) {
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
      break;
  }
}

function rolarDado() {
    diceValue = Math.floor(Math.random() * 6) + 1;
    console.log("Valor sorteado do dado:", diceValue);

    let animationCount = 8;
    const interval = setInterval(() => {
      const faceTemp = Math.floor(Math.random() * 6) + 1;
      desenharDado(faceTemp);
      animationCount--;
      if (animationCount <= 0) {
        clearInterval(interval);
        desenharDado(diceValue);
      }
    }, 100);
    return diceValue;
  }


document.getElementById("rollButton").addEventListener("click", function() {
  console.log("Botão clicado - iniciando rolagem do dado.");
  rolarDado();

  proximoTurno();   
});


