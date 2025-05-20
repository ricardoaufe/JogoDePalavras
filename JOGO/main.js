document.getElementById('fileInput').addEventListener('change', function(e) { //lê o arquivo de escolha (é necessário escolher por conta de segurança)
  const file = e.target.files[0]; // somente o primeiro arquivo, já que o input type = "file" permite varios arquivos
  if (!file) return; // caso o arquivo não seja selecionado, o valor será nulo
  
  const reader = new FileReader();
  reader.onload = function(event) {
    palavrasValidas = event.target.result
      .split("\n")
      .map(line => line.trim().toUpperCase())  // converte todas as linhas para uppercase
      .filter(line => line !== "");            // remove linhas vazias
    console.log("Palavras válidas carregadas:", palavrasValidas);
  };
  reader.readAsText(file);
  document.getElementById("fileInput").style.display = "none";

});



document.getElementById("iniciarJogo").addEventListener("click", function() { // o botão 'jogar' mostra as dificuldades

  this.style.display = "none"; // oculta o botão jogar após clique

  document.getElementById("modoJogo").style.display = "flex";
  document.getElementById("modoJogo").style.justifyContent = "center";
  document.getElementById("modoJogo").style.flexDirection = "row";

});

// eventos para os botões de dificuldade
document.getElementById("facil").addEventListener("click", function() {
  startGame("facil");
});
document.getElementById("medio").addEventListener("click", function() {
  startGame("medio");
});
document.getElementById("dificil").addEventListener("click", function() {
  startGame("dificil");
});