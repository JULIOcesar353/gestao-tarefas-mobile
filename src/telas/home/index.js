import { View, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './styles';

export default function Home() {
    const [aberto, setAberto] = useState(false);

    return (
        <View style={styles.container}>

            {/* CARD GRANDE */}
            <View style={styles.card}>
                <View style={styles.headerCard}>
                    <View>
                        <Text style={styles.titulo}>Adega</Text>
                        <Text style={styles.sub}>Corredor 9</Text>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity style={styles.botaoAceitar}>
                            <Text style={styles.textoBotao}>Aceitar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                 {aberto && (
                <Text style={styles.descricao}>
                    Retirar todos os resquícios de sujeira e após isso lavar o chão.
                    cada parte do estacionamento e guardar os carrinhos no fundo de forma organizada. 
                </Text>
                 )}
                <TouchableOpacity onPress={() => setAberto(!aberto)}>
                    <Text style={styles.seta}>
                        {aberto ? '⌃' : '⌄'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* CARD MENOR */}
            <View style={styles.card}>
                <View>
                    <Text style={styles.titulo}>Reposição</Text>
                    <Text style={styles.sub}>Corredor 1</Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.botaoAceitar}>
                        <Text style={styles.textoBotao}>Aceitar</Text>
                    </TouchableOpacity>
                    <Text style={styles.seta}>⌄</Text>
                </View>
            </View>
        </View>
    );
}