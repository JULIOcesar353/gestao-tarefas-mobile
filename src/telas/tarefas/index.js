import { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import { tarefas } from "../../teste/tarefas";
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

// converte data BR para Date
const parseDate = (dateStr) => {
  const [d, m, y] = dateStr.split("/");
  return new Date(`${y}-${m}-${d}`);
};

const TaskCard = ({ item }) => (
  <TouchableOpacity
    style={[
      styles.card,
      { borderLeftColor: getPriorityColor(item.prioridade) }
    ]}
    activeOpacity={0.8}
  >
    <View style={styles.header}>
      <Text style={styles.titulo}>{item.titulo}</Text>

      <View
        style={[
          styles.badge,
          { backgroundColor: getPriorityColor(item.prioridade) }
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
      <Text style={styles.criado}>Criado em: {item.criadoEm}</Text>
    </View>
  </TouchableOpacity>
);

export default function MinhasTarefas() {
  const [ordemRecente, setOrdemRecente] = useState(true);
  const [prioridadeFiltro, setPrioridadeFiltro] = useState(null);
  const [openSelect, setOpenSelect] = useState(false);
  const [searchText, setSearchText] = useState("");

  const textoFiltrado = searchText.trim().toLowerCase();

  const tarefasFiltradas = tarefas
    .filter((t) => {
      const matchesPriority = !prioridadeFiltro || t.prioridade === prioridadeFiltro;
      const matchesSearch =
        !textoFiltrado ||
        [t.titulo, t.descricao, t.setor, t.corredor]
          .filter(Boolean)
          .some((campo) => campo.toLowerCase().includes(textoFiltrado));

      return matchesPriority && matchesSearch;
    })
    .sort((a, b) => {
      const dataA = parseDate(a.criadoEm);
      const dataB = parseDate(b.criadoEm);
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
                zIndex: 10
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

      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <TaskCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nenhuma tarefa encontrada.
          </Text>
        }
      />
    </View>
  );
}
