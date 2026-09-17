// ===============================
// ELEMENTOS DA PÁGINA
// ===============================

const html = document.querySelector("html");

const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");

const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");

const botoes = document.querySelectorAll(".app__card-button");

const timer = document.querySelector("#timer");

const startPauseBt = document.querySelector("#start-pause");

const buttonText = document.querySelector("#button-text");
const buttonIcon = document.querySelector("#button-icon");

const musicaFocoInput = document.querySelector("#alternar-musica");


// ===============================
// ÁUDIOS
// ===============================

const musica = new Audio("./sons/Rain Down.mp4");
const audioPlay = new Audio("./sons/play.wav");
const audioPausa = new Audio("./sons/pause.mp3");
const audioTempoFinalizado = new Audio("./sons/beep.mp3");

musica.loop = true;


// ===============================
// CONFIGURAÇÃO DOS TEMPOS
// ===============================

const tempos = {
    foco: 30 * 60,
    "descanso-curto": 5 * 60,
    "descanso-longo": 15 * 60
};


// ===============================
// VARIÁVEIS
// ===============================

let tempoDecorridoEmSegundos = tempos.foco;

let intervaloId = null;

let contextoAtual = "foco";


// ===============================
// MOSTRAR TEMPO NA TELA
// ===============================

function mostrarTempo() {

    const minutos = Math.floor(
        tempoDecorridoEmSegundos / 60
    );

    const segundos =
        tempoDecorridoEmSegundos % 60;

    timer.textContent =
        `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
}


// ===============================
// MÚSICA
// ===============================

musicaFocoInput.addEventListener("change", () => {

    if (musicaFocoInput.checked) {

        musica.play();

    } else {

        musica.pause();
        musica.currentTime = 0;

    }

});


// ===============================
// BOTÃO FOCO
// ===============================

focoBt.addEventListener("click", () => {

    alterarContexto("foco");

});


// ===============================
// BOTÃO DESCANSO CURTO
// ===============================

curtoBt.addEventListener("click", () => {

    alterarContexto("descanso-curto");

});


// ===============================
// BOTÃO DESCANSO LONGO
// ===============================

longoBt.addEventListener("click", () => {

    alterarContexto("descanso-longo");

});


// ===============================
// ALTERAR CONTEXTO
// ===============================

function alterarContexto(contexto) {

    // Para o timer atual
    pararTemporizador();

    // Guarda o contexto
    contextoAtual = contexto;

    // Remove a classe active dos botões
    botoes.forEach((botao) => {

        botao.classList.remove("active");

    });


    // Adiciona active ao botão escolhido
    const botaoSelecionado =
        document.querySelector(
            `[data-contexto="${contexto}"]`
        );

    botaoSelecionado.classList.add("active");


    // Altera o fundo
    html.setAttribute(
        "data-contexto",
        contexto
    );


    // Altera a imagem
    banner.src =
        `./imagens/${contexto}.png`;


    // Define o tempo
    tempoDecorridoEmSegundos =
        tempos[contexto];


    // Altera o título
    switch (contexto) {

        case "foco":

            titulo.innerHTML = `
                Otimize sua produtividade,
                <br>

                <strong class="app__title-strong">
                    mergulhe no que importa.
                </strong>
            `;

            break;


        case "descanso-curto":

            titulo.innerHTML = `
                Que tal dar uma respirada?
                <br>

                <strong class="app__title-strong">
                    Faça uma pausa curta!
                </strong>
            `;

            break;


        case "descanso-longo":

            titulo.innerHTML = `
                Hora de voltar à superfície.
                <br>

                <strong class="app__title-strong">
                    Faça uma pausa longa.
                </strong>
            `;

            break;

    }


    // Volta o botão para Começar
    buttonText.textContent = "Começar";
    buttonIcon.textContent = "▶";


    // Atualiza o timer
    mostrarTempo();

}


// ===============================
// CONTAGEM REGRESSIVA
// ===============================

function contagemRegressiva() {

    if (tempoDecorridoEmSegundos <= 0) {

        audioTempoFinalizado.play();

        pararTemporizador();

        alert("⏰ Tempo finalizado!");

        buttonText.textContent = "Começar";
        buttonIcon.textContent = "▶";

        tempoDecorridoEmSegundos =
            tempos[contextoAtual];

        mostrarTempo();

        return;

    }


    tempoDecorridoEmSegundos--;

    mostrarTempo();

}


// ===============================
// BOTÃO COMEÇAR / PAUSAR
// ===============================

startPauseBt.addEventListener(
    "click",
    iniciarOuPausar
);


function iniciarOuPausar() {

    // Se já estiver rodando, pausa
    if (intervaloId !== null) {

        audioPausa.play();

        pararTemporizador();

        buttonText.textContent = "Continuar";
        buttonIcon.textContent = "▶";

        return;

    }


    // Se não estiver rodando, começa
    audioPlay.play();

    intervaloId =
        setInterval(contagemRegressiva, 1000);

    buttonText.textContent = "Pausar";
    buttonIcon.textContent = "⏸";

}


// ===============================
// PARAR TEMPORIZADOR
// ===============================

function pararTemporizador() {

    if (intervaloId !== null) {

        clearInterval(intervaloId);

        intervaloId = null;

    }

}


// ===============================
// INICIALIZAÇÃO
// ===============================

mostrarTempo();