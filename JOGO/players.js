//js foco em players, peças, turnos, etc
// rota para peças vermelhas

const players = ["verde", "vermelho", "azul", "amarelo"];
let currentPlayerIndex = 0;

class Peca {
    constructor(cor, x, y, rota) {
      this.cor = cor;
      this.x = x; // Coordenada X na base (antes de sair)
      this.y = y; // Coordenada Y na base
      this.rota = rota; // Array de [x, y] que representa o caminho no tabuleiro
      this.posicaoAtual = -1; 
    }
    get posicao() {
        if (this.posicaoAtual === -1) {
            return [this.x, this.y];
    }
    return this.rota[this.posicaoAtual];
}
     
    desenhar(ludoContext) {
      const [x, y] = this.posicao;
      ludoContext.fillStyle = this.cor;
      ludoContext.beginPath();
      ludoContext.arc(x, y, 20, 0, Math.PI * 2);
      ludoContext.fill();
      ludoContext.stroke();
    }

    foiClicada(mouseX, mouseY) {
      const [x, y] = this.posicao;
      const raio = 20;
      const dx = mouseX - x;
      const dy = mouseY - y;
      return dx * dx + dy * dy <= raio * raio;
    }
    
    moverPor(movimentos) {
        if (this.posicaoAtual === -1) {
            if (movimentos === 6) {
                this.posicaoAtual = 0; // Sai da base
                console.log(`A peça ${this.cor} saiu da base!`);
           }else{
            console.log(`A peça ${this.cor} não pode sair da base, pois o valor do dado não é 6.`);
            return false; //Movimento não efetuado
           }
        }else{
            let novaPosicao = this.posicaoAtual + movimentos;
         if (novaPosicao >= this.rota.length){
            novaPosicao = this.rota.length - 1; // Limita a nova posição ao final da rota
            console.log(`A peça ${this.cor} chegou ao final da rota!`);
         }

         this.posicaoAtual = novaPosicao;
         console.log(`A peça ${this.cor} se moveu para a posição ${this.rota[this.posicaoAtual]}`);
        }
        return true; // Movimento efetuado
    }
}

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
const pecaTeste = new Peca("red", 520, 90, rotaVermelha);

// Chame o método desenhar para ver se o log aparece (certifique-se de que ludoContext está definido)
pecaTeste.desenhar(ludoContext);

// Tente mover a peça:
pecaTeste.moverPor(6);  //

const configuracoesCor = {
    vermelho: {
      posicoes: [
        [520, 90], [610, 90], [520, 200], [610, 200]
      ],
      rota: rotaVermelha
    },
    verde: {
      posicoes: [
        [90, 90], [90, 200], [190, 90], [190, 200]
      ],
      rota: rotaVerde
    },
    azul: {
      posicoes: [
        [190, 620], [190, 510], [90, 620], [90, 510]
      ],
      rota: rotaAzul
    },
    amarelo: {
      posicoes: [
        [610, 620], [610, 510], [520, 620], [520, 510]
      ],
      rota: rotaAmarela
    }
      }

const jogadores = [];

function createPlayers() {
  let numJogadores = parseInt(prompt("Quantos jogadores? (2 a 4)"));
  while (isNaN(numJogadores) || numJogadores < 2 || numJogadores > 4) {
    numJogadores = parseInt(prompt("Número inválido. Por favor, insira um número entre 2 e 4."));
  }

  const coresSelecionadas = [];

  for (let i = 0; i < numJogadores; i++) {
    let cor = prompt(`Cor do jogador ${i + 1}:`).toLowerCase().trim();
    while (!configuracoesCor[cor] || coresSelecionadas.includes(cor)) {
      cor = prompt(`Cor inválida ou repetida. Escolha outra para o jogador ${i + 1}:`).toLowerCase().trim();
    }
    coresSelecionadas.push(cor);

    const { posicoes, rota } = configuracoesCor[cor];
    const pecas = posicoes.map(([x, y]) => new Peca(cor, x, y, rota));
    
    jogadores.push({ id: i, cor, pecas, venceu: false });
  }
}

createPlayers();


let turnoAtual = 0;

function proximoTurno() {
  turnoAtual = (turnoAtual + 1) % jogadores.length;
  console.log(`É a vez do jogador ${jogadores[turnoAtual].cor}`);
};



// Substitua 'ludoCanvas' pelo id ou referência real do seu canvas
const ludoCanvas = document.getElementById('ludoCanvas');
ludoCanvas.addEventListener("click", (e) => {
  const jogadorDaVez = jogadores[turnoAtual];
  for (const peca of jogadorDaVez.pecas) {
    if (peca.foiClicada(e.offsetX, e.offsetY)) {
      moverPeca(peca, diceValue);
    }
  }
});

function moverPeca(peca, passos) {
  if (peca.posicaoAtual === -1 && passos === 6) {
    // Sai da base
    peca.posicaoAtual = 0;
  } else if (peca.posicaoAtual >= 0) {
    peca.posicaoAtual = Math.min(peca.posicaoAtual + passos, peca.rota.length - 1);
  }
  drawludoCanvas(); // Atualiza o canvas para mostrar a peça na nova posição
}
