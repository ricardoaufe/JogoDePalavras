document.getElementById('Jogar').addEventListener('click', function() {
    iniciarJogo(); // Chama funções que desenham o tabuleiro, criam jogadores, etc.

    document.getElementById("rollButton").addEventListener("click", function () {
    console.log("Botão clicado - iniciando rolagem do dado.");
    rolarDado(); // Isso já vai definir `diceValue` e desenhar

    // Após rolar o dado, aguarde um tempo e então permita a movimentação
    setTimeout(() => {
      console.log("Jogador pode mover peça com valor do dado:", diceValue);
      // Aqui você libera o clique no canvas ou chama algo como:
      // esperarCliqueDoJogador();
    }, 1000); // Tempo para a animação do dado terminar
  });
});