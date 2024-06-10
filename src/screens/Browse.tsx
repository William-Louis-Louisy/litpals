import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Button,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { showToast } from "../utils/Toasts";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import colors from "../constants/colors";

interface IRouterProps {
  navigation: NavigationProp<any, any>;
}

const defaultUserInfo = {
  gender: "",
  country: "",
  city: "",
};

const Browse = ({ navigation }: IRouterProps) => {
  const { state, dispatch } = useUserContext();
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isLitMatchEnabled, setIsLitMatchEnabled] = useState(
    state.personalInfo.litMatchEnabled
  );
  const { isLoggedIn, setIsLoggedIn, setIsSignedUp } = useAuth();
  const [uid, setUid] = useState("");

  useEffect(() => {
    try {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log("UUUUUUIIIIIDDDDD", uid);
          setUid(uid);
          // ...
        } else {
          // User is signed out
          // ...
          console.log("USER IN NOT LOGGED IN");
        }
      });
    } catch (error: any) {
      console.log("bllop", error.code);
    }
  }, []);

  return (
    <View>
      <Text>Browsing page</Text>
    </View>
  );
};

export default Browse;

const styles = StyleSheet.create({
  pageLayout: {
    backgroundColor: colors.light.background,
    paddingHorizontal: 20,
    paddingVertical: 30,
    // display: "flex",
    // justifyContent: "space-between",
    height: "100%",
    // flex: 1,
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "40%",
    aspectRatio: 1 / 1,
    borderRadius: 200,
  },
  profileHeader: {
    backgroundColor: colors.light.accent,
    paddingHorizontal: 20,
    paddingVertical: 30,
    display: "flex",
    alignItems: "center",
    borderEndEndRadius: 30,
    borderEndStartRadius: 30,
  },
  checkbox: {
    borderRadius: 100,
  },
  settingsCheckbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "rgba(255, 222, 173, .5)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.light.accent,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.light.accent,
    flexGrow: 1,
    maxWidth: "50%",
    textAlign: "center",
  },
  btnOutlineDiscreet: {
    borderWidth: 1,
    borderColor: "lightgray",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btnOutlineDiscreetText: {
    color: "lightgray",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  textIconBtn: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 5,
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 20,
  },
  btnPrimary: {
    width: "100%",
    backgroundColor: colors.light.accent,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  bgOrangeLight: {
    backgroundColor: "rgba(255, 222, 173, .5)",
  },
  fs20: {
    fontSize: 20,
  },
  mb15: {
    marginBottom: 15,
  },
  ...Platform.select({
    android: {
      pageLayout: {
        paddingHorizontal: 25,
        paddingVertical: 50,
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        flex: 1,
      },
    },
  }),
});
