const faixa = document.querySelector('.faixa-carrossel');
const imagens = Array.from(document.querySelectorAll('.carrossel img'));
const botaoAnterior = document.getElementById('anterior');
const botaoProximo = document.getElementById('proximo');
const fundo = document.body;

let indiceAtual = 1;

const primeiraCopia = imagens[0].cloneNode(true);
const ultimaCopia = imagens[imagens.length - 1].cloneNode(true);

faixa.appendChild(primeiraCopia);
faixa.insertBefore(ultimaCopia, imagens[0]);

const todasImagens = Array.from(document.querySelectorAll('.carrossel img'));

const coresFundo = [
    '#1a1a1a',
    '#ff5733',
    '#c70039',
    '#900c3f',
    '#581845',
    '#34495e',
    '#2ecc71',
    '#3498db'
];

const dadosFilmes = [
    {
        titulo: "Alien",
        descricao: "A tripulação da nave Nostromo enfrenta um alienígena mortal após investigar um sinal desconhecido em um planeta distante."
    },
    {
        titulo: "Em Ritmo de Fuga (Baby Driver)",
        descricao: "Baby, um jovem motorista talentoso, tenta abandonar sua vida criminosa ao se apaixonar, mas enfrenta desafios perigosos."
    },
    {
        titulo: "Corra!",
        descricao: "Chris, um jovem negro, descobre segredos perturbadores ao visitar a família de sua namorada branca."
    },
    {
        titulo: "O Fantasma da Ópera",
        descricao: "Um gênio musical desfigurado assombra a Ópera de Paris enquanto se apaixona por uma jovem cantora."
    },
    {
        titulo: "A Forma da Água",
        descricao: "Elisa, uma zeladora muda, forma um vínculo único com uma criatura aquática mantida em cativeiro em um laboratório secreto."
    },
    {
        titulo: "Metalhead",
        descricao: "Uma jovem encontra consolo no heavy metal após uma tragédia familiar em uma pequena cidade islandesa."
    },
    {
        titulo: "A Grande Beleza",
        descricao: "Jep Gambardella, um escritor e jornalista, reflete sobre sua vida e a beleza de Roma após seu aniversário de 65 anos."
    },
    {
        titulo: "Star Wars",
        descricao: "Luke Skywalker embarca em uma jornada épica para salvar a galáxia do Império Galáctico e descobrir seu destino como Jedi."
    }
];

function atualizarCarrossel() {
    const largura = todasImagens[0].clientWidth;
    faixa.style.transform = `translateX(-${indiceAtual * largura}px)`;
}

function atualizarFundoComGradiente() {
    const imagemAtual = todasImagens[indiceAtual];
    const imagemTemp = new Image();
    imagemTemp.src = imagemAtual.src;

    imagemTemp.onload = () => {
        const canvas = document.createElement('canvas');
        const contexto = canvas.getContext('2d');
        canvas.width = imagemTemp.width;
        canvas.height = imagemTemp.height;
        contexto.drawImage(imagemTemp, 0, 0);

        const cima = contexto.getImageData(canvas.width / 2, canvas.height * 0.1, 1, 1).data;
        const meio = contexto.getImageData(canvas.width / 2, canvas.height * 0.5, 1, 1).data;
        const baixo = contexto.getImageData(canvas.width / 2, canvas.height * 0.9, 1, 1).data;

        fundo.style.transition = 'background 0.5s ease-in-out';
        fundo.style.background = `linear-gradient(rgb(${cima[0]},${cima[1]},${cima[2]}), rgb(${meio[0]},${meio[1]},${meio[2]}), rgb(${baixo[0]},${baixo[1]},${baixo[2]}))`;
    };
}

function atualizarInfoFilme() {
    const filme = dadosFilmes[indiceAtual - 1];
    const tituloElemento = document.getElementById('titulo-filme');
    const descricaoElemento = document.getElementById('resumo-filme');

    if (filme) {
        tituloElemento.textContent = filme.titulo;
        descricaoElemento.textContent = filme.descricao;
    }
}

function proximoFilme() {
    indiceAtual++;
    faixa.style.transition = 'transform 0.5s ease-in-out';
    atualizarCarrossel();
    atualizarFundoComGradiente();
    atualizarInfoFilme();

    if (indiceAtual === todasImagens.length - 1) {
        setTimeout(() => {
            faixa.style.transition = 'none';
            indiceAtual = 1;
            atualizarCarrossel();
            atualizarFundoComGradiente();
            atualizarInfoFilme();
        }, 500);
    }
}

function filmeAnterior() {
    indiceAtual--;
    faixa.style.transition = 'transform 0.5s ease-in-out';
    atualizarCarrossel();
    atualizarFundoComGradiente();
    atualizarInfoFilme();

    if (indiceAtual === 0) {
        setTimeout(() => {
            faixa.style.transition = 'none';
            indiceAtual = todasImagens.length - 2;
            atualizarCarrossel();
            atualizarFundoComGradiente();
            atualizarInfoFilme();
        }, 500);
    }
}

botaoProximo.addEventListener('click', proximoFilme);
botaoAnterior.addEventListener('click', filmeAnterior);
window.addEventListener('resize', atualizarCarrossel);
window.addEventListener('load', () => {
    atualizarCarrossel();
    atualizarFundoComGradiente();
    atualizarInfoFilme();
});
