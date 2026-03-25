import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import { tarefas } from '../../teste/tarefas';

export default function Home() {
    const [abertoId, setAbertoId] = useState(null);

    return (
        <View style={styles.container}>
            {tarefas.map((tarefa) => {
                const limite = 105;

                const aberto = abertoId === tarefa.id;

                const textoExibido = aberto
                    ? tarefa.descricao
                    : tarefa.descricao.slice(0, limite) +
                      (tarefa.descricao.length > limite ? "..." : "");

                return (
                    <View key={tarefa.id} style={styles.card}>
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

                        {tarefa.descricao.length > limite && (
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
                        )}
                    </View>
                );
            })}
        </View>
    );
}