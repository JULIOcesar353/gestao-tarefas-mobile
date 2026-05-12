import { get, post, patch, deleteRequest } from "./api";

/**
 * Obtém a lista de tarefas da API
 * @returns {Promise<{sucesso: boolean, dados: Array, mensagem: string}>}
 */
export async function getTarefas() {
  try {
    const tarefas = await get("/tarefas");
    return tarefas;
  } catch (error) {
    console.error("Erro ao obter tarefas:", error);
    throw error;
  }
}

/**
 * Cria uma nova tarefa
 * @param {Object} tarefaData - Dados da tarefa
 * @returns {Promise<Object>}
 */
export async function criarTarefa(tarefaData) {
  try {
    const response = await post("/tarefas", tarefaData);
    return response;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
}

/**
 * Aceita uma tarefa (PATCH com status = 1)
 * @param {number|string} id - ID da tarefa
 * @returns {Promise<Object>}
 */
/**
 * Aceita uma tarefa (POST /tarefas/:id/aceitar)
 * Novo endpoint dedicado para aceitar tarefa
 * @param {number|string} id - ID da tarefa
 * @param {number|string} funcionarioId - ID do funcionário que aceita
 * @returns {Promise<Object>}
 */
export async function aceitarTarefa(id, funcionarioId = 1) {
  try {
    console.log("🟡 Iniciando aceitarTarefa com ID:", id);
    console.log("👤 Funcionário ID:", funcionarioId);

    const dadosPagamento = {
      funcionario_id: funcionarioId,
    };

    console.log("📤 Enviando dados:", JSON.stringify(dadosPagamento));

    const response = await post(`/tarefas/${id}/aceitar`, dadosPagamento);

    console.log("✅ Resposta recebida:", JSON.stringify(response));
    return response;
  } catch (error) {
    console.error("❌ Erro ao aceitar tarefa:", error);
    console.error("📋 Detalhes do erro:", error.message);
    throw error;
  }
}

/**
 * Edita uma tarefa existente
 * @param {number|string} id - ID da tarefa
 * @param {Object} dados - Dados a atualizar
 * @returns {Promise<Object>}
 */
export async function editarTarefa(id, dados) {
  try {
    const response = await patch(`/tarefas/${id}`, dados);
    return response;
  } catch (error) {
    console.error("Erro ao editar tarefa:", error);
    throw error;
  }
}

/**
 * Deleta uma tarefa
 * @param {number|string} id - ID da tarefa
 * @returns {Promise<Object>}
 */
export async function deletarTarefa(id) {
  try {
    const response = await deleteRequest(`/tarefas/${id}`);
    return response;
  } catch (error) {
    console.error("Erro ao deletar tarefa:", error);
    throw error;
  }
}

/**
 * Formata prioridade numérica para texto
 * @param {number} prioridade - 1, 2 ou 3
 * @returns {string}
 */
export function formatarPrioridade(prioridade) {
  switch (prioridade) {
    case 3:
      return "Alta";
    case 2:
      return "Média";
    case 1:
    default:
      return "Baixa";
  }
}

/**
 * Obtém a cor da prioridade
 * @param {string} prioridade - "Alta", "Média" ou "Baixa"
 * @returns {string}
 */
export function getCorPrioridade(prioridade) {
  switch (prioridade) {
    case "Alta":
      return "#EF4444";
    case "Média":
      return "#F59E0B";
    case "Baixa":
      return "#22C55E";
    default:
      return "#22C55E";
  }
}

/**
 * Mapeia dados da API para o formato do front
 * @param {Array} dados - Array com dados das tarefas da API
 * @returns {Array}
 */
export function mapearTarefas(dados) {
  if (!Array.isArray(dados)) {
    return [];
  }

  return dados.map((t) => ({
    id: t.tar_id,
    titulo: t.tar_titulo || "",
    descricao: t.tar_descricao || "",
    prioridade: formatarPrioridade(t.tar_prioridade),
    prioridadeNumero: t.tar_prioridade,
    criadoEm: new Date(t.tar_data_criacao),
    setor: String(t.tar_setor_id),
    corredor: t.atr_funcionario_id
      ? `Funcionário ${t.atr_funcionario_id}`
      : "-",
    tempo: `${t.tar_estimativa_minutos || 0} min`,
    status: t.atr_status,
    funcionarioId: t.atr_funcionario_id,
    estimativaMinutos: t.tar_estimativa_minutos,
    dataOriginal: t,
  }));
}
