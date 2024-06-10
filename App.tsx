import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Btn from "./src/components/Btn";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import PersonalInfo from "./src/screens/PersonalInfo";
import React, { useEffect, useState } from "react";
import MeetingProfile from "./src/screens/MeetingProfile";
import ReadingProfile from "./src/screens/ReadingProfile2";
import ReadingProfile2 from "./src/screens/ReadingProfile1";
import Profile from "./src/screens/Profile";
import Bookshelf from "./src/screens/Bookshelf";
import Toast, { BaseToast } from "react-native-toast-message";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { AuthProvider } from "./src/contexts/AuthContext";
import Routes from "./src/routes/Routes";
import { UserProvider } from "./src/contexts/UserContext";
import "react-native-reanimated";
import colors from "./src/constants/colors";

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

  // useEffect(() => {
  //   onAuthStateChanged(FIREBASE_AUTH, (user) => {
  //     console.log("USER", user);
  //     setUser(user);
  //   });
  // }, []);

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 0, backgroundColor: "#F6D0A2" }} />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: colors.light.background }}
      >
        <UserProvider>
          {/* <StatusBar backgroundColor={colors.light.accent} /> */}
          {/* <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app bae!</Text>
        <Btn label={"COUCOU BEBEW"} onClick={() => console.log("Je t'aime")} />
      </View> */}
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
          <Toast config={toastConfig} />
        </UserProvider>
      </SafeAreaView>
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
