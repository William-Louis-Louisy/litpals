import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Btn from "./src/components/Btn";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import PersonalInfo from "./src/screens/PersonalInfo";
import React from "react";
import MeetingProfile from "./src/screens/MeetingProfile";
import ReadingProfile from "./src/screens/ReadingProfile";
import ReadingProfile2 from "./src/screens/ReadingProfile2";
import Profile from "./src/screens/Profile";
import Bookshelf from "./src/screens/Bookshelf";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {/* <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app bae!</Text>
        <Btn label={"COUCOU BEBEW"} onClick={() => console.log("Je t'aime")} />
      </View> */}
      {/* <PersonalInfo /> */}
      {/* <MeetingProfile /> */}
      {/* <ReadingProfile /> */}
      {/* <ReadingProfile2 /> */}
      <Bookshelf />
      {/* <Profile /> */}
    </SafeAreaView>
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
