/**
 * NOVO ENDPOINT PARA ACEITAR TAREFA
 * 
 * Adicione este método ao seu TarefasController
 * e adicione esta rota ao router:
 * 
 * router.post("/tarefas/:id/aceitar", TarefasController.aceitarTarefa);
 */

async aceitarTarefa(request, response) {
  try {
    const { id } = request.params;
    const { funcionario_id } = request.body;

    if (!funcionario_id) {
      return response.status(400).json({
        sucesso: false,
        mensagem: "ID do funcionário é obrigatório",
        dados: null,
      });
    }

    // Verificar se a tarefa existe
    const sqlVerificaTarefa = `
      SELECT tar_id FROM tarefas WHERE tar_id = ?
    `;
    const [tarefa] = await db.query(sqlVerificaTarefa, [id]);

    if (tarefa.length === 0) {
      return response.status(404).json({
        sucesso: false,
        mensagem: `Tarefa ${id} não encontrada`,
        dados: null,
      });
    }

    // Verificar se já existe uma atribuição
    const sqlVerificaAtribuicao = `
      SELECT atr_id FROM atribuicao_tarefas WHERE atr_tarefa_id = ?
    `;
    const [atribuicaoExistente] = await db.query(sqlVerificaAtribuicao, [id]);

    let sqlAtribuicao;
    let valuesAtribuicao;

    if (atribuicaoExistente.length > 0) {
      // Atualizar atribuição existente
      sqlAtribuicao = `
        UPDATE atribuicao_tarefas 
        SET atr_status = 1, atr_funcionario_id = ?
        WHERE atr_tarefa_id = ?
      `;
      valuesAtribuicao = [funcionario_id, id];
    } else {
      // Criar nova atribuição
      sqlAtribuicao = `
        INSERT INTO atribuicao_tarefas (atr_tarefa_id, atr_status, atr_funcionario_id)
        VALUES (?, 1, ?)
      `;
      valuesAtribuicao = [id, funcionario_id];
    }

    const [result] = await db.query(sqlAtribuicao, valuesAtribuicao);

    const dados = {
      tarefa_id: id,
      funcionario_id: funcionario_id,
      status: 1,
      mensagem: atribuicaoExistente.length > 0 ? "Atribuição atualizada" : "Tarefa atribuída",
    };

    return response.status(200).json({
      sucesso: true,
      mensagem: "Tarefa aceita com sucesso",
      dados,
    });
  } catch (error) {
    return response.status(500).json({
      sucesso: false,
      mensagem: "Erro ao aceitar tarefa.",
      dados: error.message,
    });
  }
}
