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
        alignItems: 'right',
    },


    headerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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
        minHeight: 50,
        maxHeight: 100,
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
        marginLeft: '98%',

    },

    placeholder: {
        height: 50,
        backgroundColor: '#e5e5e5',
        borderRadius: 25,
        marginBottom: 10
    },

    footer: {
        borderTopWidth: 1,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    bolinha: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#999'
    },

});

export default styles;