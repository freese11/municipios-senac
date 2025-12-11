const API = "http://127.0.0.1:3000/municipios";
let lastScrollTop = 0
let limite = 3;
let offset = 0;
const listagem = document.getElementById("listagem");
const btnCarregar = document.getElementById("btn");
<<<<<<< HEAD
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
=======

let todosDados = [];
let posicao = 0;
const LIMITE = 3;

// Carregar dados ao clicar
btnCarregar.addEventListener("click", carregarMunicipios);

// --------------------------------------------------
// BUSCAR TODOS
// --------------------------------------------------
async function carregarMunicipios() {
    try {
        const resposta = await fetch(API);
        todosDados = await resposta.json();

        listagem.innerHTML = "";
        posicao = 0;

        carregarMais();

>>>>>>> de752e372872691a3acb1f165ad939a16fc9b2a6
    } catch (erro) {
        console.error("Erro:", erro.message);
    }
}

<<<<<<< HEAD
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
=======
// --------------------------------------------------
// MOSTRAR MAIS 3
// --------------------------------------------------
function carregarMais() {
    const parte = todosDados.slice(posicao, posicao + LIMITE);
    parte.forEach(m => criarCard(m));
    posicao += LIMITE;
}

// --------------------------------------------------
// VOLTAR 3
// --------------------------------------------------
function carregarAnterior() {
    posicao = Math.max(0, posicao - LIMITE * 2);
    listagem.innerHTML = "";
    carregarMais();
}

// --------------------------------------------------
// CRIA CARD
// --------------------------------------------------
>>>>>>> de752e372872691a3acb1f165ad939a16fc9b2a6
function criarCard(m) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <h3>${m.nome} (${m.estado})</h3>
        <p>${m.caracteristica}</p>
<<<<<<< HEAD
        <button class="btn-delete" onclick="deletar(${m.id})">Deletar</button>
         <button class="btn-atualizar" onclick="abrirEdicao(${m.id}, '${m.nome}', '${m.estado}', '${m.caracteristica}')">Atualizar</button>
=======
        <button onclick="deletar(${m.id})">Excluir</button>
        <button onclick="abrirModal(${m.id})">Editar</button>
>>>>>>> de752e372872691a3acb1f165ad939a16fc9b2a6
    `;
    listagem.appendChild(card);
}

// --------------------------------------------------
// SCROLL GLOBAL
// --------------------------------------------------
window.addEventListener("scroll", () => {
    const top = window.scrollY;
    const alturaPagina = document.documentElement.scrollHeight;
    const alturaJanela = window.innerHeight;
    console.log("alturaPagina ", alturaPagina)
    console.log("alturaJanela ", alturaPagina)
    console.log( (top + alturaJanela >= alturaPagina - 5))

<<<<<<< HEAD
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
=======
    // Scroll para baixo → carregar mais
    if (top + alturaJanela >= alturaPagina - 5) {
        console.log("⬇ Rolou para BAIXO");
        carregarMais();
>>>>>>> de752e372872691a3acb1f165ad939a16fc9b2a6
    }

    // Scroll topo → voltar
    if (top === 0) {
        console.log("⬆ Rolou para CIMA");
        carregarAnterior();
    }
});

// --------------------------------------------------
// DELETAR
// --------------------------------------------------
async function deletar(id) {
    await fetch(API + "/" + id, { method: "DELETE" });
    carregarMunicipios();
}

<<<<<<< HEAD
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
=======
// --------------------------------------------------
// MODAL (Editar)
// --------------------------------------------------
async function abrirModal(id) {
    const resp = await fetch(API + "/" + id);
    const m = await resp.json();

    document.getElementById("editId").value = m.id;
    document.getElementById("editNome").value = m.nome;
    document.getElementById("editUF").value = m.estado;
    document.getElementById("editCaract").value = m.caracteristica;

    document.getElementById("modalEditar").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modalEditar").style.display = "none";
}

// --------------------------------------------------
// SALVAR ALTERAÇÃO
// --------------------------------------------------
document.getElementById("btnSalvarEdicao").addEventListener("click", async () => {

    const id = document.getElementById("editId").value;
    const nome = document.getElementById("editNome").value;
    const estado = document.getElementById("editUF").value;
    const caracteristica = document.getElementById("editCaract").value;

    const atualizado = { nome, estado, caracteristica };

    await fetch(API + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(atualizado)
    });

    fecharModal();
    carregarMunicipios();
});
>>>>>>> de752e372872691a3acb1f165ad939a16fc9b2a6
