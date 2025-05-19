// Lê o arquivo palavras.txt usando FileReader (o usuário precisa selecionar o arquivo)
document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(event) {
    palavrasValidas = event.target.result
      .split("\n")
      .map(line => line.trim().toUpperCase())  // Converte todas as linhas para uppercase
      .filter(line => line !== "");            // Remove linhas vazias
    console.log("Palavras válidas carregadas:", palavrasValidas);
  };
  reader.readAsText(file);
  document.getElementById("fileInput").style.display = "none";

});


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