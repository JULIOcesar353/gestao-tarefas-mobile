import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import styles from './styles';

export default function Login() {

    const navigation = useNavigation();

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const errorTimeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current);
            }
        };
    }, []);

    const showError = (message) => {
        setError(message);
        if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
        }

        errorTimeoutRef.current = setTimeout(() => {
            setError('');
            errorTimeoutRef.current = null;
        }, 3000);
    };

    const handleLogin = () => {
        if (!login.trim() || !senha.trim()) {
            showError('Preencha usuário e senha.');
            return;
        }

        if (login === 'admin' && senha === 'admin') {
            if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current);
                errorTimeoutRef.current = null;
            }
            setError('');
            navigation.navigate('GestaoTarefas');
            return;
        }

        showError('Usuário ou senha incorretos.');
    };

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

                {!!error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.botao}
                >
                    <Text style={styles.txtBotao}>Acessar sistema</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}