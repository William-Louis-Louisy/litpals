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

const ReadingJournal = ({ navigation }: IRouterProps) => {
  const { state, dispatch } = useUserContext();
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isLitMatchEnabled, setIsLitMatchEnabled] = useState(
    state.personalInfo.litMatchEnabled
  );
  const { isLoggedIn, setIsLoggedIn, setIsSignedUp } = useAuth();
  const [uid, setUid] = useState("");
  const [notes, setNotes] = useState("");
  const [openQuoteModal, setOpenQuoteModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [rating, setRating] = useState(0);

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

  const handleRating = (stars: number) => {
    if (rating === stars) setRating(stars - 0.5);
    else setRating(stars);
  };

  return (
    <View>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={[styles.card, styles.mb15, { gap: 20 }]}
      >
        <Text>Reading Journal</Text>
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
            <Pressable onPress={() => navigation.navigate("BookDetails")}>
              <Text style={styles.btnTextOutlinePrimary}>
                View book details
              </Text>
            </Pressable>
          </View>
        </View>
        <Pressable
          style={styles.btnOutlinePrimary}
          onPress={() => setOpenReviewModal(!openReviewModal)}
        >
          <Text style={styles.btnTextOutlinePrimary}>
            I've finished reading this book
          </Text>
        </Pressable>
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 15 }}>Start date: 07/06/2024</Text>
          <Text style={{ fontSize: 15 }}>Progress: 263 (72%)</Text>
          <Text style={{ fontSize: 15 }}>Notes:</Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            onChangeText={(text) => setNotes(text)}
            value={notes}
            style={{
              padding: 10,
              backgroundColor: "white",
              height: 90,
              borderRadius: 10,
            }}
          />
          <Text style={{ fontSize: 15 }}>Favorite quotes:</Text>
          <Pressable onPress={() => setOpenQuoteModal(!openQuoteModal)}>
            <Text style={styles.btnTextOutlinePrimary}>Add a new quote</Text>
          </Pressable>
        </View>
        <View
          style={{
            alignItems: "baseline",
            backgroundColor: "white",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            <FontAwesome6 name="quote-left" size={15} color="black" /> Hello,
            Feyre darling.{" "}
            <FontAwesome6 name="quote-right" size={15} color="black" />
          </Text>
          <Text style={{ fontSize: 15, alignSelf: "flex-end" }}>
            — Rhysand, p. 272
          </Text>
        </View>
        <View
          style={{
            alignItems: "baseline",
            backgroundColor: "white",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            <FontAwesome6 name="quote-left" size={15} color="black" /> Un truc
            vachement plus long, parce que forcément ya des gens qui vont mettre
            des pavés de 4 mètres. Tout un tralala à n'en plus finir, mais bon
            en même temps ils font bien ce qu'ils veulent.{" "}
            <FontAwesome6 name="quote-right" size={15} color="black" />
          </Text>
          <Text style={{ fontSize: 15, alignSelf: "flex-end" }}>
            — Feyre, p. 297
          </Text>
        </View>
        <View
          style={{
            alignItems: "baseline",
            backgroundColor: "white",
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 15,
          }}
        >
          <Text style={{ fontSize: 18 }}>
            <FontAwesome6 name="quote-left" size={15} color="black" /> Un truc
            juste assez long pour générer un saut de ligne.{" "}
            <FontAwesome6 name="quote-right" size={15} color="black" />
          </Text>
          <Text style={{ fontSize: 15, alignSelf: "flex-end" }}>
            — The Bone Carver, p. 305
          </Text>
        </View>

        {/* NEW QUOTE MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={openQuoteModal}
          onRequestClose={() => setOpenQuoteModal(!openQuoteModal)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text>Add a new quote</Text>
              <FontAwesome
                style={styles.deleteBook}
                onPress={() => setOpenQuoteModal(!openQuoteModal)}
                name="times-circle"
                size={24}
                color="black"
              />
              <TextInput
                editable
                multiline
                numberOfLines={4}
                onChangeText={(text) => setNotes(text)}
                value={notes}
                style={{
                  padding: 10,
                  borderWidth: 2,
                  borderColor: "lightgray",
                  height: 90,
                  borderRadius: 10,
                  marginTop: 20,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text>Said by</Text>
                <TextInput
                  editable
                  onChangeText={(text) => setNotes(text)}
                  value={notes}
                  style={{
                    padding: 10,
                    borderWidth: 2,
                    borderColor: "lightgray",
                    borderRadius: 10,
                    width: "80%",
                    marginVertical: 10,
                  }}
                />
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Text>on page</Text>
                <TextInput
                  editable
                  onChangeText={(text) => setNotes(text)}
                  value={notes}
                  style={{
                    padding: 10,
                    borderWidth: 2,
                    borderColor: "lightgray",
                    borderRadius: 10,
                    width: "80%",
                    marginVertical: 10,
                  }}
                />
              </View>
              <Pressable style={styles.btnPrimary}>
                <Text style={styles.btnText}>Add quote</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {/* REVIEW MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={openReviewModal}
          onRequestClose={() => setOpenReviewModal(!openReviewModal)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text>Add a review</Text>
              <FontAwesome
                style={styles.deleteBook}
                onPress={() => setOpenReviewModal(!openReviewModal)}
                name="times-circle"
                size={24}
                color="black"
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "center",
                  marginTop: 20,
                }}
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  return (
                    <Pressable key={star} onPress={() => handleRating(star)}>
                      {rating >= star ? (
                        <FontAwesome name="star" size={35} color="black" />
                      ) : rating === star - 0.5 ? (
                        <FontAwesome
                          name="star-half-full"
                          size={35}
                          color="black"
                        />
                      ) : (
                        <FontAwesome name="star-o" size={35} color="blac  k" />
                      )}
                    </Pressable>
                  );
                })}
              </View>
              <View style={{ gap: 20 }}>
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  onChangeText={(text) => setNotes(text)}
                  value={notes}
                  style={{
                    padding: 10,
                    borderWidth: 2,
                    borderColor: "lightgray",
                    height: 90,
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                />
                <Pressable style={styles.btnPrimary}>
                  <Text style={styles.btnText}>Done</Text>
                </Pressable>
                <Pressable
                  style={styles.btnOutlinePrimary}
                  onPress={() => setOpenReviewModal(!openReviewModal)}
                >
                  <Text style={styles.btnTextOutlinePrimary}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default ReadingJournal;

const styles = StyleSheet.create({
  deleteBook: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 5,
  },
  modal: {
    backgroundColor: "white",
    height: "60%",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
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
