import { get, post, patch, deleteRequest } from "./api";
import { getCurrentUserId } from "./authService";

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
 * Obtém as tarefas aceitas pela API
 * @param {number|string|null} funcionarioId - ID do funcionário para filtrar tarefas aceitas
 * @returns {Promise<Object>}
 */
export async function getTarefasAceitas(funcionarioId = null) {
  try {
    if (funcionarioId == null) {
      funcionarioId = await getCurrentUserId();
    }

    const response = await get("/tarefas");
    const lista = Array.isArray(response.dados) ? response.dados : [];
    const tarefasAceitas = lista.filter(
      (t) =>
        t.atr_status === 1 &&
        (funcionarioId == null || t.atr_funcionario_id == funcionarioId),
    );
    return { ...response, dados: tarefasAceitas };
  } catch (error) {
    console.error("Erro ao obter tarefas aceitas:", error);
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
export async function aceitarTarefa(id, funcionarioId = null) {
  try {
    if (funcionarioId == null) {
      funcionarioId = await getCurrentUserId();
    }
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

export async function concluirTarefa(id, originalData = null) {
  try {
    // Se não recebeu os dados originais, tenta obter do endpoint de tarefa única
    if (!originalData) {
      try {
        const single = await get(`/tarefas/${id}`);
        // backend pode devolver no .dados ou direto
        originalData = single?.dados || single?.data || single;
      } catch (e) {
        // se falhar, segue em frente e o payload pode ficar com valores nulos
        console.warn("Não foi possível obter dados originais da tarefa:", e);
      }
    }

    const createdByIdRaw =
      originalData?.tar_criado_por ??
      originalData?.tar_criado_por_id ??
      originalData?.criadoPor ??
      originalData?.usu_id ??
      originalData?.usuId ??
      originalData?.atr_funcionario_id ??
      null;

    const setorIdRaw =
      originalData?.tar_setor_id ??
      originalData?.setorId ??
      originalData?.setor ??
      null;

    const prioridadeRaw =
      originalData?.tar_prioridade ??
      originalData?.prioridadeId ??
      originalData?.prioridade ??
      null;

    const payload = {
      // backend espera 'status' no body para atualizar a atribuição
      status: 2,
      setorId: setorIdRaw != null ? Number(setorIdRaw) : null,
      criadoPor: createdByIdRaw != null ? Number(createdByIdRaw) : null,
      titulo: originalData?.tar_titulo ?? originalData?.titulo ?? "",
      descricao: originalData?.tar_descricao ?? originalData?.descricao ?? "",
      prioridade: prioridadeRaw != null ? Number(prioridadeRaw) : null,
      estimativaMinutos:
        originalData?.tar_estimativa_minutos ??
        originalData?.estimativaMinutos ??
        0,
    };

    // Remover chaves nulas para não poluir o corpo, mas backend exige alguns campos — prefer enviar valores existentes
    const cleaned = Object.keys(payload).reduce((acc, k) => {
      if (payload[k] !== null && payload[k] !== undefined) acc[k] = payload[k];
      return acc;
    }, {});

    const response = await patch(`/tarefas/${id}`, cleaned);
    return response;
  } catch (error) {
    console.error("Erro ao concluir tarefa:", error);
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
  // Deduplicar tarefas retornadas pela API (quando há múltiplas linhas por tarefa
  // devido a várias atribuições). Mantemos a linha com maior 'atr_status'
  // (null/0 < 1 < 2) para refletir o estado mais atual.
  const mapa = new Map();

  dados.forEach((t) => {
    const id = t.tar_id;
    const existing = mapa.get(id);
    const currStatus =
      t.atr_status === null || t.atr_status === undefined
        ? -1
        : Number(t.atr_status);

    const existingStatus = existing
      ? existing.atr_status === null || existing.atr_status === undefined
        ? -1
        : Number(existing.atr_status)
      : -2;

    if (!existing || currStatus > existingStatus) {
      mapa.set(id, t);
    }
  });

  const unique = Array.from(mapa.values());

  return unique.map((t) => ({
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
