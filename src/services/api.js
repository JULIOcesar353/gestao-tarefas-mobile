// Configuração da API
const API_URL = "http://10.67.23.47:3333"; // Para emulador Android
// Para celular físico, substitua pelo seu IP: 'http://SEU_IP:3000'

// Função genérica para requisições GET
export async function get(endpoint) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na requisição GET:", error);
    throw error;
  }
}

// Função genérica para requisições POST
export async function post(endpoint, data) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro na requisição POST:", error);
    throw error;
  }
}
