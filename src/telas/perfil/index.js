import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Perfil() {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('GestaoTarefas')}
                >
                <Text >Sair</Text>
                 </TouchableOpacity>

                <Text>Nome</Text>
                <TextInput
                placeholder='Nome'
                />

                <Text>Setor</Text>
                <TextInput
                placeholder='Setor'
                />

                <Text>Cargo</Text>
                <TextInput
                placeholder='Cargo'
                />

                <Text>Email</Text>
                <TextInput
                placeholder='Email'
                />

           
            </View>
        </View>
    )
}