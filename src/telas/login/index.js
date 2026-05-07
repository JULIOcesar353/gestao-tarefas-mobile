import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./styles";
import { loginUser } from "../../services/authService";
import { Toast, useToast, formatErrorMessage } from "../../utils/toast";

export default function Login() {
  const navigation = useNavigation();
  const {
    visible: toastVisible,
    message: toastMessage,
    type: toastType,
    showToast,
    hideToast,
  } = useToast();

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Limpar ao desmontar
  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const handleLogin = async () => {
    if (!login.trim() || !senha.trim()) {
      showToast("Preencha usuário e senha.", "error");
      return;
    }

    setLoading(true);

    try {
      const resultado = await loginUser(login, senha);

      if (resultado.sucesso) {
        showToast("Login realizado com sucesso!", "success");

        // Limpar inputs
        setLogin("");
        setSenha("");

        // Navegar para Home com delay
        setTimeout(() => {
          navigation.navigate("GestaoTarefas");
        }, 1000);
      } else {
        showToast(resultado.mensagem || "Falha ao fazer login", "error");
      }
    } catch (error) {
      const mensagem = formatErrorMessage(error);
      showToast(mensagem, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Toast visible={toastVisible} message={toastMessage} type={toastType} />

      <View style={styles.containerLogin}>
        <Text style={styles.titulo}>Login</Text>

        <Text style={styles.label}>Login</Text>
        <TextInput
          value={login}
          onChangeText={setLogin}
          placeholder="Digite seu login"
          style={styles.input}
          editable={!loading}
          placeholderTextColor="#999"
        />
        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            secureTextEntry={!mostrarSenha}
            style={styles.input}
            editable={!loading}
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            onPress={() => setMostrarSenha(!mostrarSenha)}
            style={styles.botaoOlho}
            disabled={loading}
          >
            <Text>{mostrarSenha ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.botao, loading && { opacity: 0.6 }]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" size="small" />
          ) : (
            <Text style={styles.txtBotao}>Acessar sistema</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
