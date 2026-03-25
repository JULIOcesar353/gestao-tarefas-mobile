import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
        padding: 20,
    },

    card: {
        backgroundColor: '#cfc4c4',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
    },

    headerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titulo: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    sub: {
        fontSize: 12,
        color: '#555'
    },

    descricao: {
        marginTop: 10,
        fontSize: 14,
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    botaoAceitar: {
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10
    },

    textoBotao: {
        fontSize: 12
    },

    seta: {
        fontSize: 16,
    },

    botaoSeta: {
        alignSelf: 'flex-end',
        padding: 6, // área clicável boa pro dedo
    },
});

export default styles;