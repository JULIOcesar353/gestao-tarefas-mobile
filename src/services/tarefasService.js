import { get, post } from "./api";

// Função específica para obter tarefas
export async function getTarefas() {
  try {
    const tarefas = await get("/tarefas");
    return tarefas;
  } catch (error) {
    console.error("Erro ao obter tarefas:", error);
    throw error;
  }
}

// Função específica para login
export async function login(credentials) {
  try {
    const response = await post("/login", credentials);
    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

// Exemplo adicional: Criar uma nova tarefa (POST)
export async function criarTarefa(tarefaData) {
  try {
    const response = await post("/tarefas", tarefaData);
    return response;
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
}
