import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import BookChallengeDuration from "./BookChallengeDuration";
import BookChallengeName from "./BookChallengeName";
import BookChallengeGoal from "./BookChallengeGoal";

const BookChallenge = ({ navigation }: any) => {
  const [challenge, setChallenge] = useState({
    name: "June Reading Marathon",
    description: "",
    type: "month",
    timeframe: {
      from: {
        day: "01",
        month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
        year: new Date().getFullYear().toString(),
      },
      to: {
        day: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
          .getDate()
          .toString(),
        month: (new Date().getMonth() + 1).toString().padStart(2, "0"),
        year: new Date().getFullYear().toString(),
      },
    },
    bookQuantity: 0,
    books: [],
  });

  const [step, setStep] = useState(1);

  const navigateToPrev = () => {
    if (step === 1) navigation.goBack();
    else setStep(step - 1);
  };

  const navigateToNext = () => {
    if (step === 3) {
      navigation.navigate("Profile");
      console.log("challenge", challenge);
    } else setStep(step + 1);
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
        {step !== 3 && (
          <Pressable onPress={navigateToNext} style={styles.btnOutlineDiscreet}>
            <Text style={styles.btnOutlineDiscreetText}>Skip</Text>
          </Pressable>
        )}
      </View>

      {step === 1 ? (
        <BookChallengeDuration
          challenge={challenge}
          setChallenge={setChallenge}
        />
      ) : step === 2 ? (
        <BookChallengeName challenge={challenge} setChallenge={setChallenge} />
      ) : (
        <BookChallengeGoal challenge={challenge} setChallenge={setChallenge} />
      )}

      <Pressable onPress={navigateToNext} style={styles.btnPrimary}>
        <Text style={styles.btnText}>{step !== 3 ? "Next" : "Done"}</Text>
      </Pressable>
    </View>
  );
};

export default BookChallenge;

const styles = StyleSheet.create({
  pageLayout: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
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
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 20,
    fontFamily: "Nunito-Medium",
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
