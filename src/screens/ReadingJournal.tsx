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
import BookProgress from "../components/BookProgress";
import Review from "../components/Review";

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
  const [openNoteModal, setOpenNoteModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [section, setSection] = useState("stats");
  const [pagesRead, setPagesRead] = useState(0);

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

  const navigateToPrev = () => {
    navigation.goBack();
  };

  const handleInputChange = (text: string) => {
    const value = text.replace(/[^0-9]/g, "");
    setPagesRead(value === "" ? 0 : Number(value));
  };

  return (
    <View style={styles.pageLayout}>
      <View style={styles.progressHeader}>
        <Pressable
          onPress={navigateToPrev}
          style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
        >
          <FontAwesome6 name="chevron-left" size={24} color="black" />
          <Text style={{ fontFamily: "Nunito-Medium", fontSize: 15 }}>
            Back
          </Text>
        </Pressable>
      </View>

      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View style={{ gap: 20, paddingBottom: 20 }}>
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
                <Text style={{ fontSize: 25, fontFamily: "Nunito-Bold" }}>
                  Un Palais d'Épines et de Roses
                </Text>
                <Text style={{ fontSize: 18, fontFamily: "Nunito-Medium" }}>
                  Sarah J Maas
                </Text>
              </View>
              <Pressable onPress={() => navigation.navigate("BookDetails")}>
                <Text
                  style={[
                    styles.btnTextOutlinePrimary,
                    { fontFamily: "Nunito-SemiBold" },
                  ]}
                >
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
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            style={
              section === "stats"
                ? styles.challengeBtn
                : styles.challengeBtnOutline
            }
            onPress={() => setSection("stats")}
          >
            <Text
              style={
                section === "stats"
                  ? styles.challengeBtnText
                  : styles.challengeBtnOutlineText
              }
            >
              Stats
            </Text>
          </Pressable>
          <Pressable
            style={
              section === "notes"
                ? styles.challengeBtn
                : styles.challengeBtnOutline
            }
            onPress={() => setSection("notes")}
          >
            <Text
              style={
                section === "notes"
                  ? styles.challengeBtnText
                  : styles.challengeBtnOutlineText
              }
            >
              Notes
            </Text>
          </Pressable>
          <Pressable
            style={
              section === "quotes"
                ? styles.challengeBtn
                : styles.challengeBtnOutline
            }
            onPress={() => setSection("quotes")}
          >
            <Text
              style={
                section === "quotes"
                  ? styles.challengeBtnText
                  : styles.challengeBtnOutlineText
              }
            >
              Quotes
            </Text>
          </Pressable>
        </View>

        {section === "stats" && (
          <View style={{ gap: 10, marginTop: 20 }}>
            <BookProgress />
            <Text style={styles.profileCard}>
              You started reading on 07/06/2024
            </Text>
            <Text style={styles.profileCard}>
              On average you read 10 pages per session
            </Text>
          </View>
        )}

        {section === "notes" && (
          <View style={{ gap: 10, marginTop: 20 }}>
            <Pressable
              onPress={() => setOpenNoteModal(!openNoteModal)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingVertical: 8,
                alignSelf: "flex-start",
              }}
            >
              <FontAwesome6 name="circle-plus" size={25} color="#543757" />
              <Text style={styles.btnTextOutlinePrimary}>Add a new note</Text>
            </Pressable>
            <Text
              numberOfLines={3}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 15,
                fontSize: 15,
                fontFamily: "Nunito-SemiBold",
              }}
            >
              Voici une note. Je sais pas trop ce qu'elle raconte parce que
              perso je prends pas de note alors je sais pas trop ce que les gens
              ont envie d'écrire.
            </Text>
            <Text
              numberOfLines={3}
              style={{
                backgroundColor: "white",
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 15,
                fontSize: 15,
                fontFamily: "Nunito-SemiBold",
              }}
            >
              Une autre note juste pour dire d'avoir du contenu en terme
              d'affichage, pour mieux me rendre compte. Je sais pas si ce que je
              viens d'écrire est suffisant pour être tronquer alors j'en rajoute
              un peu.
            </Text>
          </View>
        )}

        {section === "quotes" && (
          <View style={{ gap: 10, marginVertical: 20 }}>
            <Pressable
              onPress={() => setOpenQuoteModal(!openQuoteModal)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingVertical: 8,
                alignSelf: "flex-start",
              }}
            >
              <FontAwesome6 name="circle-plus" size={25} color="#543757" />
              <Text style={styles.btnTextOutlinePrimary}>Add a new quote</Text>
            </Pressable>
            <View
              style={{
                alignItems: "baseline",
                backgroundColor: "white",
                borderRadius: 5,
                paddingVertical: 10,
                paddingHorizontal: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontFamily: "Nunito-SemiBold" }}>
                <FontAwesome6 name="quote-left" size={15} color="black" />{" "}
                Hello, Feyre darling.{" "}
                <FontAwesome6 name="quote-right" size={15} color="black" />
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  alignSelf: "flex-end",
                  fontFamily: "Nunito-Medium",
                }}
              >
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
                <FontAwesome6 name="quote-left" size={15} color="black" /> Un
                truc vachement plus long, parce que forcément ya des gens qui
                vont mettre des pavés de 4 mètres. Tout un tralala à n'en plus
                finir, mais bon en même temps ils font bien ce qu'ils veulent.{" "}
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
                <FontAwesome6 name="quote-left" size={15} color="black" /> Un
                truc juste assez long pour générer un saut de ligne.{" "}
                <FontAwesome6 name="quote-right" size={15} color="black" />
              </Text>
              <Text style={{ fontSize: 15, alignSelf: "flex-end" }}>
                — The Bone Carver, p. 305
              </Text>
            </View>
          </View>
        )}

        {/* NEW NOTE MODAL */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={openNoteModal}
          onRequestClose={() => setOpenNoteModal(!openNoteModal)}
        >
          <View style={styles.modal}>
            <View style={styles.progressHeader}>
              <Pressable
                onPress={() => setOpenNoteModal(!openNoteModal)}
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <FontAwesome6 name="chevron-left" size={24} color="black" />
                <Text style={{ fontFamily: "Nunito-Medium", fontSize: 15 }}>
                  Back
                </Text>
              </Pressable>
            </View>
            <View style={{ flex: 1, gap: 10 }}>
              <Text style={{ fontSize: 22, fontFamily: "Nunito-Bold" }}>
                Create a new note
              </Text>
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
                  height: "75%",
                  borderRadius: 10,
                  marginVertical: 10,
                  fontSize: 18,
                  fontFamily: "Nunito-SemiBold",
                }}
              />
            </View>
            <Pressable
              style={styles.btnPrimary}
              onPress={() => setOpenNoteModal(!openNoteModal)}
            >
              <Text style={styles.btnText}>Create note</Text>
            </Pressable>
          </View>
        </Modal>

        {/* NEW QUOTE MODAL */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={openQuoteModal}
          onRequestClose={() => setOpenQuoteModal(!openQuoteModal)}
        >
          <View style={styles.modal}>
            <View style={styles.progressHeader}>
              <Pressable
                onPress={() => setOpenQuoteModal(!openQuoteModal)}
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <FontAwesome6 name="chevron-left" size={24} color="black" />
                <Text style={{ fontFamily: "Nunito-Medium", fontSize: 15 }}>
                  Back
                </Text>
              </Pressable>
            </View>
            <View style={{ flex: 1, gap: 10 }}>
              <Text style={{ fontSize: 22, fontFamily: "Nunito-Bold" }}>
                Add a new quote
              </Text>
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
                  height: 120,
                  borderRadius: 10,
                  marginVertical: 10,
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
                <Text style={{ fontSize: 18, fontFamily: "Nunito-SemiBold" }}>
                  said by
                </Text>
                <TextInput
                  editable
                  onChangeText={(text) => setNotes(text)}
                  value={notes}
                  style={{
                    padding: 10,
                    borderWidth: 2,
                    borderColor: "lightgray",
                    borderRadius: 10,
                    width: "75%",
                    fontSize: 18,
                    fontFamily: "Nunito-SemiBold",
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize: 18, fontFamily: "Nunito-SemiBold" }}>
                  on page
                </Text>
                <TextInput
                  editable
                  onChangeText={(text) => setNotes(text)}
                  value={notes}
                  style={{
                    padding: 10,
                    borderWidth: 2,
                    borderColor: "lightgray",
                    borderRadius: 10,
                    width: "75%",
                    fontSize: 18,
                    fontFamily: "Nunito-SemiBold",
                  }}
                />
              </View>
            </View>
            <Pressable
              style={styles.btnPrimary}
              onPress={() => setOpenQuoteModal(!openQuoteModal)}
            >
              <Text style={styles.btnText}>Add quote</Text>
            </Pressable>
          </View>
        </Modal>

        {/* REVIEW MODAL */}
        <Review
          openReviewModal={openReviewModal}
          setOpenReviewModal={setOpenReviewModal}
        />
        {/* <Modal
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
        </Modal> */}
      </ScrollView>
    </View>
  );
};

export default ReadingJournal;

const styles = StyleSheet.create({
  profileCard: {
    fontSize: 18,
    fontFamily: "Nunito-SemiBold",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  challengeBtn: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#543757",
    backgroundColor: "#543757",
  },
  challengeBtnText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Nunito-Bold",
  },
  challengeBtnOutline: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 50,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#543757",
  },
  challengeBtnOutlineText: {
    color: "#543757",
    fontSize: 15,
    fontFamily: "Nunito-Bold",
  },
  progressHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  deleteBook: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 5,
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    height: "100%",
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
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 20,
  },
  btnPrimary: {
    width: "100%",
    backgroundColor: "#543757",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 22,
    fontFamily: "Nunito-Bold",
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
        paddingHorizontal: 25,
        paddingTop: 50,
        display: "flex",
        justifyContent: "space-between",
        height: "100%",
        flex: 1,
      },
    },
  }),
});
