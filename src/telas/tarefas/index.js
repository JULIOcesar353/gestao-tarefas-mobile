import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import {
  getTarefasAceitas,
  mapearTarefas,
  concluirTarefa,
} from "../../services/tarefasService";
import { styles } from "./styles";

const getPriorityColor = (prioridade) => {
  switch (prioridade) {
    case "Alta":
      return "#FF4D4D";
    case "Média":
      return "#FFA500";
    case "Baixa":
      return "#4CAF50";
    default:
      return "#999";
  }
};

// Converte data BR para Date ou retorna Date existente
const parseDate = (dateValue) => {
  if (dateValue instanceof Date) {
    return dateValue;
  }

  if (!dateValue || typeof dateValue !== "string") {
    return new Date(0);
  }

  const [d, m, y] = dateValue.split("/");
  return new Date(`${y}-${m}-${d}`);
};

const TaskCard = ({ item, onPress }) => {
  const criadoEmTexto =
    item.criadoEm instanceof Date
      ? item.criadoEm.toLocaleDateString("pt-BR")
      : String(item.criadoEm);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor: getPriorityColor(item.prioridade) },
      ]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>{item.titulo}</Text>

        <View
          style={[
            styles.badge,
            { backgroundColor: getPriorityColor(item.prioridade) },
          ]}
        >
          <Text style={styles.badgeText}>{item.prioridade}</Text>
        </View>
      </View>

      <Text style={styles.descricao}>{item.descricao}</Text>

      <View style={styles.infoRow}>
        <Text style={styles.info}>Setor: {item.setor}</Text>
        <Text style={styles.info}>⏱ {item.tempo}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.criado}>Criado em: {criadoEmTexto}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function MinhasTarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordemRecente, setOrdemRecente] = useState(true);
  const [prioridadeFiltro, setPrioridadeFiltro] = useState(null);
  const [openSelect, setOpenSelect] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  const textoFiltrado = searchText.trim().toLowerCase();

  const fetchTarefasAceitas = async () => {
    try {
      setLoading(true);
      const response = await getTarefasAceitas();
      const lista = Array.isArray(response.dados) ? response.dados : [];
      setTarefas(mapearTarefas(lista));
    } catch (error) {
      console.error("Erro ao buscar tarefas aceitas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (tarefa) => {
    setSelectedTask(tarefa);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedTask(null);
  };

  const handleConcluirTarefa = async () => {
    if (!selectedTask) {
      return;
    }

    setModalLoading(true);
    try {
      await concluirTarefa(selectedTask.id, selectedTask.dataOriginal);
      setModalVisible(false);
      setSelectedTask(null);
      fetchTarefasAceitas();
    } catch (error) {
      console.error("Erro ao concluir tarefa:", error);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchTarefasAceitas();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTarefasAceitas();
    }, []),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={{ marginTop: 20 }}
        />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Carregando tarefas aceitas...
        </Text>
      </View>
    );
  }

  const tarefasFiltradas = tarefas
    .filter((t) => {
      const matchesPriority =
        !prioridadeFiltro || t.prioridade === prioridadeFiltro;
      const matchesSearch =
        !textoFiltrado ||
        [t.titulo, t.descricao, t.setor, t.corredor]
          .filter(Boolean)
          .some((campo) => campo.toLowerCase().includes(textoFiltrado));

      return matchesPriority && matchesSearch;
    })
    .sort((a, b) => {
      const dataA = parseDate(a.criadoEm).getTime();
      const dataB = parseDate(b.criadoEm).getTime();
      return ordemRecente ? dataB - dataA : dataA - dataB;
    });

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por título, setor ou corredor"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="search"
        />
      </View>

      <View style={styles.filtrosContainer}>
        {/* botão ordem */}
        <TouchableOpacity
          style={styles.filtroBtn}
          onPress={() => setOrdemRecente(!ordemRecente)}
        >
          <Text style={styles.filtroText}>
            {ordemRecente ? "Mais recente" : "Mais antigo"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => {
            setPrioridadeFiltro(null);
            setOrdemRecente(true);
            setSearchText("");
          }}
        >
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>

        {/* select prioridade */}
        <View>
          <TouchableOpacity
            style={styles.select}
            onPress={() => setOpenSelect(!openSelect)}
          >
            <Text style={styles.filtroText}>
              {prioridadeFiltro || "Prioridade"}
            </Text>
          </TouchableOpacity>

          {openSelect && (
            <View
              style={{
                position: "absolute",
                top: 45,
                right: 0,
                width: 140, // 👈 ESSENCIAL
                backgroundColor: "#FFF",
                borderRadius: 8,
                elevation: 5,
                paddingVertical: 4,
                zIndex: 10,
              }}
            >
              {["Alta", "Média", "Baixa"].map((p) => (
                <TouchableOpacity
                  key={p}
                  style={styles.selectOption}
                  onPress={() => {
                    setPrioridadeFiltro(p);
                    setOpenSelect(false);
                  }}
                >
                  <Text numberOfLines={1}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              padding: 20,
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 8,
              elevation: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
            >
              Concluir tarefa
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
              {selectedTask?.titulo}
            </Text>
            <Text style={{ color: "#444", marginBottom: 8 }}>
              {selectedTask?.descricao}
            </Text>
            <Text style={{ color: "#666", marginBottom: 16 }}>
              Setor: {selectedTask?.setor}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#E5E7EB",
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                }}
                onPress={handleCloseModal}
                disabled={modalLoading}
              >
                <Text style={{ color: "#111", fontWeight: "bold" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#10B981",
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  opacity: modalLoading ? 0.6 : 1,
                }}
                onPress={handleConcluirTarefa}
                disabled={modalLoading}
              >
                <Text style={{ color: "#FFF", fontWeight: "bold" }}>
                  {modalLoading ? "Concluindo..." : "Concluir"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskCard item={item} onPress={() => handleOpenModal(item)} />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
        }
      />
    </View>
  );
}
