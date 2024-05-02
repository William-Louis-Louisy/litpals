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
import SignIn from "./src/screens/SignIn";
import Toast, { BaseToast } from "react-native-toast-message";

export default function App() {
  const CustomToast = ({ text1, text2 }: { text1: string; text2: string }) => (
    <BaseToast
      style={{
        borderLeftColor: "red",
        borderLeftWidth: 4,
        height: 80,
        width: "90%",
      }}
      contentContainerStyle={{ gap: 5 }}
      text1Style={{ fontSize: 20, color: "red" }}
      text2Style={{ fontSize: 16 }}
      // text2NumberOfLines={4}
      text1={text1}
      text2={text2}
    />
  );

  const toastConfig = { error: (props: any) => <CustomToast {...props} /> };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      {/* <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app bae!</Text>
        <Btn label={"COUCOU BEBEW"} onClick={() => console.log("Je t'aime")} />
      </View> */}
      {/* <SignIn /> */}
      {/* <PersonalInfo /> */}
      {/* <MeetingProfile /> */}
      {/* <ReadingProfile /> */}
      {/* <ReadingProfile2 /> */}
      {/* <Bookshelf /> */}
      <Profile />
      <Toast config={toastConfig} />
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
