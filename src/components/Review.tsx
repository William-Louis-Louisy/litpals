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
  KeyboardAvoidingView,
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
  const [tropes, setTropes] = useState<any>({ selected: [], created: [] });
  const [createdTrope, setCreatedTrope] = useState("");
  const viewRef = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [tropeInputPosition, setTropeInputPosition] = useState(0);

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

  const selectTropes = (trope: string, category: "selected" | "created") => {
    if (tropes[category].includes(trope))
      setTropes({
        ...tropes,
        [category]: tropes[category].filter((x: string) => x !== trope),
      });
    else setTropes({ ...tropes, [category]: [...tropes[category], trope] });
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
      {/* <View
        style={styles.pageLayout}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
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

      <ScrollView contentContainerStyle={styles.modal} ref={scrollViewRef}>
        {/* <View style={styles.modal}> */}
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
          }}
        >
          {[1, 2, 3, 4, 5].map((star) => {
            return (
              <Pressable key={star} onPress={() => handleRating(star)}>
                {rating >= star ? (
                  <FontAwesome name="star" size={35} color="black" />
                ) : rating === star - 0.5 ? (
                  <FontAwesome name="star-half-full" size={35} color="black" />
                ) : (
                  <FontAwesome name="star-o" size={35} color="blac  k" />
                )}
              </Pressable>
            );
          })}
        </View>

        <View
          onLayout={(e) => {
            setTropeInputPosition(e.nativeEvent.layout.y);
          }}
          style={[
            openDropdown && styles.full,
            {
              position: "relative",
              backgroundColor: openDropdown ? "green" : "teal",
            },
          ]}
        >
          {!openDropdown && (
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 12,
                borderWidth: 2,
                borderColor: "lightgray",
                borderRadius: 10,
                justifyContent: "space-between",
                position: "absolute",
                width: "100%",
              }}
              onPress={() => {
                setOpenDropdown(!openDropdown);
                scrollToView();
              }}
            >
              {tropes.length > 0 ? (
                <Text>{tropes.length} selected</Text>
              ) : (
                <Text style={{ fontSize: 18, fontFamily: "Nunito-SemiBold" }}>
                  Select tropes
                </Text>
              )}
              <FontAwesome6 name="chevron-down" size={24} color="black" />
            </Pressable>
          )}
          {openDropdown && (
            <View
              style={{
                position: "absolute",
                width: "100%",
                zIndex: 9,
              }}
              ref={viewRef}
              // onLayout={(e) => {
              //   console.log(e.nativeEvent.layout.y);
              //   setTropeInputPosition(e.nativeEvent.layout.y);
              // }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderWidth: 2,
                  borderColor: "lightgray",
                  borderRadius: 10,
                }}
              >
                <TextInput
                  editable
                  multiline={false}
                  onChangeText={(text) => setNotes(text)}
                  value={notes}
                  placeholder="Search..."
                  style={{
                    padding: 10,
                    fontSize: 18,
                    fontFamily: "Nunito-SemiBold",
                    flex: 1,
                  }}
                />
                <Pressable
                  onPress={() => setOpenDropdown(!openDropdown)}
                  style={{ paddingHorizontal: 10 }}
                >
                  <FontAwesome6 name="chevron-up" size={24} color="black" />
                </Pressable>
              </View>

              <View
                style={{
                  backgroundColor: "pink",
                  padding: 10,
                  // maxHeight: "50%",
                }}
              >
                <ScrollView>
                  {[1, 2, 3, 4, 5, 6].map((trope) => {
                    return (
                      <View
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          marginVertical: 5,
                        }}
                      >
                        <Checkbox
                          style={styles.checkbox}
                          value={tropes.selected.includes(`Trope ${trope}`)}
                          onValueChange={() =>
                            selectTropes(`Trope ${trope}`, "selected")
                          }
                          color={"orange"}
                        />
                        <Text>Trope {trope}</Text>
                      </View>
                    );
                  })}
                </ScrollView>
                <Text>Other:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                  }}
                >
                  <TextInput
                    style={{
                      backgroundColor: "white",
                      flex: 1,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                    onChangeText={setCreatedTrope}
                    value={createdTrope}
                  />
                  <Pressable
                    style={{
                      backgroundColor: "lightblue",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}
                    onPress={(e) => {
                      setTropes({
                        ...tropes,
                        created: [...tropes.created, createdTrope],
                      });
                      setCreatedTrope("");
                    }}
                  >
                    <Text>Add</Text>
                  </Pressable>
                </View>
                {tropes.created.length > 0 && (
                  <View>
                    <Text
                      style={{
                        borderTopWidth: 2,
                        marginTop: 10,
                        paddingTop: 5,
                      }}
                    >
                      Created:
                    </Text>
                    {tropes.created.map((trope: string) => (
                      <Text>{trope}</Text>
                    ))}
                  </View>
                )}

                {tropes.selected.length > 0 && (
                  <View>
                    <Text
                      style={{
                        borderTopWidth: 2,
                        marginTop: 10,
                        paddingTop: 5,
                      }}
                    >
                      Selected:
                    </Text>
                    {tropes.selected.map((trope: string) => {
                      return (
                        <View
                          style={{
                            flexDirection: "row",
                            gap: 5,
                            marginVertical: 5,
                          }}
                        >
                          <Checkbox
                            style={styles.checkbox}
                            value={tropes.selected.includes(trope)}
                            onValueChange={() =>
                              selectTropes(trope, "selected")
                            }
                            color={"orange"}
                          />
                          <Text>{trope}</Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </View>
          )}

          <TextInput
            editable
            multiline
            numberOfLines={8}
            onChangeText={(text) => setNotes(text)}
            value={notes}
            style={{
              padding: 10,
              borderWidth: 2,
              borderColor: "lightgray",
              borderRadius: 10,
              marginBottom: 10,
              marginTop: 75,
              fontSize: 18,
              fontFamily: "Nunito-SemiBold",
              textAlignVertical: "top",
            }}
          />
        </View>

        {/* </View> */}
      </ScrollView>
      <Pressable
        style={styles.btnPrimary}
        onPress={() => setOpenReviewModal(!openReviewModal)}
      >
        <Text style={styles.btnText}>Save review</Text>
      </Pressable>
      {/* </View> */}
    </Modal>
  );
};

export default Review;

const styles = StyleSheet.create({
  half: {
    maxHeight: "50%",
  },
  full: {
    height: Dimensions.get("window").height * 0.75,
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
    // height: "120%",
    paddingHorizontal: 25,
    backgroundColor: "coral",
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
