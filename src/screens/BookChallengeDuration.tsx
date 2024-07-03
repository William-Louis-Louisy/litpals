import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import DateInput from "../components/DateInput";

const BookChallengeDuration = ({ navigation }: any) => {
  const dayRef = useRef<TextInput>(null);
  const today = new Date();
  const [timeframe, setTimeframe] = useState("month");
  const [from, setFrom] = useState({
    day: "01",
    month: (today.getMonth() + 1).toString().padStart(2, "0"),
    year: today.getFullYear().toString(),
  });
  const [to, setTo] = useState({
    day: new Date(today.getFullYear(), today.getMonth() + 1, 0)
      .getDate()
      .toString(),
    month: (today.getMonth() + 1).toString().padStart(2, "0"),
    year: today.getFullYear().toString(),
  });

  const focusDateInput = () => {
    console.log("custom", dayRef, dayRef.current);

    if (dayRef.current) {
      dayRef.current.focus();
    }
  };

  const navigateToPrev = () => {
    navigation.goBack();
  };

  const navigateToNext = () => {
    navigation.navigate("BookChallengeName");
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps={"never"}
      contentContainerStyle={{ gap: 30, flex: 1 }}
    >
      <Text style={{ fontFamily: "Nunito-Bold", fontSize: 22 }}>
        Would you like to set up a timeframe for this challenge ?
      </Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          style={
            timeframe === "month"
              ? styles.challengeBtn
              : styles.challengeBtnOutline
          }
          onPress={() => [
            setTimeframe("month"),
            setFrom({
              day: "01",
              month: (today.getMonth() + 1).toString().padStart(2, "0"),
              year: new Date().getFullYear().toString(),
            }),
            setTo({
              day: new Date(today.getFullYear(), today.getMonth() + 1, 0)
                .getDate()
                .toString(),
              month: (today.getMonth() + 1).toString().padStart(2, "0"),
              year: today.getFullYear().toString(),
            }),
          ]}
        >
          <Text
            style={
              timeframe === "month"
                ? styles.challengeBtnText
                : styles.challengeBtnOutlineText
            }
          >
            Month
          </Text>
        </Pressable>
        <Pressable
          style={
            timeframe === "year"
              ? styles.challengeBtn
              : styles.challengeBtnOutline
          }
          onPress={() => [
            setTimeframe("year"),
            setFrom({
              day: "01",
              month: "01",
              year: new Date().getFullYear().toString(),
            }),
            setTo({
              day: "31",
              month: "12",
              year: today.getFullYear().toString(),
            }),
          ]}
        >
          <Text
            style={
              timeframe === "year"
                ? styles.challengeBtnText
                : styles.challengeBtnOutlineText
            }
          >
            Year
          </Text>
        </Pressable>
        <Pressable
          style={
            timeframe === "custom"
              ? styles.challengeBtn
              : styles.challengeBtnOutline
          }
          onPress={() => [
            focusDateInput(),
            setTimeframe("custom"),
            setFrom({
              day: "",
              month: "",
              year: "",
            }),
            setTo({
              day: "",
              month: "",
              year: "",
            }),
          ]}
        >
          <Text
            style={
              timeframe === "custom"
                ? styles.challengeBtnText
                : styles.challengeBtnOutlineText
            }
          >
            Custom
          </Text>
        </Pressable>
      </View>
      <View style={{ gap: 20 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "Nunito-Bold", fontSize: 18 }}>From</Text>
          <DateInput bloop={from} setDate={setFrom} ref={dayRef} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Nunito-Bold",
              fontSize: 18,
            }}
          >
            To
          </Text>
          <DateInput bloop={to} setDate={setTo} />
        </View>
      </View>
    </ScrollView>
  );
};

export default BookChallengeDuration;

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
    paddingVertical: 30,
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
  },
  progressHeader: {
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
    fontFamily: "Nunito-Medium",
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
        // flex: 1,
      },
    },
  }),
});
