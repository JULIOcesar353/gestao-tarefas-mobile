import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import styles from './styles';

export default function Login() {

    const navigation = useNavigation();

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const [mostrarSenha, setMostrarSenha] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.containerLogin}>

                <Text style={styles.titulo}>Login</Text>

                <Text style={styles.label}>Login</Text>
                <TextInput
                    value={login}
                    onChangeText={setLogin}
                    placeholder='Digite seu login'
                    style={styles.input}
                />
                <Text style={styles.label}>Senha</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        value={senha}
                        onChangeText={setSenha}
                        placeholder='Digite sua senha'
                        secureTextEntry={!mostrarSenha}
                        style={styles.input}
                    />

                    <TouchableOpacity
                        onPress={() => setMostrarSenha(!mostrarSenha)}
                        style={styles.botaoOlho}
                    >
                        <Text>{mostrarSenha ? '🙈' : '👁️'}</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('GestaoTarefas')}
                    style={styles.botao}
                >
                    <Text style={styles.txtBotao}>Acessar sistema</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}