import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import Goals from "./src/Goals";
import { api } from "./src/api";

export default function App() {
  return (
    <ApiProvider api={api}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Goals />
      </View>
    </ApiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
