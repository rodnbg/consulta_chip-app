let dados = [];

let ultimaAtualizacao = "";

let totalRegistros = 0;

function carregarBase() {

    try {

        ultimaAtualizacao =
            BASE_CHIPS.ultimaAtualizacao;

        totalRegistros =
            BASE_CHIPS.totalRegistros;

        dados =
            BASE_CHIPS.registros;

        document.getElementById(
            "infoBase"
        ).innerHTML = `
            <b>Base atualizada em:</b>
            ${ultimaAtualizacao}
            <br>
            <b>Registros:</b>
            ${totalRegistros}
        `;

        console.log(
            `Base carregada: ${dados.length} registros`
        );

    } catch (erro) {

        console.error(
            "Erro ao carregar base:",
            erro
        );

        document.getElementById(
            "infoBase"
        ).innerHTML =
            "Erro ao carregar base.";

    }
}

function pesquisar() {

    const termo = document
        .getElementById("busca")
        .value
        .trim()
        .toUpperCase();

    const div =
        document.getElementById(
            "resultado"
        );

    if (!termo) {

        div.innerHTML =
            "<b>Digite um ICCID ou MSISDN.</b>";

        return;
    }

    const resultado = dados.find(item =>

        item.ICCID
            ?.toUpperCase()
            .includes(termo)

        ||

        item.MSISDN
            ?.toUpperCase()
            .includes(termo)

    );

    if (!resultado) {

        div.innerHTML =
            "<b>Registro não localizado.</b>";

        return;
    }

    div.innerHTML = `

        <b>ICCID</b><br>
        ${resultado.ICCID || ""}

        <br><br>

        <b>Status</b><br>
        ${resultado.SituacaoOperacional || ""}

        <br><br>

        <b>Última Comunicação</b><br>
        ${resultado.UltimaComunicacao || ""}

        <br><br>

        <b>Cidade / UF</b><br>
        ${resultado.Cidade || "-"} /
        ${resultado.UF || "-"}

    `;
}

document.addEventListener(
    "DOMContentLoaded",
    () => {

        carregarBase();

        document
            .getElementById("busca")
            .addEventListener(
                "keypress",
                function(event) {

                    if (
                        event.key === "Enter"
                    ) {

                        pesquisar();

                    }

                }
            );

    }
);