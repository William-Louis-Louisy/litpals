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
  Dimensions,
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

const LitPal = ({ navigation }: IRouterProps) => {
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

  const rating = 3.5;

  return (
    <ScrollView contentContainerStyle={styles.pageLayout}>
      <Text
        style={{
          fontSize: 26,
          fontFamily: "Nunito-ExtraBold",
          marginBottom: 20,
        }}
      >
        Some page title
      </Text>
      <View style={{ gap: 30 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: "Nunito-Bold" }}>
            You're both currently reading Un Palais d'Épines et de Roses
          </Text>
          <View style={styles.userCard}>
            <View
              style={{
                backgroundColor: "lightblue",
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 2,
              }}
            ></View>
            <Text style={{ fontFamily: "Nunito-ExtraBold" }}>Username401</Text>
            <Pressable
              style={{
                backgroundColor: "#543757",
                borderRadius: 50,
                paddingVertical: 5,
                paddingHorizontal: 8,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontFamily: "Nunito-Bold" }}>
                Chat now
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: "Nunito-Bold" }}>
            You both have Nevernight in your TBR
          </Text>
          <View style={styles.userCard}>
            <View
              style={{
                backgroundColor: "lightblue",
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 2,
              }}
            ></View>
            <Text style={{ fontFamily: "Nunito-ExtraBold" }}>Username401</Text>
            <Pressable
              style={{
                backgroundColor: "#543757",
                borderRadius: 50,
                paddingVertical: 5,
                paddingHorizontal: 8,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontFamily: "Nunito-Bold" }}>
                Plan read
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: "Nunito-Bold" }}>
            Godkiller is a favorite for both of you
          </Text>
          <View style={styles.userCard}>
            <View
              style={{
                backgroundColor: "lightblue",
                width: 60,
                height: 60,
                borderRadius: 50,
                borderWidth: 2,
              }}
            ></View>
            <Text style={{ fontFamily: "Nunito-ExtraBold" }}>Username401</Text>
            <Pressable
              style={{
                backgroundColor: "#543757",
                borderRadius: 50,
                paddingVertical: 5,
                paddingHorizontal: 8,
                width: "100%",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontFamily: "Nunito-Bold" }}>
                View profile
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: "Nunito-Bold" }}>
            Reviews that might interest you
          </Text>
          <View style={styles.userCard2}>
            <Pressable style={styles.book}>
              <Image
                style={styles.thumbnail}
                source={{
                  uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                }}
              />
            </Pressable>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "lightblue",
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    borderWidth: 2,
                  }}
                ></View>
                <Text style={{ fontFamily: "Nunito-ExtraBold" }}>
                  Username401
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  return (
                    <Pressable key={star}>
                      {star <= rating ? (
                        <FontAwesome name="star" size={20} color="black" />
                      ) : star <= rating + 0.5 ? (
                        <FontAwesome
                          name="star-half-full"
                          size={20}
                          color="black"
                        />
                      ) : (
                        <FontAwesome name="star-o" size={20} color="blac  k" />
                      )}
                    </Pressable>
                  );
                })}
              </View>
              <Pressable
                style={{
                  backgroundColor: "#543757",
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 8,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontFamily: "Nunito-Bold" }}>
                  Read review
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: "Nunito-Bold" }}>
            Challenges you may want to join
          </Text>
          <View style={styles.userCard2}>
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <View
                  style={{
                    backgroundColor: "lightblue",
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    borderWidth: 2,
                  }}
                ></View>
                <Text style={{ fontFamily: "Nunito-ExtraBold" }}>
                  Username401
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Pressable style={styles.book2}>
                  <Image
                    style={styles.thumbnail2}
                    source={{
                      uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                    }}
                  />
                </Pressable>
                <Pressable style={styles.book2}>
                  <Image
                    style={styles.thumbnail2}
                    source={{
                      uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                    }}
                  />
                </Pressable>
                <Pressable style={styles.book2}>
                  <Image
                    style={styles.thumbnail2}
                    source={{
                      uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                    }}
                  />
                </Pressable>
              </View>
              <Pressable
                style={{
                  backgroundColor: "#543757",
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 8,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontFamily: "Nunito-Bold" }}>
                  Join challenge
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: "Nunito-Bold" }}>
            Fantasy bookshelves you might enjoy
          </Text>
          <Pressable>
            <Text>Explore bookshelf</Text>
          </Pressable>
        </View>

        <View style={{ gap: 10 }}>
          <Text style={{ fontSize: 18, fontFamily: "Nunito-Bold" }}>
            Bookshelves featuring books by Sarah J. Maas
          </Text>
          <Pressable>
            <Text>Explore bookshelf</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default LitPal;

const styles = StyleSheet.create({
  thumbnail2: {
    height: 90,
    width: 60,
    borderRadius: 5,
  },
  book2: {
    height: 90,
    width: 60,
  },
  thumbnail: {
    height: 120,
    width: 80,
    borderRadius: 5,
  },
  book: {
    height: 120,
    width: 80,
  },
  userCard2: {
    backgroundColor: "#EFE6EF",
    borderRadius: 5,
    padding: 10,
    width: ((Dimensions.get("window").width - 40) / 3) * 2,
    gap: 10,
    flexDirection: "row",
  },
  userCard: {
    backgroundColor: "#EFE6EF",
    borderRadius: 5,
    padding: 10,
    width: (Dimensions.get("window").width - 40) / 3,
    alignItems: "center",
    gap: 5,
  },
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
        backgroundColor: "white",
      },
    },
  }),
});
