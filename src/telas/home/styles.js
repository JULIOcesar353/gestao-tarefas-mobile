import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F6FA',
        padding: 16,
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderLeftWidth: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,

        elevation: 3
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
        marginTop: 8,
        fontSize: 13,
        color: '#2c2c2c'
    },

    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    botaoAceitar: {
        backgroundColor: '#E0E3EA',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8
    },

    textoBotao: {
        fontSize: 12,
        fontWeight: "bold"
    },

    seta: {
        fontSize: 16,
    },

    botaoSeta: {
        alignSelf: 'flex-end',
        padding: 6,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    badge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },

    badgeText: {
        color: "#FFF",
        fontSize: 12,
        fontWeight: "bold"
    },

    filtrosContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
        gap: 8,
    },

    selectBox: {
        backgroundColor: "#FFF",
        borderRadius: 8,
        width: 170,
        elevation: 3
    },
});

export default styles;