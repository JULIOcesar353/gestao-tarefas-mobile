import { post, setToken, removeToken, getToken } from "./api";

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
