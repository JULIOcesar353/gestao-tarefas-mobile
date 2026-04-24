import { View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import { tarefas } from '../../teste/tarefas';

const parseDate = (dateStr) => {
    const [d, m, y] = dateStr.split('/');
    return new Date(`${y}-${m}-${d}`);
};

export default function Home() {
    const [abertoId, setAbertoId] = useState(null);
    const [ordemRecente, setOrdemRecente] = useState(true);
    const [prioridadeFiltro, setPrioridadeFiltro] = useState(null);
    const [openSelect, setOpenSelect] = useState(false);
    const [searchText, setSearchText] = useState("");

    const textoFiltrado = searchText.trim().toLowerCase();

    const listaFiltrada = tarefas
        .filter((tarefa) => {
            const matchesPrioridade = !prioridadeFiltro || tarefa.prioridade === prioridadeFiltro;
            const matchesBusca =
                !textoFiltrado ||
                [tarefa.titulo, tarefa.descricao, tarefa.setor, tarefa.corredor]
                    .filter(Boolean)
                    .some((campo) => campo.toLowerCase().includes(textoFiltrado));

            return matchesPrioridade && matchesBusca;
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
                                width: 140,
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
                data={listaFiltrada}
                keyExtractor={(item) => String(item.id)}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        Nenhuma tarefa encontrada.
                    </Text>
                }
                renderItem={({ item: tarefa }) => {

                    const limite = 105;

                    const aberto = abertoId === tarefa.id;

                    const textoExibido = aberto
                        ? tarefa.descricao
                        : tarefa.descricao.slice(0, limite) +
                        (tarefa.descricao.length > limite ? "..." : "");

                    const corPrioridade =
                        tarefa.prioridade === "Alta" ? "#EF4444" :
                            tarefa.prioridade === "Média" ? "#F59E0B" :
                                "#22C55E";

                    return (
                        <View key={tarefa.id} style={[styles.card, { borderLeftColor: corPrioridade }]}>

                            <View style={styles.headerCard}>
                                <View>
                                    <Text style={styles.titulo}>{tarefa.titulo}</Text>
                                    <Text style={styles.sub}>{tarefa.corredor}</Text>
                                </View>

                                <View style={[styles.badge, { backgroundColor: corPrioridade }]}>
                                    <Text style={styles.badgeText}>
                                        {tarefa.prioridade}
                                    </Text>
                                </View>
                            </View>

                            <Text style={styles.descricao}>
                                {textoExibido}
                            </Text>

                            <Text style={styles.setor}>
                                Setor: {tarefa.setor}
                            </Text>

                            <View style={styles.footer}>

                                <TouchableOpacity style={styles.botaoAceitar}>
                                    <Text style={styles.textoBotao}>Aceitar</Text>
                                </TouchableOpacity>

                                <View>

                                    <View style={styles.rightFooter}>
                                        <Text style={styles.tempo}>
                                            ⏱ {tarefa.tempo}
                                        </Text>
                                    </View>

                                    {
                                        tarefa.descricao.length > limite && (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    setAbertoId(aberto ? null : tarefa.id)
                                                }
                                                style={styles.botaoSeta}
                                            >
                                                <Text style={styles.seta}>
                                                    {aberto ? '⌃' : '⌄'}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }

                                </View>

                            </View>

                        </View>
                    );
                }}
            />
        </View>
    );
}