const API = "http://127.0.0.1:3000/municipios";
let lastScrollTop = 0
let limite = 3;
let offset = 0;
const listagem = document.getElementById("listagem");
const btnCarregar = document.getElementById("btn");
const btnSalvar = document.getElementById("btnSalvar");
const btnAtualizar = document.getElementById("btnAtualizar");
const btnCancelar = document.getElementById("btnCancelar");
const btnOffset = document.getElementById("btnOffset");
const btnMenos = document.getElementById("btnMenos");

btnOffset.addEventListener("click", () => {
    carregarmaisMunicipios();
});
btnMenos.addEventListener("click", () => {
    carregarmenosMunicipios();
});

window.addEventListener("scroll", async () => {
    let scrollTop = window.pageYOffset;

    console.log("scrolleeeiiiiii");

    if (scrollTop > lastScrollTop) { carregarmaisMunicipios();
        console.log("Rolei para baixo!!!")

    }else{
        carregarmaisMunicipios();
        console.log("Rolei para cima!!!")
    }

    lastScrollTop = lastScrollTop
    
});

btnCarregar.addEventListener("click", carregarMunicipios);
btnSalvar.addEventListener("click", inserirMunicipio);
btnAtualizar.addEventListener("click", atualizarMunicipio);
btnCancelar.addEventListener("click", cancelarEdicao);

//--------------------------------------------------
// LISTAR MUNICÍPIOS
//--------------------------------------------------

async function miolo() {
    try {
        const resposta = await fetch(API + `?limit=${limite}&offset=${offset}`);
        const dados = await resposta.json();
        listagem.innerHTML = ""; // limpa
        dados.forEach(m => criarCard(m));
    } catch (erro) {
        console.error("Erro ao carregar:", erro.message);
    }
}

async function carregarMunicipios() {
    offset = 0;
    limite = 3;
    miolo();
}
async function carregarmaisMunicipios() {
    offset += limite;
    miolo();
}
async function carregarmenosMunicipios() {
    offset -= limite;
   miolo();
}
//--------------------------------------------------
// CRIAR CARD NO FRONT
//--------------------------------------------------
function criarCard(m) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${m.nome} (${m.estado})</h3>
        <p>${m.caracteristica}</p>
        <button class="btn-delete" onclick="deletar(${m.id})">Deletar</button>
         <button class="btn-atualizar" onclick="abrirEdicao(${m.id}, '${m.nome}', '${m.estado}', '${m.caracteristica}')">Atualizar</button>
    `;
    listagem.appendChild(card);
}

//--------------------------------------------------
// INSERIR MUNICÍPIO (POST)
//--------------------------------------------------
async function inserirMunicipio() {
    const nome = document.getElementById("campoMunicipio").value;
    const estado = document.getElementById("campoUF").value;
    const caracteristica = document.getElementById("campoCaracteristica").value;

    const novoMunicipio = { nome, estado, caracteristica };

    try {
        const resposta = await fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoMunicipio),
        });

        if (!resposta.ok) {
            throw new Error("Erro ao inserir!");
        }
        carregarMunicipios();

    } catch (erro) {
        console.error("Erro ao inserir:", erro.message);
    }
}

async function deletar(id) {
    try {
        const resposta = await fetch(`http://127.0.0.1:3000/municipios/${id}`, {
            method: "DELETE"
        });
        if (!resposta.ok) {
            throw new Error("Erro ao deletar!");
        }
        carregarMunicipios();

    } catch (erro) {
        console.error("Erro ao deletar:", erro.message);
    }
}

function abrirEdicao(id, nome, estado, caracteristica) {
    document.getElementById("campoID").value = id;
    document.getElementById("campoMunicipio").value = nome;
    document.getElementById("campoUF").value = estado;
    document.getElementById("campoCaracteristica").value = caracteristica;
    btnSalvar.style.display = "none";
    btnAtualizar.style.display = "inline-block";
    btnCancelar.style.display = "inline-block";
}

async function atualizarMunicipio() {
    const id = document.getElementById("campoID").value;
    const nome = document.getElementById("campoMunicipio").value;
    const estado = document.getElementById("campoUF").value;
    const caracteristica = document.getElementById("campoCaracteristica").value;
    const municipioAtualizado = { nome, estado, caracteristica };

    try {
        const resposta = await fetch(`http://127.0.0.1:3000/municipios/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(municipioAtualizado),
        });
        if (!resposta.ok) {
            throw new Error("Erro ao atualizar!");
        }
        carregarMunicipios();
        limparFormulario();
    } catch (erro) {
        console.error("Erro ao atualizar:", erro.message);
    }
}

function limparFormulario() {
    document.getElementById("campoID").value = "";
    document.getElementById("campoMunicipio").value = "";
    document.getElementById("campoUF").value = "";
    document.getElementById("campoCaracteristica").value = "";

    btnSalvar.style.display = "inline-block";
    btnAtualizar.style.display = "none";
    btnCancelar.style.display = "none";

}

function cancelarEdicao() {
    limparFormulario();
}