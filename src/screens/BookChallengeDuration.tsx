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
import React, { useEffect, useRef, useState } from "react";
import DateInput from "../components/DateInput";
import Checkbox from "expo-checkbox";

const BookChallengeDuration = ({ challenge, setChallenge }: any) => {
  const dayRef = useRef<TextInput>(null);
  const today = new Date();
  const [noTimeframe, setNoTimeframe] = useState(false);
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
    if (dayRef.current) {
      dayRef.current.focus();
    }
  };

  useEffect(() => {
    const name =
      challenge.type === "month"
        ? `${new Date().toLocaleString("en-US", {
            month: "long",
          })} Reading Marathon`
        : challenge.type === "year"
        ? `${new Date().getFullYear().toString()} Reading Challenge`
        : "";

    setChallenge({
      ...challenge,
      name,
      timeframe: { from: from, to: to },
    });
  }, [challenge.type]);

  useEffect(() => {
    if (noTimeframe)
      setChallenge({
        ...challenge,
        name: "Reading Challenge",
        timeframe: {
          from: {
            day: "",
            month: "",
            year: "",
          },
          to: {
            day: "",
            month: "",
            year: "",
          },
        },
      });
  }, [noTimeframe]);

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
            challenge.type === "month"
              ? styles.challengeBtn
              : styles.challengeBtnOutline
          }
          onPress={() => [
            setChallenge({ ...challenge, type: "month" }),
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
              challenge.type === "month"
                ? styles.challengeBtnText
                : styles.challengeBtnOutlineText
            }
          >
            Month
          </Text>
        </Pressable>
        <Pressable
          style={
            challenge.type === "year"
              ? styles.challengeBtn
              : styles.challengeBtnOutline
          }
          onPress={() => [
            setChallenge({ ...challenge, type: "year" }),
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
              challenge.type === "year"
                ? styles.challengeBtnText
                : styles.challengeBtnOutlineText
            }
          >
            Year
          </Text>
        </Pressable>
        <Pressable
          style={
            challenge.type === "custom"
              ? styles.challengeBtn
              : styles.challengeBtnOutline
          }
          onPress={() => [
            focusDateInput(),
            setChallenge({ ...challenge, type: "custom" }),
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
              challenge.type === "custom"
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
        <Pressable
          onPress={() => setNoTimeframe(!noTimeframe)}
          style={styles.checkboxContainer}
        >
          <Text style={{ fontSize: 18, fontFamily: "Nunito-Medium" }}>
            I don't want to set a timeframe
          </Text>
          <Checkbox
            style={styles.checkbox}
            value={noTimeframe}
            onValueChange={setNoTimeframe}
            color={"orange"}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default BookChallengeDuration;

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 8,
    paddingVertical: 5,
    marginTop: 20,
  },
  checkbox: {
    borderRadius: 100,
  },
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
