import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Text, View } from "react-native";
import Btn from "./src/components/Btn";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import PersonalInfo from "./src/screens/PersonalInfo";
import React, { useEffect, useState } from "react";
import MeetingProfile from "./src/screens/MeetingProfile";
import ReadingProfile from "./src/screens/ReadingProfile2";
import ReadingProfile2 from "./src/screens/ReadingProfile1";
import Profile from "./src/screens/Profile";
import Bookshelf from "./src/screens/InitialBookshelf";
import Toast, { BaseToast } from "react-native-toast-message";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { AuthProvider } from "./src/contexts/AuthContext";
import Routes from "./src/routes/Routes";
import { UserProvider } from "./src/contexts/UserContext";
import "react-native-reanimated";
import colors from "./src/constants/colors";
import * as NavigationBar from "expo-navigation-bar";
import { FontProvider } from "./src/contexts/FontContext";

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

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync("inset-swipe");
    }
  }, []);

  // useEffect(() => {
  //   if (Platform.OS === "android") {
  //     NavigationBar.setVisibilityAsync("hidden");
  //     NavigationBar.setBehaviorAsync("overlay-swipe");
  //   }
  // }, []);

  // const AppLayout = () => {
  //   return (
  //     <AppStack.Navigator>
  //       <AppStack.Screen
  //         name="profile"
  //         component={Profile}
  //         options={{ headerShown: false }}
  //       />
  //     </AppStack.Navigator>
  //   );
  // };

  // const [user, setUser] = useState<User | null>(null);

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FDF5ED" }}>
        <UserProvider>
          <FontProvider>
            <StatusBar backgroundColor={"white"} />
            {/* <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app bae!</Text>
        <Btn label={"COUCOU BEBEW"} onClick={() => console.log("Je t'aime")} />
      </View> */}
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
            <Toast config={toastConfig} />
          </FontProvider>
        </UserProvider>
      </SafeAreaView>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: "#543757",
        }}
      ></SafeAreaView>
    </AuthProvider>
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
