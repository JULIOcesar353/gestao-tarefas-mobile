import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import styles from "./styles";
import { getTarefas } from "../../services/tarefasService";

export default function Home() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [abertoId, setAbertoId] = useState(null);
  const [ordemRecente, setOrdemRecente] = useState(true);
  const [prioridadeFiltro, setPrioridadeFiltro] = useState(null);
  const [openSelect, setOpenSelect] = useState(false);
  const [searchText, setSearchText] = useState("");

  const textoFiltrado = searchText.trim().toLowerCase();

  useEffect(() => {
    async function carregarTarefas() {
      try {
        const data = await getTarefas();
        console.log("API retornou:", data);

        // 🔥 ARRAY CORRETO
        const lista = Array.isArray(data.dados) ? data.dados : [];

        const tarefasFormatadas = lista.map((t) => ({
          id: t.tar_id,
          titulo: t.tar_titulo || "",
          descricao: t.tar_descricao || "",
          prioridade:
            t.tar_prioridade === 3
              ? "Alta"
              : t.tar_prioridade === 2
                ? "Média"
                : "Baixa",
          criadoEm: new Date(t.tar_data_criacao),
          setor: String(t.tar_setor_id),
          corredor: "-",
          tempo: `${t.tar_estimativa_minutos || 0} min`,
        }));

        setTarefas(tarefasFormatadas);
      } catch (error) {
        console.log("Erro ao buscar tarefas:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarTarefas();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando tarefas...</Text>
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

          const textoExibido = aberto
            ? tarefa.descricao
            : tarefa.descricao.slice(0, limite) +
              (tarefa.descricao.length > limite ? "..." : "");

          const corPrioridade =
            tarefa.prioridade === "Alta"
              ? "#EF4444"
              : tarefa.prioridade === "Média"
                ? "#F59E0B"
                : "#22C55E";

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
                <TouchableOpacity style={styles.botaoAceitar}>
                  <Text style={styles.textoBotao}>Aceitar</Text>
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
