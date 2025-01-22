let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecrto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.3; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1','Jogo do número secreto');
    exibirTextoNaTela('p','Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

function verificarChute(){
    let chute = parseInt(document.querySelector('input').value); 
    console.log(chute === numeroSecrto);

    if(chute === numeroSecrto){
        let textoTentativas = tentativas > 1? 'tentativas' : 'tentativa';
        let meensagensDeTentativas = `Voce descobriu o número secreto com ${tentativas} ${textoTentativas}`;
        exibirTextoNaTela('h1','você acertou!');
        exibirTextoNaTela('p', meensagensDeTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if(chute > numeroSecrto){
            exibirTextoNaTela('p','O número secreto é menor!');
        }else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio(){
   let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

   if(quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumeroSorteados = [];
   }

   if (listaDeNumeroSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   } else {
    listaDeNumeroSorteados.push(numeroEscolhido);
    console.log(listaDeNumeroSorteados);
    return  numeroEscolhido;

   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecrto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    limparCampo();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

