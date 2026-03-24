import { View, Text, TouchableOpacity } from 'react-native'; 
import {  useNavigation } from '@react-navigation/native';

export default function historico() {

    const navigation = useNavigation();

    return (
        <View>
            <Text>historico</Text>

            <TouchableOpacity onPress={() => navigation.navigate('GestaoTarefas')}>
                <Text>Acessar sistema</Text>
            </TouchableOpacity>
        </View>
    )
}