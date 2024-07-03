import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Dimensions,
  FlatList,
  ScrollView,
  Keyboard,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import axios from "axios";
import Config from "react-native-config";
import { useAuth } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";
import DateInput from "../components/DateInput";
import ShelfCreation from "../components/ShelfCreation";

const BookChallengeGoal = ({ navigation }: any) => {
  const [challenge, setChallenge] = useState({
    name: "New",
    bookQuantity: 0,
    books: [],
  });
  const challengeInputRef = useRef(null);
  const [timeframe, setTimeframe] = useState("");
  const [from, setFrom] = useState({ day: "", month: "", year: "" });
  const [to, setTo] = useState({ day: "", month: "", year: "" });
  const today = new Date();

  const focusChallengeInput = () => {
    console.log("custom");

    if (challengeInputRef.current) {
      setChallenge({ ...challenge, name: "" });
      challengeInputRef.current.focus();
    }
  };

  const navigateToPrev = () => {
    navigation.goBack();
  };

  const navigateToHome = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={{ gap: 30, flex: 1 }}>
      <View>
        <Text
          style={{
            fontFamily: "Nunito-Bold",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          Would you like to add books to this challenge ?
        </Text>
        <ShelfCreation props={"props"} />
      </View>
      <View>
        <Text
          style={{
            fontFamily: "Nunito-Bold",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          Or maybe just a number of books to read during this challenge ?
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            alignSelf: "center",
          }}
        >
          <Pressable
            onPress={() => {
              if (challenge.bookQuantity > 0) {
                setChallenge({
                  ...challenge,
                  bookQuantity: challenge.bookQuantity - 1,
                });
              }
            }}
          >
            <FontAwesome6
              name="circle-minus"
              size={30}
              color={challenge.bookQuantity === 0 ? "gray" : "black"}
            />
          </Pressable>
          <TextInput
            style={[styles.input, { textAlignVertical: "center" }]}
            value={challenge.bookQuantity.toString()}
            placeholder={"0"}
            keyboardType="number-pad"
          />
          <Pressable
            onPress={() =>
              setChallenge({
                ...challenge,
                bookQuantity: challenge.bookQuantity + 1,
              })
            }
          >
            <FontAwesome6 name="circle-plus" size={30} color="black" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default BookChallengeGoal;

const styles = StyleSheet.create({
  smallerInput: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 18,
    fontFamily: "Nunito-Bold",
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
  booksDropdownCol: {
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  booksDropdownContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: 10,
  },
  booksDropdownStyle: {
    backgroundColor: "lightgray",
    paddingTop: 10,
    height: Dimensions.get("window").height / 3,
  },
  book: {
    height: 150,
    width: 100,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    position: "relative",
    paddingTop: 10,
  },
  booksContainer: {
    // backgroundColor: "lightgray",
    marginBottom: -10,
    zIndex: 3,
    maxHeight: 160,
    paddingTop: 0,
    height: 160,
  },
  bookshelfThickness: {
    width: Dimensions.get("window").width,
    marginLeft: -20,
    height: 4,
    backgroundColor: "rgba(255, 222, 173, 1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  bookshelf: {
    width: Dimensions.get("window").width,
    height: 0,
    marginLeft: -20,
    borderLeftWidth: 20,
    borderLeftColor: "transparent",
    borderRightWidth: 20,
    borderRightColor: "transparent",
    borderBottomWidth: 25,
    borderBottomColor: "rgba(255, 222, 173, 1)",
  },
  bookshelfBg: {
    backgroundColor: "rgba(255, 222, 173, .5)",
    borderRadius: 5,
    height: 250,
  },
  pageLayout: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    justifyContent: "space-between",
    height: "100%",
  },
  progressHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
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
        paddingBottom: 30,
        justifyContent: "space-between",
        height: "100%",
      },
    },
  }),
});
