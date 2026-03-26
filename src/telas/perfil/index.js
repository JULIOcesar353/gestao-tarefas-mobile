import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

import styles from './styles.js'

export default function Perfil() {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/bolsonaro.jpg')}
                style={styles.img}
            />
            <View style={styles.containerItem}>
                <TouchableOpacity onPress={() => navigation.navigate('GestaoTarefas')}>
                </TouchableOpacity>


            <View style={styles.label}>
                <Text>Nome</Text>
                <TextInput
                    placeholder='Bolsonaro'
                    style={styles.input}
                    editable={false}
                />

                <Text>Setor</Text>
                <TextInput
                    placeholder='Ex-Presidente'
                    style={styles.input}
                    editable={false}
                />

                <Text>Cargo</Text>
                <TextInput
                    placeholder='Aposentado'
                    style={styles.input}
                    editable={false}
                />

                <Text>Email</Text>
                <TextInput
                    placeholder='bolsonaro@email.com'
                    style={styles.input}
                    editable={false}
                />
            </View>

            </View>
            <TouchableOpacity style={styles.botao}>
                <Text style={styles.txtBotao}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}