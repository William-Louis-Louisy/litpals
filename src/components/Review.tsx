import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Modal,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useAuth } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import Checkbox from "expo-checkbox";
import colors from "../constants/colors";
import BookChallengeGoal from "../screens/BookChallengeGoal";

interface ReviewProps {
  openReviewModal: boolean;
  setOpenReviewModal: (value: boolean) => void;
}

const Review = ({ openReviewModal, setOpenReviewModal }: ReviewProps) => {
  const { state, dispatch } = useUserContext();
  const { isLoggedIn, setIsLoggedIn, setIsSignedUp } = useAuth();
  const [uid, setUid] = useState("");
  const [notes, setNotes] = useState("");
  const [rating, setRating] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedTropes, setSelectedTropes] = useState<string[]>([]);
  // const [createdTrope, setCreatedTrope] = useState("");
  // const [createdTropesList, setCreatedTropesList] = useState<string[]>([]);
  const viewRef = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [tropeInputPosition, setTropeInputPosition] = useState(0);
  const [tropeSearch, setTropeSearch] = useState("");
  const tropes = [
    "Dark academia",
    "Dragons",
    "Enemies to lovers",
    "Fae",
    "Forced proximity",
    "Found Family",
    "Friends to lovers",
    "He falls first",
    "Pirates",
    "Slow burn",
    "Touch her and die",
    "Vampires",
    "Werewolves",
  ];
  const [allTropes, setAllTropes] = useState([...tropes]);

  useEffect(() => {
    if (tropeSearch.length > 0)
      setAllTropes([...tropes].filter((x: string) => x.includes(tropeSearch)));
    else setAllTropes([...tropes]);
  }, [tropeSearch]);

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

  const selectTropes = (trope: string) => {
    if (selectedTropes.includes(trope))
      setSelectedTropes(selectedTropes.filter((x: string) => x !== trope));
    else setSelectedTropes([...selectedTropes, trope]);
  };

  const scrollToView = () => {
    if (scrollViewRef.current && tropeInputPosition !== 0) {
      scrollViewRef.current?.scrollTo({
        y: tropeInputPosition,
        animated: true,
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={openReviewModal}
      onRequestClose={() => setOpenReviewModal(!openReviewModal)}
    >
      <View style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.progressHeader}>
          <Pressable
            onPress={() => setOpenReviewModal(!openReviewModal)}
            style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
          >
            <FontAwesome6 name="chevron-left" size={24} color="black" />
            <Text style={{ fontFamily: "Nunito-Medium", fontSize: 15 }}>
              Back
            </Text>
          </Pressable>
        </View>

        {/* CONTENT */}
        <View style={styles.modal}>
          <View style={{ flexDirection: "row" }}>
            <Pressable style={styles.book}>
              <Image
                style={styles.thumbnail}
                source={{
                  uri: "https://m.media-amazon.com/images/I/81ThRaHZbFL._SY466_.jpg",
                }}
              />
            </Pressable>
            <View>
              <Text>Un Palais d'Épines et de Roses</Text>
              <Text>Sarah J. Maas</Text>
            </View>
          </View>

          {/* STAR RATING */}
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              justifyContent: "center",
              marginTop: 20,
              marginBottom: 20,
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

          <View style={{ flex: 1 }}>
            <View
              style={{
                height: "100%",
                position: "relative",
              }}
            >
              {/* TROPES AND THEMES */}
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 2,
                  borderColor: "lightgray",
                  borderRadius: 10,
                }}
              >
                {openDropdown ? (
                  <TextInput
                    editable
                    onChangeText={(text) => setTropeSearch(text)}
                    value={tropeSearch}
                    placeholder="Search..."
                    style={{
                      borderRadius: 10,
                      paddingHorizontal: 10,
                      paddingVertical: 8,
                      fontSize: 16,
                      fontFamily: "Nunito-SemiBold",
                      textAlignVertical: "center",
                      flex: 1,
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      padding: 10,
                      fontSize: 16,
                      fontFamily: "Nunito-SemiBold",
                      textAlignVertical: "center",
                    }}
                  >
                    Select tropes and themes
                  </Text>
                )}
                <Pressable
                  style={{
                    paddingVertical: 10,
                    paddingRight: 12,
                    paddingLeft: 20,
                  }}
                  onPress={() => {
                    setOpenDropdown(!openDropdown);
                  }}
                >
                  <FontAwesome6
                    name={`chevron-${openDropdown ? "up" : "down"}`}
                    size={24}
                    color="black"
                  />
                </Pressable>
              </View>

              {openDropdown && (
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    zIndex: 9,
                    top: "15%",
                    maxHeight: "85%",
                    backgroundColor: "lightgray",
                    borderRadius: 10,
                  }}
                >
                  <FlatList
                    data={allTropes}
                    contentContainerStyle={{
                      zIndex: 9,
                      padding: 10,
                      rowGap: 5,
                    }}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          marginVertical: 5,
                        }}
                      >
                        <Checkbox
                          style={styles.checkbox}
                          value={selectedTropes.includes(item)}
                          onValueChange={() => selectTropes(item)}
                          color={"orange"}
                        />
                        <Text>{item}</Text>
                      </View>
                    )}
                  />
                </View>
              )}

              <View style={{ marginTop: 5, paddingHorizontal: 2 }}>
                {tropes.length > 0 && (
                  <FlatList
                    horizontal
                    data={selectedTropes}
                    contentContainerStyle={{
                      columnGap: 5,
                      marginBottom: 8,
                    }}
                    renderItem={({ item }) => (
                      <Text style={styles.tag}>{item}</Text>
                    )}
                    keyExtractor={(item) => item.toString()}
                  />
                )}
              </View>

              {/* REVIEW TEXT */}
              <TextInput
                editable
                multiline
                numberOfLines={8}
                onChangeText={(text) => setNotes(text)}
                value={notes}
                placeholder="Write your review..."
                style={{
                  padding: 10,
                  borderWidth: 2,
                  borderColor: "lightgray",
                  borderRadius: 10,
                  marginBottom: 10,
                  marginTop: 12,
                  fontSize: 18,
                  fontFamily: "Nunito-SemiBold",
                  textAlignVertical: "top",
                }}
              />
            </View>
          </View>

          {/* SAVE BUTTON */}
          <Pressable
            style={styles.btnPrimary}
            onPress={() => setOpenReviewModal(!openReviewModal)}
          >
            <Text style={styles.btnText}>Save review</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Review;

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    borderColor: colors.light.secondary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    color: colors.light.secondary,
    textAlign: "center",
    fontFamily: "Nunito-Medium",
  },
  half: {
    maxHeight: "50%",
  },
  full: {
    height: Dimensions.get("window").height * 0.5,
  },
  checkbox: {
    borderRadius: 100,
  },
  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    backgroundColor: "lightgray",
  },
  modal: {
    justifyContent: "space-between",
    paddingHorizontal: 25,
    flex: 1,
  },
  thumbnail: {
    height: 180,
    width: 120,
    borderRadius: 5,
  },
  book: {
    height: 180,
    width: 120,
  },
  pageLayout: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    // justifyContent: "space-between",
    // height: "200%",
    // flex: 1,
  },
  btnPrimary: {
    // width: "100%",
    backgroundColor: "#543757",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    marginHorizontal: 25,
    marginVertical: 20,
  },
  btnText: {
    color: "white",
    fontSize: 22,
    fontFamily: "Nunito-Bold",
  },
  ...Platform.select({
    android: {
      pageLayout: {
        paddingHorizontal: 25,
        paddingBottom: 20,
        flex: 1,
      },
    },
  }),
});
