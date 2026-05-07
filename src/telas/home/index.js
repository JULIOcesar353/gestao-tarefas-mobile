import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import styles from "./styles";
import {
  getTarefas,
  aceitarTarefa,
  mapearTarefas,
  getCorPrioridade,
} from "../../services/tarefasService";
import { Toast, useToast, formatErrorMessage } from "../../utils/toast";

export default function Home() {
  const {
    visible: toastVisible,
    message: toastMessage,
    type: toastType,
    showToast,
  } = useToast();

  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tarefasEmCarregamento, setTarefasEmCarregamento] = useState(new Set());

  const [abertoId, setAbertoId] = useState(null);
  const [ordemRecente, setOrdemRecente] = useState(true);
  const [prioridadeFiltro, setPrioridadeFiltro] = useState(null);
  const [openSelect, setOpenSelect] = useState(false);
  const [searchText, setSearchText] = useState("");

  const textoFiltrado = searchText.trim().toLowerCase();

  // Função reutilizável para carregar tarefas
  const fetchTarefas = async () => {
    try {
      setLoading(true);
      const data = await getTarefas();
      console.log("API retornou:", data);

      const lista = Array.isArray(data.dados) ? data.dados : [];
      const tarefasFormatadas = mapearTarefas(lista);

      setTarefas(tarefasFormatadas);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      const mensagem = formatErrorMessage(error);
      showToast(mensagem, "error");
    } finally {
      setLoading(false);
    }
  };

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    fetchTarefas();
  }, []);

  // Recarregar tarefas ao voltar para a tela
  useFocusEffect(
    useCallback(() => {
      fetchTarefas();
    }, []),
  );

  // Handlers
  const handleAceitarTarefa = async (tarefaId) => {
    try {
      // Adicionar à lista de carregamento
      setTarefasEmCarregamento((prev) => new Set([...prev, tarefaId]));

      const resultado = await aceitarTarefa(tarefaId);

      if (resultado.sucesso || resultado.sucesso === undefined) {
        showToast("Tarefa aceita com sucesso!", "success");

        // Atualizar a lista localmente ou recarregar
        setTimeout(() => {
          fetchTarefas();
        }, 500);
      } else {
        showToast(resultado.mensagem || "Erro ao aceitar tarefa", "error");
      }
    } catch (error) {
      console.error("Erro ao aceitar tarefa:", error);
      const mensagem = formatErrorMessage(error);
      showToast(mensagem, "error");
    } finally {
      setTarefasEmCarregamento((prev) => {
        const nova = new Set(prev);
        nova.delete(tarefaId);
        return nova;
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#4F46E5"
          style={{ marginTop: 20 }}
        />
        <Text style={{ marginTop: 10, color: "#666" }}>
          Carregando tarefas...
        </Text>
      </View>
    );
  }

  const listaFiltrada = tarefas
    .filter((tarefa) => {
      const matchesPrioridade =
        !prioridadeFiltro || tarefa.prioridade === prioridadeFiltro;

      const matchesBusca =
        !textoFiltrado ||
        [tarefa.titulo, tarefa.descricao, tarefa.setor, tarefa.corredor]
          .filter(Boolean)
          .some((campo) => campo.toLowerCase().includes(textoFiltrado));

      return matchesPrioridade && matchesBusca;
    })
    .sort((a, b) => {
      return ordemRecente ? b.criadoEm - a.criadoEm : a.criadoEm - b.criadoEm;
    });

  return (
    <View style={styles.container}>
      <Toast visible={toastVisible} message={toastMessage} type={toastType} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por título, setor ou corredor"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filtrosContainer}>
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
                width: 140,
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
                  <Text>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
        }
        renderItem={({ item: tarefa }) => {
          const limite = 105;
          const aberto = abertoId === tarefa.id;
          const emCarregamento = tarefasEmCarregamento.has(tarefa.id);

          const textoExibido = aberto
            ? tarefa.descricao
            : tarefa.descricao.slice(0, limite) +
              (tarefa.descricao.length > limite ? "..." : "");

          const corPrioridade = getCorPrioridade(tarefa.prioridade);

          return (
            <View style={[styles.card, { borderLeftColor: corPrioridade }]}>
              <View style={styles.headerCard}>
                <View>
                  <Text style={styles.titulo}>{tarefa.titulo}</Text>
                  <Text style={styles.sub}>{tarefa.corredor}</Text>
                </View>

                <View
                  style={[styles.badge, { backgroundColor: corPrioridade }]}
                >
                  <Text style={styles.badgeText}>{tarefa.prioridade}</Text>
                </View>
              </View>

              <Text style={styles.descricao}>{textoExibido}</Text>

              <Text style={styles.setor}>Setor: {tarefa.setor}</Text>

              <View style={styles.footer}>
                <TouchableOpacity
                  style={[
                    styles.botaoAceitar,
                    emCarregamento && { opacity: 0.6 },
                  ]}
                  onPress={() => handleAceitarTarefa(tarefa.id)}
                  disabled={emCarregamento}
                >
                  {emCarregamento ? (
                    <ActivityIndicator color="#FFF" size="small" />
                  ) : (
                    <Text style={styles.textoBotao}>Aceitar</Text>
                  )}
                </TouchableOpacity>

                <View>
                  <View style={styles.rightFooter}>
                    <Text style={styles.tempo}>⏱ {tarefa.tempo}</Text>
                  </View>

                  {tarefa.descricao.length > limite && (
                    <TouchableOpacity
                      onPress={() => setAbertoId(aberto ? null : tarefa.id)}
                      style={styles.botaoSeta}
                    >
                      <Text style={styles.seta}>{aberto ? "⌃" : "⌄"}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}
