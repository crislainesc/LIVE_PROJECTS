let seuVotoPara = document.querySelector('.tela-superior-titulo span');
let cargo = document.querySelector('.tela-superior-info span');
let descricao = document.querySelector('.tela-superior-descricao');
let aviso = document.querySelector('.tela-inferior');
let lateral = document.querySelector('.tela-superior-direita');
let numeros = document.querySelector('.tela-superior-numeros');
let painel = document.querySelector('.partidos');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarVotacao() {
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numeroHtml += '<div class="numero pisca"></div>';
        }
        else {
            numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let vice = '';
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero == numero) {
            return true
        } else {
            return false
        }
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        if (candidato.vice != undefined) {
            vice = candidato.vice;
        }
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}<br>${vice}`
        aviso.style.display = 'block';

        let fotosHtml = ``;

        for (let i in candidato.fotos) {
            if (candidato.fotos[i].pequena) {
                fotosHtml += `<div class="tela-superior-direita"><div class="tela-imagem imagem-menor"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div ></div>`;
            } else {
                fotosHtml += `<div class="tela-superior-direita"><div class="tela-imagem"><img src="img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div ></div>`;
            }

        }
        lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>'
    }

}

function clicou(n) {
    let elementoNumero = document.querySelector('.numero.pisca');
    if (elementoNumero !== null) {
        elementoNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elementoNumero.classList.remove('pisca');
        if (elementoNumero.nextElementSibling != null) {
            elementoNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function branco() {
    if (numero === '') {
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>'
    } else {
        alert("Para votar em BRANCO o campo de voto deve estar vazio.\nAperte CORRIGE para apagar o campo de voto.");
    }
}

function corrige() {
    comecarVotacao();
}

function confirma() {
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if (votoBranco == true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        })
    }

    if (votoConfirmado) {
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined) {
            comecarVotacao();
            mostrarPainel();
        } else {
            document.querySelector('.tela').innerHTML = '<div class= "aviso-gigante pisca"> FIM</div >';
            console.log(votos);
        }
    }
}

function mostrarCandidatos(partido) {
    let etapa = etapas[etapaAtual]
    let candidatos = etapa.candidatos;

    painel.innerHTML = `<div class="partidos titulo"><h1>${partido}</h1>${etapa.titulo}</div>`

    for (let i in candidatos) {
        if (candidatos[i].partido == partido) {
            if (etapa.titulo == 'VEREADOR') {
                painel.innerHTML += `
                <div class="partidos candidato">
                ${candidatos[i].nome}<br>${candidatos[i].numero}
                </div>
                <span class="partidos img">
                <img src="images/${candidatos[i].fotos[0].url}">
                </span>
                <span class="partidos botao">
                <button onclick="mostrarPainel()">x</button>
                </span>`
            } else if (etapa.titulo == 'PREFEITO') {
                painel.innerHTML += `
                <div class="partidos candidato">
                ${candidatos[i].nome}<br>${candidatos[i].numero}
                </div>
                <span class="partidos img">
                <img src="images/${candidatos[i].fotos[0].url}">
                </span>
                <div class="partidos candidato">
                ${candidatos[i].vice}
                </div>
                <span class="partidos img">
                <img src="images/${candidatos[i].fotos[1].url}">
                </span>
                <span class="partidos botao">
                <button onclick="mostrarPainel()">x</button>
                </span>`
            }
        }
    }
}

function mostrarPainel() {
    painel.innerHTML = `
    <div class="partidos">
        <div>
            <p>Para visualização dos candidatos, <strong>selecione um partido:</strong></p><hr>
            <nav>
                <a onclick="mostrarCandidatos('PEsp')">
                    <h3>91 PEsp</h3>
                    <h6>PARTIDO DOS ESPORTES</h6>
                </a>
                <a onclick="mostrarCandidatos('PMus')">
                    <h3>92 PMus</h3>
                    <h6>PARTIDO DOS RITMOS MUSICAIS</h6>
                </a>
                <a onclick="mostrarCandidatos('PProf')">
                    <h3>93 PProf</h3>
                    <h6>PARTIDO DAS PROFISSÕES</h6>
                </a>
                <a onclick="mostrarCandidatos('PFest')">
                    <h3>94 PFest</h3>
                    <h6>PARTIDO DAS FESTAS POPULARES</h6>
                </a>
            </nav>
        </div>
    </div>`
}

comecarVotacao();
mostrarPainel();