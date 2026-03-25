import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { TextInput } from 'react-native/types_generated/index';
import { useState } from 'react';
import styles from './styles';

export default function Login() {

    const navigation = useNavigation();

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View style={styles.container}>
            <View style={styles.containerLogin}>
            <Text style={styles.text}>Login</Text>
            <TextInput
                onChangeText={setLogin}
                placeholder='login'
                keyboardType='ascii-capable'
                style={styles.input}

            />
            <Text style={styles.text}>Senha</Text>
            <TextInput
                onChangeText={setSenha}
                placeholder='Senha'
                keyboardType='ascii-capable'
                secureTextEntry={true}
                style={styles.input}
            />
            <TouchableOpacity onPress={() => navigation.navigate('GestaoTarefas')}
                style={styles.botao}>
                <Text style={styles.txtBotao}>Acessar sistema</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}