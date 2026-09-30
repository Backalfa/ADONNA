let configs = null;

const CONFIG_FILE = "../configs/configs.txt";


// ========================================
// CARREGAR CONFIGURAÇÕES
// ========================================

async function carregarConfigs() {

    if (configs !== null) {
        return configs;
    }

    try {

        const resposta = await fetch(CONFIG_FILE);

        if (!resposta.ok) {
            throw new Error(
                `Erro ao carregar configs.txt: ${resposta.status}`
            );
        }

        const texto = await resposta.text();

        configs = JSON.parse(texto);

        console.log("Configurações carregadas:", configs);

        return configs;

    } catch (erro) {

        console.error(
            "Erro ao carregar configurações:",
            erro
        );

        return null;
    }
}


// ========================================
// OBTER CONFIGURAÇÃO
// ========================================

export async function obterConfig(caminho) {

    const dados = await carregarConfigs();

    if (!dados) {
        return null;
    }

    const partes = caminho.split(".");

    let valor = dados;

    for (const parte of partes) {

        if (valor === undefined || valor === null) {
            return null;
        }

        valor = valor[parte];
    }

    return valor;
}