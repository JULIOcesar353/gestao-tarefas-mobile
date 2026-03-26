import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16
  },

  // filtros
  filtrosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
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

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    borderLeftWidth: 5
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  titulo: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    marginRight: 8
  },
  descricao: {
    marginTop: 8,
    color: "#666"
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12
  },
  info: {
    fontSize: 12,
    color: "#555"
  },
  footer: {
    marginTop: 10
  },
  criado: {
    fontSize: 11,
    color: "#999"
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8
  },
  badgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold"
  }
});