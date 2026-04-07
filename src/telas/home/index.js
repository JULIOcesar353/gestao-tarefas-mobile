import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import { tarefas } from '../../teste/tarefas';

export default function Home() {
    const [abertoId, setAbertoId] = useState(null);
    const [filtroTempo, setFiltroTempo] = useState("recentes");
    const [filtroPrioridade, setFiltroPrioridade] = useState("todas");

    let listaFiltrada = [...tarefas];

    // filtro de prioridade
    if (filtroPrioridade !== "todas") {
        listaFiltrada = listaFiltrada.filter(
            tarefa => tarefa.prioridade === filtroPrioridade
        );
    }

    // ordenação por tempo
    if (filtroTempo === "recentes") {
        listaFiltrada.reverse();
    }

    return (

        <View>

            <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>

                <TouchableOpacity onPress={() => setFiltroTempo("recentes")}>
                    <Text>Mais recentes</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFiltroTempo("antigas")}>
                    <Text>Mais antigas</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFiltroPrioridade("Alta")}>
                    <Text>Alta</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFiltroPrioridade("Média")}>
                    <Text>Média</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFiltroPrioridade("Baixa")}>
                    <Text>Baixa</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                data={listaFiltrada}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
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