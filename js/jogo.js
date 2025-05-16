document.addEventListener("DOMContentLoaded", function () {
  // Declaração das variáveis globais
  let desempenho = 0;
  let tentativas = 0;
  let acertos = 0;
  let jogar = true;

  // Captura os botões pelos IDs e adiciona um evento de clique
  const btnReiniciar = document.getElementById("reiniciar");
  const btnJogarNovamente = document.getElementById("jogarnovamente");

  // Função que zera os valores das variáveis controladoras
  function reiniciar() {
    desempenho = 0;
    tentativas = 0;
    acertos = 0;
    jogar = true;
    jogarNovamente();
    atualizaPlacar(0, 0);
    // Mostra o botão "Jogar novamente" alterando a classe CSS
    btnJogarNovamente.className = "visivel";
    // Oculta o botão "Reiniciar" alterando a classe CSS
    btnReiniciar.className = "invisivel";
  }

  // Função "Jogar novamente"
  function jogarNovamente() {
    jogar = true;
    let divs = document.getElementsByTagName("div");
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].id == 0 || divs[i].id == 1 || divs[i].id == 2 || divs[i].id == 3) {
        divs[i].className = "inicial";

        let imagem = divs[i].querySelector("#imagem");
        if (imagem) imagem.remove();

        // Remover confetes, caso haja
        let confetes = divs[i].querySelectorAll('img[src="confetes.gif"]');
        confetes.forEach((c) => c.remove());
      }
    }
  }

  // Função que atualiza o placar
  function atualizaPlacar(acertos, tentativas) {
    desempenho = tentativas > 0 ? (acertos / tentativas) * 100 : 0;
    document.getElementById("resposta").innerHTML =
      "Placar - Acertos: " +
      acertos +
      " Tentativas: " +
      tentativas +
      " Desempenho: " +
      Math.round(desempenho) +
      "%";
  }

  // Função executada quando o jogador acertou
  function acertou(obj) {
    obj.className = "acertou";

    // Verifica se a imagem do ET já existe, caso contrário, cria a imagem
    if (!obj.querySelector("#imagem")) {
      const img = new Image(100);
      img.id = "imagem";
      img.src = "et.png"; // Ajuste o caminho da imagem do ET
      obj.appendChild(img);
    }

    // Verifica se o confete já foi adicionado à carta
    if (!obj.querySelector('img[src="confetes.gif"]')) {
      const confete = new Image();
      confete.src = "confetes.gif"; // Ajuste o caminho do confete
      confete.style.position = "absolute";
      confete.style.top = "0";
      confete.style.left = "0";
      confete.style.width = "100px";
      confete.style.pointerEvents = "none";
      obj.appendChild(confete);
    }
  }

  // Função que sorteia um número aleatório entre 0 e 3 e verifica se o jogador acertou
  window.verifica = function (obj) {
    if (jogar) {
      jogar = false;
      tentativas++;
      if (tentativas == 3) {
        btnJogarNovamente.className = "invisivel";
        btnReiniciar.className = "visivel";
      }

      let sorteado = Math.floor(Math.random() * 4);
      if (obj.id == sorteado) {
        acertou(obj);
        acertos++;
      } else {
        obj.className = "errou";
        const objSorteado = document.getElementById(sorteado);
        acertou(objSorteado);
      }

      atualizaPlacar(acertos, tentativas);
    } else {
      alert('Clique em "Jogar novamente"');
    }
  };

  // Adiciona eventos aos botões
  btnJogarNovamente.addEventListener("click", reiniciar);
  btnReiniciar.addEventListener("click", reiniciar);

  // Inicializa o placar ao carregar
  atualizaPlacar(0, 0);
});