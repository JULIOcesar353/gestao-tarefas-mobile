# 🔍 Diagnóstico - Tarefa não muda após aceitar

## ✅ O que foi alterado no Frontend

1. **Visibilidade do status**:
   - Tarefa aceita agora exibe ✓ no nome da tarefa
   - Badge muda para verde quando aceita
   - Botão fica desabilitado após aceitar

2. **Logs aprimorados**:
   - `handleAceitarTarefa()`: Logs de antes/depois
   - `fetchTarefas()`: Mostra cada tarefa recebida com seu `atr_status`
   - `aceitarTarefa()`: Logs do payload enviado e resposta recebida

## 🔴 Possíveis problemas no Backend

### Cenário 1: Endpoint `/tarefas/:id/aceitar` não existe ou retorna erro

**Teste no Postman**:

```
POST http://10.67.23.47:3333/tarefas/1/aceitar
Body: { "funcionario_id": 1 }
Headers: Content-Type: application/json
```

**Esperado**:

```json
{
  "sucesso": true,
  "mensagem": "Tarefa aceita com sucesso",
  "dados": {
    "tarefa_id": 1,
    "funcionario_id": 1,
    "status": 1
  }
}
```

### Cenário 2: Endpoint existe mas não atualiza `ATRIBUICAO_TAREFAS`

Verifique seu backend se:

- O método `aceitarTarefa()` foi adicionado ao controller
- A rota foi adicionada ao router
- O método está realmente criando/atualizando o registro

**Query SQL para testar**:

```sql
SELECT atr_id, atr_tarefa_id, atr_status, atr_funcionario_id
FROM atribuicao_tarefas
WHERE atr_tarefa_id = 1;
```

Após aceitar a tarefa, execute isto para ver se o status mudou para 1.

### Cenário 3: `GET /tarefas` não retorna o `atr_status` atualizado

O seu `SELECT` em `listarTarefas()` está trazendo:

```sql
SELECT
    ...
    a.atr_status,
    a.atr_funcionario_id
FROM TAREFAS t
LEFT JOIN ATRIBUICAO_TAREFAS a ON a.atr_tarefa_id = t.tar_id
...
```

**Teste**:

1. Aceitar tarefa pelo app
2. Executar no Postman: `GET http://10.67.23.47:3333/tarefas`
3. Procurar na resposta JSON o objeto com `tar_id: 1`
4. Verificar se `atr_status` é 1 e `atr_funcionario_id` é o ID do funcionário

## 📋 Checklist de Diagnóstico

- [ ] Testou endpoint `/tarefas/:id/aceitar` no Postman - retorna sucesso?
- [ ] Verificou no banco se `ATRIBUICAO_TAREFAS` foi atualizada
- [ ] Testou `GET /tarefas` após aceitar - `atr_status` está 1?
- [ ] Verificou os logs do app (console) - qual é a resposta do POST?
- [ ] Verificou se o método `aceitarTarefa()` está no controller

## 🆘 Se ainda não funcionar

1. **Ative logs no backend** (Node.js/Express):

   ```javascript
   console.log("POST /tarefas/:id/aceitar recebido", req.body, req.params);
   console.log("Resultado da query:", result);
   ```

2. **Compartilhe o console output** quando:
   - Faz POST em `/tarefas/1/aceitar`
   - Depois faz GET em `/tarefas`

3. **Verifique o banco direto**:
   ```sql
   SELECT * FROM atribuicao_tarefas WHERE atr_tarefa_id = 1;
   ```
