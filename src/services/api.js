import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuração da API
const API_URL = "http://10.67.23.47:3333"; // Para emulador Android
// Para celular físico, substitua pelo seu IP: 'http://SEU_IP:3000'

let cachedToken = null;
let asyncStorageAvailable = true;

function isAsyncStorageNotAvailable(error) {
  if (!error || !error.message) {
    return false;
  }

  return (
    error.message.includes("Native module is null") ||
    error.message.includes("cannot access legacy storage") ||
    error.message.includes("AsyncStorage is null")
  );
}

// Função para obter token do AsyncStorage
export async function getToken() {
  if (!asyncStorageAvailable && cachedToken) {
    console.warn("AsyncStorage indisponível, usando token em cache.");
    return cachedToken;
  }

  try {
    console.log("🔍 Tentando obter token do AsyncStorage...");
    const token = await AsyncStorage.getItem("authToken");
    console.log("✅ Token obtido:", token ? "Presente" : "Nulo");
    cachedToken = token;
    return token;
  } catch (error) {
    if (isAsyncStorageNotAvailable(error)) {
      asyncStorageAvailable = false;
      console.warn(
        "AsyncStorage nativo indisponível. Usando fallback em memória temporário.",
        error,
      );
      return cachedToken;
    }

    console.error("❌ Erro ao obter token:", error);
    return null;
  }
}

// Função para armazenar token
export async function setToken(token) {
  cachedToken = token;

  try {
    console.log("💾 Tentando armazenar token:", token ? "Presente" : "Nulo");
    await AsyncStorage.setItem("authToken", token);
    console.log("✅ Token armazenado com sucesso");
  } catch (error) {
    if (isAsyncStorageNotAvailable(error)) {
      asyncStorageAvailable = false;
      console.warn(
        "AsyncStorage nativo indisponível. Token armazenado apenas em memória.",
        error,
      );
      return;
    }

    console.error("❌ Erro ao armazenar token:", error);
  }
}

// Função para remover token (logout)
export async function removeToken() {
  cachedToken = null;

  try {
    console.log("🗑️ Removendo token...");
    await AsyncStorage.removeItem("authToken");
    console.log("✅ Token removido com sucesso");
  } catch (error) {
    if (isAsyncStorageNotAvailable(error)) {
      asyncStorageAvailable = false;
      console.warn(
        "AsyncStorage nativo indisponível. Token em memória removido.",
        error,
      );
      return;
    }

    console.error("❌ Erro ao remover token:", error);
  }
}

// Função auxiliar para construir headers com token
async function getHeaders(includeAuth = true) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (includeAuth) {
    const token = await getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
      console.log("🔐 Authorization header adicionado.");
    } else {
      console.warn("⚠️ Nenhum token disponível para Authorization header.");
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
