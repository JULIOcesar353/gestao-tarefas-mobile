import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F6FA',
        padding: 20,
    },

    card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 6,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,

    elevation: 5
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
    footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
},
 
    badge:{
    paddingHorizontal:10,
    paddingVertical:4,
    borderRadius:10,
}
});

export default styles;