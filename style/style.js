import { StyleSheet } from "react-native";

export const globalStyle = StyleSheet.create({
  maintext: {
    flex: 1,
    alignItems: "center",
    paddingTop: 45,
  },
  nametext: {
    color: "#2a303f",
    fontSize: 25,
    textAlign: "center",
    paddingTop: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  lessontext: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  lessoncard: {
    padding: 18,
    margin: 5,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 15,
    justifyContent: "space-between",
  },
  question: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    margin: 40,
  },
});
