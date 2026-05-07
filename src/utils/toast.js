import { useState, useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";

/**
 * Hook customizado para gerenciar Toast
 */
export function useToast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("error"); // 'error', 'success', 'warning'
  const timeoutRef = useRef(null);

  const showToast = (msg, toastType = "error", duration = 3000) => {
    setMessage(msg);
    setType(toastType);
    setVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      timeoutRef.current = null;
    }, duration);
  };

  const hideToast = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { visible, message, type, showToast, hideToast };
}

/**
 * Componente Toast
 */
export function Toast({ visible, message, type = "error" }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  if (!visible) return null;

  const bgColor =
    type === "error" ? "#EF4444" : type === "success" ? "#10B981" : "#F59E0B";

  const iconText = type === "error" ? "❌" : type === "success" ? "✅" : "⚠️";

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 50,
          left: 16,
          right: 16,
          backgroundColor: bgColor,
          borderRadius: 8,
          padding: 16,
          zIndex: 999,
          opacity: fadeAnim,
          flexDirection: "row",
          alignItems: "center",
        },
      ]}
    >
      <Text style={{ fontSize: 18, marginRight: 12 }}>{iconText}</Text>
      <Text
        style={{
          color: "#FFF",
          fontSize: 14,
          fontWeight: "500",
          flex: 1,
        }}
        numberOfLines={2}
      >
        {message}
      </Text>
    </Animated.View>
  );
}

/**
 * Formata mensagem de erro para exibição amigável
 */
export function formatErrorMessage(error) {
  if (typeof error === "string") {
    if (error === "TOKEN_EXPIRED") {
      return "Sessão expirada. Por favor, faça login novamente.";
    }
    if (error === "Failed to fetch") {
      return "Erro de conexão com o servidor.";
    }
    return error;
  }

  if (error.message) {
    return formatErrorMessage(error.message);
  }

  return "Ocorreu um erro. Tente novamente.";
}
