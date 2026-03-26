import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#f1f5f9', 
        alignItems: 'center',
        paddingTop: 40
    },

    img: {
        borderRadius: 60,
        height: 120,
        width: 120,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#2563eb'
    },

    containerItem:{
        backgroundColor: '#ffffff',
        width: '90%',
        borderRadius: 16,
        padding: 20,
        elevation: 4, // sombra android
        shadowColor: '#000', // sombra ios
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    text: {
        gap: 10
    },

    label: {
        fontSize: 14,
        color: '#64748b',
        marginTop: 10
    },

    input:{
        width: '100%',
        backgroundColor: '#f8fafc',
        borderRadius: 10,
        height: 45,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb'
    },

    botao:{
        alignItems: 'center',
        backgroundColor: '#2563eb',          
        width: '90%',
        borderRadius: 12,
        marginTop: 30,
        padding: 12,
    },

    txtBotao:{
        fontSize: 18,
        fontWeight:'bold',
        color: '#fff'
    },
});

export default styles;