import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F6FA',
        padding: 16,
        flex: 1,
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
    filtroBtn: {
        backgroundColor: "#E0E3EA",
        padding: 8,
        borderRadius: 8
    },
    filtroText: {
        fontSize: 12,
        fontWeight: "bold"
    },

    select: {
        backgroundColor: "#E0E3EA",
        padding: 8,
        borderRadius: 8,
        justifyContent: "center",
        marginRight: 8
    },
    selectOption: {
        paddingHorizontal: 12,
        paddingVertical: 10
    },
    emptyText: {
        textAlign: "center",
        color: "#777",
        marginTop: 32,
        fontSize: 14
    },

    clearBtn: {
        backgroundColor: "#FF4D4D",
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8
    },

    clearText: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 12
    },

    searchContainer: {
        marginBottom: 12,
    },

    searchInput: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#E0E3EA',
        elevation: 2,
        width: '100%',
    },
});

export default styles;