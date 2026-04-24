import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    containerLogin: {
        backgroundColor: '#ffffff',
        width: '100%',
        borderRadius: 16,
        padding: 25,        
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#0f172a',
        marginBottom: 20,
        textAlign: 'center'
    },

    label: {
        fontSize: 16,
        color: '#64748b',
        marginTop: 10,
        fontWeight:'bold',
    },

    input: {
        width: '100%',
        backgroundColor: '#f8fafc',
        borderRadius: 10,
        height: 45,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginTop: 5
    },

   
    botao: {
        backgroundColor: '#2563eb',
        width: '100%',
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 25,
        padding: 12,
    },

    txtBotao: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },


    botaoOlho: {
        position: 'absolute',
        right: 10,
        top: 18
    },

    errorText: {
        color: '#dc2626',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 12,
        textAlign: 'center'
    },
});

export default styles;