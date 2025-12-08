const API = "http://127.0.0.1:3000/municipios";

const listagem = document.getElementById("listagem");
const btnCarregar = document.getElementById("btn");
const btnSalvar = document.getElementById("btnSalvar");
const btnSalvarEdicao = document.getElementById("btnSalvarEdicao");

// Eventos
btnCarregar.addEventListener("click", carregarMunicipios);
btnSalvar.addEventListener("click", inserirMunicipio);
btnSalvarEdicao.addEventListener("click", salvarEdicao);
//--------------------------------------------------
// LISTAR MUNICÍPIOS
//--------------------------------------------------
async function carregarMunicipios() {
    try {
        const resposta = await fetch(API);
        const dados = await resposta.json();

        listagem.innerHTML = ""; // limpa

        dados.forEach(m => criarCard(m));

    } catch (erro) {
        console.error("Erro ao carregar:", erro.message);
    }
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
        <button onclick="abrirModal(${m.id})">Editar</button>

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
    alert("vou deletar");
    try {
        const resposta = await fetch(API + "/" + id, {
            method: "DELETE"
        });

        carregarMunicipios();
    }
    catch (errr) {
        console.error("Erro ao DELETAR:", erro.message);
    }
}

async function abrirModal(id) {
    try {
        // 1. Buscar município pelo ID
        const resposta = await fetch(API + "/" + id);
        const municipio = await resposta.json();
        console.log("Municipio carregado:", municipio);

        // 2. Preencher os campos do modal
        document.getElementById("editId").value = municipio.id;
        document.getElementById("editNome").value = municipio.nome;
        document.getElementById("editUF").value = municipio.estado;
        document.getElementById("editCaract").value = municipio.caracteristica;

        // 3. Exibir o modal
        document.getElementById("modalEditar").style.display = "block";

    } catch (erro) {
        console.error("Erro ao buscar município:", erro.message);
        alert("Erro ao carregar dados para edição.");
    }
}

// FECHAR MODAL
//--------------------------------------------------
function fecharModal() {
    document.getElementById("modalEditar").style.display = "none";
}

//--------------------------------------------------
// SALVAR ALTERAÇÃO (PUT)
//--------------------------------------------------
async function salvarEdicao() {

    const id = document.getElementById("editId").value;
    const nome = document.getElementById("editNome").value;
    const estado = document.getElementById("editUF").value;
    const caracteristica = document.getElementById("editCaract").value;

    const atualizado = { nome, estado, caracteristica };

    try {
        const resposta = await fetch(API + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(atualizado)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar!");
        }

        fecharModal();
        carregarMunicipios();

    } catch (erro) {
        console.error("Erro ao editar:", erro.message);
    }
}