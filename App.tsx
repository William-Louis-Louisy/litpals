import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Btn from "./src/components/Btn";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app bae!</Text>
      <Btn label={"COUCOU BEBEW"} onClick={() => console.log("Je t'aime")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
});
