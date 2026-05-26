import { post, setToken, removeToken, getToken } from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_USER_ID_KEY = "authUserId";

function base64UrlDecode(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );
  if (typeof atob === "function") {
    return atob(padded);
  }

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let str = "";
  let i = 0;

  while (i < padded.length) {
    const enc1 = chars.indexOf(padded.charAt(i++));
    const enc2 = chars.indexOf(padded.charAt(i++));
    const enc3 = chars.indexOf(padded.charAt(i++));
    const enc4 = chars.indexOf(padded.charAt(i++));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    str += String.fromCharCode(chr1);
    if (enc3 !== 64) str += String.fromCharCode(chr2);
    if (enc4 !== 64) str += String.fromCharCode(chr3);
  }

  return decodeURIComponent(
    str
      .split("")
      .map((c) => {
        const code = c.charCodeAt(0).toString(16).toUpperCase();
        return "%" + (code.length < 2 ? "0" + code : code);
      })
      .join(""),
  );
}

function decodeJwtPayload(token) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const parts = token.split(".");
  if (parts.length < 2) {
    return null;
  }

  try {
    const payloadJson = base64UrlDecode(parts[1]);
    return JSON.parse(payloadJson);
  } catch (error) {
    console.warn("Não foi possível decodificar payload do token:", error);
    return null;
  }
}

function extractUserIdFromPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  return (
    payload.sub ||
    payload.id ||
    payload.userId ||
    payload.usuarioId ||
    payload.usuario_id ||
    payload.user_id ||
    payload.funcionario_id ||
    payload.funcionarioId ||
    null
  );
}

function extractUserIdFromResponse(response, token) {
  if (!response || typeof response !== "object") {
    return null;
  }

  return (
    response.user?.id ||
    response.dados?.user?.id ||
    response.dados?.id ||
    response.id ||
    response.usuario?.id ||
    response.userId ||
    response.idUsuario ||
    response.usuario_id ||
    response.user_id ||
    extractUserIdFromPayload(decodeJwtPayload(token)) ||
    null
  );
}

export async function setStoredUserId(userId) {
  try {
    if (userId == null) {
      return;
    }

    await AsyncStorage.setItem(AUTH_USER_ID_KEY, String(userId));
  } catch (error) {
    console.error("Erro ao salvar userId no AsyncStorage:", error);
  }
}

export async function getStoredUserId() {
  try {
    const storedId = await AsyncStorage.getItem(AUTH_USER_ID_KEY);
    return storedId;
  } catch (error) {
    console.error("Erro ao ler userId do AsyncStorage:", error);
    return null;
  }
}

export async function getCurrentUserId() {
  try {
    const storedId = await getStoredUserId();
    if (storedId) {
      return isNaN(Number(storedId)) ? storedId : Number(storedId);
    }

    const token = await getToken();
    const payload = decodeJwtPayload(token);
    const extractedId = extractUserIdFromPayload(payload);
    return extractedId;
  } catch (error) {
    console.error("Erro ao obter ID do usuário atual:", error);
    return null;
  }
}

/**
 * Realiza o login do usuário
 * @param {string} login - Usuário/email
 * @param {string} senha - Senha
 * @returns {Promise<{sucesso: boolean, token?: string, mensagem?: string}>}
 */
export async function loginUser(login, senha) {
  try {
    if (!login || !senha) {
      throw new Error("Login e senha são obrigatórios");
    }

    const response = await post(
      "/login",
      {
        login,
        senha,
      },
      false, // Não usa auth para login
    );

    console.log("📊 Resposta completa do backend:", response);

    // Verificar se o login foi bem-sucedido
    // Flexibilizar: aceitar sucesso:true OU mensagem contendo "sucesso"/"realizado"
    const foiBemSucedido =
      response.sucesso === true ||
      (response.mensagem &&
        response.mensagem.toLowerCase().includes("sucesso")) ||
      (response.mensagem &&
        response.mensagem.toLowerCase().includes("realizado"));

    const token =
      response.token ||
      response.dados?.token ||
      response.data?.token ||
      response.accessToken ||
      null;

    if (foiBemSucedido) {
      if (token) {
        await setToken(token);
      } else {
        console.warn("Login bem-sucedido, mas nenhum token JWT foi retornado.");
      }

      const userId = extractUserIdFromResponse(response, token);
      if (userId) {
        await setStoredUserId(userId);
      }

      return {
        sucesso: true,
        token: token || "auth_token_backend",
        mensagem: response.mensagem || "Login realizado com sucesso",
      };
    } else {
      return {
        sucesso: false,
        mensagem: response.mensagem || "Falha ao fazer login",
      };
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return {
      sucesso: false,
      mensagem:
        error.message === "Failed to fetch"
          ? "Erro de conexão com o servidor"
          : error.message || "Erro desconhecido ao fazer login",
    };
  }
}

/**
 * Faz logout do usuário
 * @returns {Promise<void>}
 */
export async function logoutUser() {
  try {
    await removeToken();
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}

/**
 * Verifica se o usuário está autenticado
 * @returns {Promise<boolean>}
 */
export async function isUserAuthenticated() {
  try {
    const token = await getToken();
    return !!token;
  } catch (error) {
    console.error("Erro ao verificar autenticação:", error);
    return false;
  }
}

/**
 * Obtém o token armazenado
 * @returns {Promise<string|null>}
 */
export async function getStoredToken() {
  try {
    return await getToken();
  } catch (error) {
    console.error("Erro ao obter token:", error);
    return null;
  }
}
