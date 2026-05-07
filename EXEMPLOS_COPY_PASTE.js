// ============================================
// EXEMPLOS PRONTOS PARA COPIAR/COLAR
// Gestão de Tarefas Mobile - Integração API
// ============================================

// ============================================
// 1. USAR TOAST EM QUALQUER TELA
// ============================================
import { Toast, useToast, formatErrorMessage } from "../../utils/toast";
import { useState } from "react";

export default function MinhaTelaExemplo() {
  const { visible: toastVisible, message: toastMessage, type: toastType, showToast } = useToast();

  const handleAlgo = async () => {
    try {
      // ... seu código
      showToast("Sucesso!", "success", 2000);
    } catch (error) {
      showToast(formatErrorMessage(error), "error");
    }
  };

  return (
    <View style={styles.container}>
      <Toast visible={toastVisible} message={toastMessage} type={toastType} />
      {/* ... resto da tela */}
    </View>
  );
}

// ============================================
// 2. RECARREGAR DADOS AO FOCAR TELA
// ============================================
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export default function MinhaTelaComRefresh() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDados = useCallback(async () => {
    try {
      setLoading(true);
      // Sua lógica de fetch
      // const resultado = await minhaFuncao();
      // setDados(resultado);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Recarregar ao entrar na tela
  useFocusEffect(fetchDados);

  // Carregar ao montar
  useEffect(() => {
    fetchDados();
  }, [fetchDados]);

  return (
    <View style={styles.container}>
      {/* ... */}
    </View>
  );
}

// ============================================
// 3. CHAMAR API COM TOKEN AUTOMÁTICO
// ============================================
import { get, post, patch, deleteRequest } from "../../services/api";

// GET automático com token
const resultado = await get("/tarefas");

// POST automático com token
const resultado = await post("/tarefas", {
  titulo: "Nova tarefa",
});

// PATCH automático com token
const resultado = await patch("/tarefas/123", {
  status: 1,
});

// DELETE automático com token
const resultado = await deleteRequest("/tarefas/123");

// ============================================
// 4. LOGIN E REDIRECIONAMENTO
// ============================================
import { loginUser, logoutUser } from "../../services/authService";
import { useNavigation } from "@react-navigation/native";

export default function TelaLogin() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const resultado = await loginUser("usuario", "senha");

      if (resultado.sucesso) {
        // Reset para evitar voltar ao login
        navigation.reset({
          index: 0,
          routes: [{ name: "GestaoTarefas" }],
        });
      }
    } catch (error) {
      // Tratamento de erro
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigation.navigate("Login");
  };

  return (
    // ... JSX
  );
}

// ============================================
// 5. FAZER REQUISIÇÃO COM RETRY
// ============================================
export async function fetchComRetry(funcao, tentativas = 3, delay = 1000) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await funcao();
    } catch (error) {
      if (i === tentativas - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Uso:
const resultado = await fetchComRetry(
  () => getTarefas(),
  3, // 3 tentativas
  1000 // 1 segundo entre tentativas
);

// ============================================
// 6. FORMATAR DATAS PARA EXIBIÇÃO
// ============================================
export function formatarData(data) {
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatarHora(data) {
  const d = new Date(data);
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatarDataHora(data) {
  return `${formatarData(data)} ${formatarHora(data)}`;
}

// Uso na tela:
<Text>{formatarDataHora(tarefa.criadoEm)}</Text>

// ============================================
// 7. VALIDAR CAMPOS DO FORMULÁRIO
// ============================================
export function validarCampos(campos, regras) {
  const erros = {};

  Object.keys(regras).forEach((campo) => {
    const valor = campos[campo];
    const regra = regras[campo];

    if (regra.obrigatorio && (!valor || valor.trim() === "")) {
      erros[campo] = "Campo obrigatório";
    }

    if (valor && regra.minLength && valor.length < regra.minLength) {
      erros[campo] = `Mínimo ${regra.minLength} caracteres`;
    }

    if (valor && regra.maxLength && valor.length > regra.maxLength) {
      erros[campo] = `Máximo ${regra.maxLength} caracteres`;
    }

    if (valor && regra.padrao && !regra.padrao.test(valor)) {
      erros[campo] = regra.mensagem || "Formato inválido";
    }
  });

  return erros;
}

// Uso:
const erros = validarCampos(
  { email: "teste@", senha: "123" },
  {
    email: {
      obrigatorio: true,
      padrao: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      mensagem: "Email inválido",
    },
    senha: {
      obrigatorio: true,
      minLength: 6,
    },
  }
);

if (Object.keys(erros).length > 0) {
  // Tem erros
}

// ============================================
// 8. DEBOUNCE PARA BUSCA
// ============================================
export function useDebounce(valor, delay = 500) {
  const [valorDebounce, setValorDebounce] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValorDebounce(valor);
    }, delay);

    return () => clearTimeout(timer);
  }, [valor, delay]);

  return valorDebounce;
}

// Uso em componente com busca:
export default function Busca() {
  const [texto, setTexto] = useState("");
  const textoBuscado = useDebounce(texto, 300);

  useEffect(() => {
    if (textoBuscado) {
      // Fazer busca aqui
      buscarTarefas(textoBuscado);
    }
  }, [textoBuscado]);

  return (
    <TextInput
      value={texto}
      onChangeText={setTexto}
      placeholder="Buscar..."
    />
  );
}

// ============================================
// 9. COMPONENTE DE CARREGAMENTO GENÉRICO
// ============================================
import { View, ActivityIndicator, Text } from "react-native";

export function LoadingOverlay({ visivel, mensagem = "Carregando..." }) {
  if (!visivel) return null;

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFF",
          borderRadius: 12,
          padding: 24,
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ marginTop: 12, fontSize: 16, fontWeight: "500" }}>
          {mensagem}
        </Text>
      </View>
    </View>
  );
}

// Uso:
const [loading, setLoading] = useState(false);

return (
  <View style={styles.container}>
    <LoadingOverlay visivel={loading} mensagem="Processando..." />
    {/* ... rest do conteúdo */}
  </View>
);

// ============================================
// 10. INTERCEPTAR ERROS 401 GLOBALMENTE
// ============================================
// Em api.js, já está implementado!
// Se receber 401 (TOKEN_EXPIRED):
// 1. Token é removido
// 2. Toast exibe mensagem
// 3. Você pode capturar em try/catch

try {
  await get("/tarefas");
} catch (error) {
  if (error.message === "TOKEN_EXPIRED") {
    // Redirecionar para login
    navigation.navigate("Login");
  }
}

// ============================================
// DICAS IMPORTANTES
// ============================================

/*
✅ DO's:
- Use mapearTarefas() para consistência
- Use formatarPrioridade() ao exibir
- Use getCorPrioridade() para cores dinâmicas
- Use Toast para feedback ao usuário
- Use useFocusEffect para sincronizar dados
- Use AsyncStorage para dados sensíveis
- Sempre adicione loading states
- Sempre trate erros com try/catch

❌ DON'Ts:
- Não armazene token em state (use AsyncStorage)
- Não faça múltiplas requisições simultâneas sem controle
- Não ignore erros de rede
- Não se esqueça de limpar timers/listeners
- Não faça requisições em render direto
- Não passe token manualmente (api.js faz automaticamente)
*/
