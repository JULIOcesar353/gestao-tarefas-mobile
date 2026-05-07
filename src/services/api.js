import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração da API
const API_URL = "http://10.67.23.47:3333"; // Para emulador Android
// Para celular físico, substitua pelo seu IP: 'http://SEU_IP:3000'

// Função para obter token do AsyncStorage
export async function getToken() {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token;
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
}

// Função para armazenar token
export async function setToken(token) {
  try {
    await AsyncStorage.setItem("authToken", token);
  } catch (error) {
    console.error("Erro ao armazenar token:", error);
  }
}

// Função para remover token (logout)
export async function removeToken() {
  try {
    await AsyncStorage.removeItem("authToken");
  } catch (error) {
    console.error("Erro ao remover token:", error);
  }
}

// Função auxiliar para construir headers com token
async function getHeaders(includeAuth = true) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = await getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}

// Função genérica para requisições GET
export async function get(endpoint, useAuth = true) {
  try {
    const headers = await getHeaders(useAuth);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers,
    });

    if (response.status === 401) {
      // Token expirado, limpar e notificar
      await removeToken();
      throw new Error("TOKEN_EXPIRED");
    }

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
export async function post(endpoint, data, useAuth = true) {
  try {
    const headers = await getHeaders(useAuth);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      await removeToken();
      throw new Error("TOKEN_EXPIRED");
    }

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

// Função genérica para requisições PATCH
export async function patch(endpoint, data, useAuth = true) {
  try {
    const headers = await getHeaders(useAuth);
    const url = `${API_URL}${endpoint}`;
    const body = JSON.stringify(data);

    console.log("🔧 PATCH Request:");
    console.log("   URL:", url);
    console.log("   Headers:", headers);
    console.log("   Body:", body);

    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body,
    });

    console.log("📊 PATCH Response Status:", response.status);

    if (response.status === 401) {
      await removeToken();
      throw new Error("TOKEN_EXPIRED");
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ PATCH Error Response:", errorText);
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`,
      );
    }

    const result = await response.json();
    console.log("✅ PATCH Result:", result);
    return result;
  } catch (error) {
    console.error("❌ Erro na requisição PATCH:", error);
    throw error;
  }
}

// Função genérica para requisições DELETE
export async function deleteRequest(endpoint, useAuth = true) {
  try {
    const headers = await getHeaders(useAuth);
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers,
    });

    if (response.status === 401) {
      await removeToken();
      throw new Error("TOKEN_EXPIRED");
    }

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`,
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro na requisição DELETE:", error);
    throw error;
  }
}
