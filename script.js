const html= document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt  = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const pausarComecarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
const musicaFoco  = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const iniciarSom = new Audio('/sons/play.wav');
const pausaSom = new Audio('/sons/pause.mp3');
const finalizadoSom = new Audio('/sons/beep.mp3');
const pauseImg = document.querySelector('.app__card-primary-butto-icon');
musica.loop = true

let intervaloId = null
let tempoDecorrido = 1500;



startPauseBt.addEventListener('click', iniciarEPausar);

musicaFoco.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    } else {
         musica.pause()
    }
})

focoBt.addEventListener('click', () => {
    tempoDecorrido = 1500;
    alterarAtributo('foco');
    focoBt.classList.add('active');
    
})

curtoBt.addEventListener('click', () => {
    tempoDecorrido = 300;
    alterarAtributo('descanso-curto');
    curtoBt.classList.add('active');
})
longoBt.addEventListener('click', () => {
    tempoDecorrido = 900;
    alterarAtributo('descanso-longo');
    longoBt.classList.add('active');
})


function alterarAtributo(contexto){
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    if (contexto == 'foco'){
        titulo.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`
        
    } else if (contexto == 'descanso-curto') {
                titulo.innerHTML = `Que tal dar uma respirada?,<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                
        } else if (contexto == 'descanso-longo'){
                titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                
                }
} 

const contagemRegressiva  = () =>{
    if(tempoDecorrido <= 0){
        finalizadoSom.play();
        alert('tempo finalizado');
        zerar();
        return;
    }
    tempoDecorrido -= 1;
    mostrarTempo()
}
        
function iniciarEPausar() {
    if (intervaloId){
        pausaSom.play();
        zerar();
        return;
    }
    iniciarSom.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    pausarComecarBt.textContent = "Pausar";
    pauseImg.setAttribute('src', '/imagens/pause.png');
    
} 

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    pausarComecarBt.textContent = "Começar";
    pauseImg.setAttribute('src', '/imagens/play_arrow.png');
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br',{minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`

}

mostrarTempo()