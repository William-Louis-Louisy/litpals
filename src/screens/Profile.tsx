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
  Modal,
  FlatList,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useEffect, useRef, useState } from "react";
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
import { useFonts } from "expo-font";
import ChallengeCard from "../components/ChallengeCard";
import { IUserData } from "../interfaces/user.interface";

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
  const { isLoggedIn, setIsLoggedIn, setIsSignedUp } = useAuth();
  const [uid, setUid] = useState("");
  const [userInfo, setUserInfo] = useState<IUserData>();

  useEffect(() => {
    try {
      onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          // console.log("UUUUUUIIIIIDDDDD", uid);
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
    getUserInfo();
  }, [uid]);

  const getUserInfo = async () => {
    try {
      const data = await axios.get(`http://192.168.0.49:5000/users/${uid}`);
      // console.log(data.data.user);
      // if (data) dispatch({ type: "SET_USER_DATA", payload: data.data.user });
      if (data.status === 200) {
        setUserInfo(data.data.user);
        dispatch({
          type: "UPDATE_FIELD",
          payload: {
            field: "bookshelf",
            value: data.data.user.bookshelf,
          },
        });
      }
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

  // const openReadingJournal = () => {
  //   navigation.navigate("ReadingJournal");
  // };

  const openBookChallenge = () => {
    navigation.navigate("BookChallenge");
  };

  const getAge = () => {
    const today = new Date();
    const birthDate = new Date(
      `${userInfo?.birthdate.year}-${userInfo?.birthdate.month}-${userInfo?.birthdate.day}`
    );

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }

    return age;
  };

  return (
    <View style={{ height: "100%" }}>
      <ScrollView contentContainerStyle={styles.pageLayout}>
        <View style={styles.profileHeader}>
          <View style={styles.imgContainer}>
            {userInfo?.avatar ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: "data:image/jpeg;base64," + userInfo?.avatar,
                }}
              />
            ) : (
              <FontAwesome name="user-circle" size={100} color="black" />
            )}
          </View>
          <Text>{userInfo?.username}</Text>
          <Text>
            {userInfo?.birthdate.day}/{userInfo?.birthdate.month}/
            {userInfo?.birthdate.year}
          </Text>
          <Text>
            {getAge()} - {userInfo?.city}, FR
          </Text>
        </View>

        <View style={[styles.card, styles.mb15, { gap: 20 }]}>
          <Text style={styles.sectionTitle}>Current read</Text>
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
            <Pressable style={[styles.book, styles.shadow]}>
              <Image
                style={styles.thumbnail}
                source={{
                  uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                }}
              />
            </Pressable>
            <View style={{ gap: 20, flex: 1 }}>
              <View style={{ gap: 5 }}>
                <Text style={{ fontSize: 20, fontFamily: "Nunito-Bold" }}>
                  Un Palais d'Épines et de Roses
                </Text>
                <Text style={{ fontSize: 15, fontFamily: "Nunito-Medium" }}>
                  Sarah J Maas
                </Text>
              </View>
              <View style={{ gap: 5 }}>
                <Text style={{ fontSize: 15, fontFamily: "Nunito-Medium" }}>
                  Start date: 07/06/2024
                </Text>
                <Text style={{ fontSize: 15, fontFamily: "Nunito-Medium" }}>
                  Progress: 263 (72%)
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* <View style={[styles.card, styles.mb15, { gap: 20 }]}>
          <Text style={styles.sectionTitle}>Current read</Text>
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
            <Pressable style={[styles.book, styles.shadow]}>
              <Image
                style={styles.thumbnail}
                source={{
                  uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                }}
              />
            </Pressable>
            <View style={{ gap: 20, flex: 1 }}>
              <View style={{ gap: 5 }}>
                <Text style={{ fontSize: 20, fontFamily: "Nunito-Bold" }}>
                  Un Palais d'Épines et de Roses
                </Text>
                <Text style={{ fontSize: 15, fontFamily: "Nunito-Medium" }}>
                  Sarah J Maas
                </Text>
              </View>
              <View style={{ gap: 5 }}>
                <Text style={{ fontSize: 15, fontFamily: "Nunito-Medium" }}>
                  Start date: 07/06/2024
                </Text>
                <Text style={{ fontSize: 15, fontFamily: "Nunito-Medium" }}>
                  Progress: 263 (72%)
                </Text>
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
        </View> */}

        <View style={[styles.card, styles.mb15, { gap: 10 }]}>
          <Text style={styles.sectionTitle}>Reading challenges</Text>
          <ChallengeCard />
          {/* <View
            style={{
              backgroundColor: "#EFE6EF",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "Nunito-ExtraBold",
                color: "#543757",
                fontSize: 18,
              }}
            >
              June challenge
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  gap: 5,
                  marginTop: 10,
                  alignItems: "center",
                  borderRightWidth: 3,
                  borderColor: "#543757",
                  width: "50%",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#543757",
                    fontFamily: "Nunito-SemiBold",
                  }}
                >
                  18/20
                </Text>
                <Text style={{ color: "#543757", fontFamily: "Nunito-Medium" }}>
                  books read (90%)
                </Text>
              </View>
              <View
                style={{
                  gap: 5,
                  marginTop: 10,
                  alignItems: "center",
                  width: "50%",
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    color: "#543757",
                    fontFamily: "Nunito-SemiBold",
                  }}
                >
                  6 days
                </Text>
                <Text style={{ color: "#543757", fontFamily: "Nunito-Medium" }}>
                  left to complete
                </Text>
              </View>
            </View>
            <Pressable
              style={{ alignSelf: "center", marginTop: 10 }}
              onPress={() => setOpenChallengeBooklist(true)}
            >
              <Text
                style={{
                  color: "#543757",
                  fontFamily: "Nunito-SemiBold",
                  fontSize: 15,
                }}
              >
                See booklist
              </Text>
            </Pressable>
          </View> */}
          <Pressable
            style={styles.btnOutlinePrimary}
            onPress={openBookChallenge}
          >
            <Text style={styles.btnTextOutlinePrimary}>
              Set up new challenge
            </Text>
          </Pressable>
        </View>

        {/* <View style={[styles.card, styles.mb15]}>
          <Text>My posts</Text>
        </View> */}

        {/* <View style={styles.card}>
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
        </View> */}

        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={openChallengeBooklist}
          onRequestClose={() => setOpenChallengeBooklist(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <FontAwesome
                style={styles.deleteBook}
                onPress={() => setOpenChallengeBooklist(false)}
                name="times-circle"
                size={24}
                color="black"
              />
              <Text style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
                June challenge booklist
              </Text>
              <FlatList
                horizontal={false}
                numColumns={3}
                contentContainerStyle={{ gap: 20 }}
                columnWrapperStyle={{
                  justifyContent: "center",
                  gap: 10,
                }}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                renderItem={({ book }) => (
                  <View style={{ alignItems: "center", gap: 10 }}>
                    <Pressable style={styles.book} key={book}>
                      <Image
                        style={styles.thumbnail}
                        source={{
                          uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                        }}
                      />
                    </Pressable>
                    <Checkbox
                      style={styles.checkbox}
                      value={true}
                      color={"orange"}
                    />
                  </View>
                )}
              />
            </View>
          </View>
        </Modal> */}

        <Pressable style={styles.btnPrimary} onPress={handleLogOut}>
          <Text style={styles.btnText}>Log out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  challengeBtn: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#543757",
  },
  challengeBtnText: {
    color: "#543757",
    fontSize: 15,
    fontFamily: "Nunito-Bold",
  },
  sectionTitle: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: 22,
    color: "#331D35",
  },
  modal: {
    backgroundColor: "white",
    height: "60%",
    width: "90%",
    borderRadius: 10,
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  deleteBook: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 5,
  },
  thumbnail: {
    height: 150,
    width: 100,
    borderRadius: 5,
  },
  book: {
    height: 150,
    width: 100,
  },
  pressableSelected: {
    borderWidth: 2,
    borderColor: "orange",
    backgroundColor: "rgba(255, 222, 173, .5)",
  },
  pageLayout: {
    backgroundColor: "#FDF5ED",
    paddingHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 60,
    // justifyContent: "space-between",
    // height: "200%",
    // flex: 1,
  },
  imgContainer: {
    alignItems: "center",
    marginTop: -50,
    backgroundColor: "#FDF5ED",
    borderRadius: 200,
    borderWidth: 3,
    borderColor: "#331D35",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 200,
  },
  profileHeader: {
    backgroundColor: "#543757",
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
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
    backgroundColor: "#fefaf6",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  shadow: {
    ...Platform.select({
      android: {
        elevation: 9,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 8,
          height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,
      },
    }),
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
    fontFamily: "Nunito-Medium",
  },
  btnOutlinePrimary: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#543757",
  },
  btnTextOutlinePrimary: {
    color: "#543757",
    fontSize: 20,
    fontFamily: "Nunito-SemiBold",
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
        backgroundColor: "#fefaf6",
        paddingHorizontal: 20,
        paddingBottom: 30,
        paddingTop: 80,
      },
      profileHeader: {
        backgroundColor: "#543757",
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: "center",
        borderRadius: 20,
        marginBottom: 20,
        elevation: 18,
      },
      card: {
        backgroundColor: "#fefaf6",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        elevation: 8,
      },
    },
  }),
});
