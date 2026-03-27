import { View, Text, TouchableOpacity, ScrollView } from 'react-native';import { useState } from 'react';
import styles from './styles';
import { tarefas } from '../../teste/tarefas';

export default function Home() {
    const [abertoId, setAbertoId] = useState(null);

    return (
        <ScrollView style={styles.container}>
            {tarefas.map((tarefa) => {
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

                            <View style={styles.actions}>
                                <TouchableOpacity style={styles.botaoAceitar}>
                                    <Text style={styles.textoBotao}>Aceitar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text style={styles.descricao}>
                            {textoExibido}
                        </Text>
                        <Text style={styles.setor}>
                            Setor: {tarefa.setor}
                        </Text>

                        <View style={styles.footer}>

                            <View style={styles.rightFooter}>

                                <Text style={styles.tempo}>
                                    ⏱ {tarefa.tempo}
                                </Text>

                                <View style={[styles.badge, { backgroundColor: corPrioridade }]}>
                                    <Text style={styles.badgeText}>
                                        {tarefa.prioridade}
                                    </Text>
                                </View>

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
                );
            })}
        </ScrollView >
    );
}