import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import React from "react";

const BookChallengeName = ({ challenge, setChallenge }: any) => {
  return (
    <View style={{ gap: 30, flex: 1 }}>
      <Text style={{ fontFamily: "Nunito-Bold", fontSize: 22 }}>
        How would you like to name this challenge ?
      </Text>
      <TextInput
        style={styles.input}
        value={challenge.name}
        onChangeText={(e) => setChallenge({ ...challenge, name: e })}
      />
      <Text style={{ fontFamily: "Nunito-Bold", fontSize: 22 }}>
        Would you like to add a description for this challenge ?
      </Text>
      <TextInput
        editable
        multiline
        numberOfLines={8}
        onChangeText={(text) =>
          setChallenge({ ...challenge, description: text })
        }
        value={challenge.description}
        style={{
          padding: 10,
          backgroundColor: "white",
          textAlignVertical: "top",
          // height: 90, (iOS - for 4 lines)
          borderRadius: 10,
        }}
      />
    </View>
  );
};

export default BookChallengeName;

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
  input: {
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    fontSize: 20,
    fontFamily: "Nunito-Medium",
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
