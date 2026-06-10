const celulas = document.querySelectorAll('.celula');
const mensagem = document.getElementById('mensagem');
const botaoReiniciar = document.getElementById('reiniciar');

let jogadorAtual = 'X';
let estadoJogo = ["", "", "", "", "", "", "", "", ""];
let jogoAtivo = true;

// Definição das posições de vitória
const condicoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

function lidarComClique(evento) {
    const celulaClicada = evento.target;
    const indiceCelula = parseInt(celulaClicada.getAttribute('data-index'));

    if (estadoJogo[indiceCelula] !== "" || !jogoAtivo) {
        return;
    }

    estadoJogo[indiceCelula] = jogadorAtual;
    celulaClicada.classList.add(jogadorAtual.toLowerCase());

    // Insere a imagem correspondente à espada do jogador da vez
    if (jogadorAtual === 'X') {
        celulaClicada.innerHTML = `<img src="img/meliodas_espada-removebg-preview.png" alt="X">`;
    } else {
        celulaClicada.innerHTML = `<img src="img/espadaaa.png" alt="O">`;
    }

    verificarVencedor();
}

function verificarVencedor() {
    let vencedor = false;

    for (let i = 0; i < condicoesVitoria.length; i++) {
        const condicao = condicoesVitoria[i];
        let a = estadoJogo[condicao[0]];
        let b = estadoJogo[condicao[1]];
        let c = estadoJogo[condicao[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            vencedor = true;
            break;
        }
    }

    if (vencedor) {
        mensagem.innerText = `Jogador ${jogadorAtual} Venceu!`;
        jogoAtivo = false;
        return;
    }

    let empate = !estadoJogo.includes("");
    if (empate) {
        mensagem.innerText = "Empate!";
        jogoAtivo = false;
        return;
    }

    // Alterna o turno e atualiza o visual dos perfis
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    mensagem.innerText = `Vez do Jogador ${jogadorAtual}`;

    if (jogadorAtual === "X") {
        document.getElementById('perfil-x').style.opacity = '1';
        document.getElementById('perfil-o').style.opacity = '0.5';
    } else {
        document.getElementById('perfil-x').style.opacity = '0.5';
        document.getElementById('perfil-o').style.opacity = '1';
    }
}

function reiniciarJogo() {
    jogoAtivo = true;
    jogadorAtual = "X";
    estadoJogo = ["", "", "", "", "", "", "", "", ""];
    mensagem.innerText = `Vez do Jogador X`;

    celulas.forEach(celula => {
        celula.innerHTML = "";
        celula.classList.remove('x', 'o');
    });

    document.getElementById('perfil-x').style.opacity = '1';
    document.getElementById('perfil-o').style.opacity = '0.5';
}

celulas.forEach(celula => celula.addEventListener('click', lidarComClique));
botaoReiniciar.addEventListener('click', reiniciarJogo);