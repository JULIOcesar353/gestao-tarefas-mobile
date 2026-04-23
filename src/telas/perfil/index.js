import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

import styles from './styles.js'

export default function Perfil() {
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permissão para acessar a galeria é necessária!');
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                <Image
                    source={image ? {uri: image} : require('../../../assets/bolsonaro.jpg')}
                    style={styles.img}
                />
            </TouchableOpacity>
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