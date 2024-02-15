/*
maneira antiga de fazer 
let titulo = document.querySelector('h1');
titulo.innerHTML = 'Jogo Adivinhe o Numero Secreto';

let paragrafo = document.querySelector('p');
paragrafo.innerHTML = 'Escolha o número entre 1 e 10';
*/
//Boa pratica para reaproveitar codigo.
let listaDeNumSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumAleatorio();
console.log(numeroSecreto);
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate:1.38});

}
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo Adivinhe o Numero Secreto');
    exibirTextoNaTela('p', 'Escolha o número entre 1 e 10');    
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Parabens você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;        
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto){
            exibirTextoNaTela('p', `Tente novamente, o número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `Tente novamente, o número secreto é maior ${chute}`);
        }
        tentativas++
    }

}

function gerarNumAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumSorteados = [];
    }

    if(listaDeNumSorteados.includes(numeroAleatorio)){
        return gerarNumAleatorio();
    } else{
        listaDeNumSorteados.push(numeroAleatorio);
        console.log(listaDeNumSorteados);
        return numeroAleatorio
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
    
}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);

}