import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Button,
  ScrollView,
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

const Profile = ({ navigation }: IRouterProps) => {
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

  useEffect(() => {
    console.log("isloged in", isLoggedIn);

    if (isLoggedIn) getUserInfo();
  }, [uid]);

  const getUserInfo = async () => {
    try {
      const data = await axios.get(`http://192.168.0.49:5000/users/${uid}`);
      console.log(data.data.user);
      if (data) dispatch({ type: "SET_USER_DATA", payload: data.data.user });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      FIREBASE_AUTH.signOut();
      setIsLoggedIn(false);
      setIsSignedUp(false);
      console.log("LOGGED OUT SUCCESSFULLY");
    } catch (error: any) {
      console.log(error);
    }
  };

  const openReadingJournal = () => {
    navigation.navigate("ReadingJournal");
  };

  return (
    <View style={{ height: "100%" }}>
      <View style={styles.profileHeader}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: state.personalInfo.avatar
                ? "data:image/jpeg;base64," + state.personalInfo.avatar
                : "https://source.unsplash.com/random/?woman",
            }}
          />
        </View>
        <Text>{state.personalInfo.username}</Text>
        <Text>
          {state.personalInfo.birthdate.day}/
          {state.personalInfo.birthdate.month}/
          {state.personalInfo.birthdate.year}
        </Text>
        <Text>{state.meetingInfo.city}, FR</Text>
      </View>

      <ScrollView contentContainerStyle={styles.pageLayout}>
        <View style={[styles.card, styles.mb15, { gap: 20 }]}>
          <Text>Current read</Text>
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
            <Pressable style={styles.book}>
              <Image
                style={styles.thumbnail}
                source={{
                  uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                }}
              />
            </Pressable>
            <View style={{ gap: 20, flex: 1 }}>
              <View style={{ gap: 5 }}>
                <Text style={{ fontSize: 20 }}>
                  Un Palais d'Épines et de Roses
                </Text>
                <Text style={{ fontSize: 15 }}>Sarah J Maas</Text>
              </View>
              <View style={{ gap: 5 }}>
                <Text style={{ fontSize: 15 }}>Start date: 07/06/2024</Text>
                <Text style={{ fontSize: 15 }}>Progress: 263 (72%)</Text>
              </View>
            </View>
          </View>
          <Pressable
            style={styles.btnOutlinePrimary}
            onPress={openReadingJournal}
          >
            <Text style={styles.btnTextOutlinePrimary}>
              Open reading journal
            </Text>
          </Pressable>
        </View>

        <View style={[styles.card, styles.mb15]}>
          <Text>Reading challenges</Text>
        </View>

        <View style={[styles.card, styles.mb15]}>
          <Text>My posts</Text>
        </View>

        <View style={styles.card}>
          <View>
            <Text>Favorite genres:</Text>
            <View style={styles.tagsContainer}>
              {state.readingInfo2.favoriteGenres.fiction.map(
                (genre: string) => {
                  return (
                    <Text key={genre} style={styles.tag}>
                      {genre}
                    </Text>
                  );
                }
              )}
            </View>
          </View>
        </View>

        <Pressable style={styles.btnPrimary} onPress={handleLogOut}>
          <Text style={styles.btnText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  thumbnail: {
    height: 150,
    width: 100,
    borderRadius: 5,
  },
  book: {
    height: 150,
    width: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    position: "relative",
  },
  pressableSelected: {
    borderWidth: 2,
    borderColor: "orange",
    backgroundColor: "rgba(255, 222, 173, .5)",
  },
  pageLayout: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    // justifyContent: "space-between",
    // height: "200%",
    // flex: 1,
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "30%",
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
    backgroundColor: "#fbe0b1",
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
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  btnOutlinePrimary: {
    width: "100%",
    // backgroundColor: colors.light.accent,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.light.accent,
  },
  btnTextOutlinePrimary: {
    color: colors.light.accent,
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
