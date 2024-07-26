import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

const BookProgress = () => {
  const totalPages = 263;
  const [pagesRead, setPagesRead] = useState(0);

  const handleDecrement = () => {
    if (pagesRead > 0) {
      setPagesRead(pagesRead - 1);
    }
  };

  const handleIncrement = () => {
    if (pagesRead < totalPages) {
      setPagesRead(pagesRead + 1);
    }
  };

  const handleInputChange = (text: any) => {
    const value = text.replace(/[^0-9]/g, "");
    setPagesRead(value === "" ? 0 : Math.min(parseInt(value, 10), totalPages));
  };

  const percentage = Math.floor((pagesRead / totalPages) * 100);

  return (
    <View style={styles.container}>
      {/* <View style={styles.progressBarContainer2}>
        <View style={[styles.progressBar2, { width: `${percentage}%` }]} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            marginTop: 2,
          }}
        >
          <Text
            style={{
              flex: 1,
              paddingLeft: 8,
              fontSize: 15,
              fontFamily: "Nunito-Medium",
            }}
          >
            0
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 18,
              fontFamily: "Nunito-SemiBold",
            }}
          >
            {percentage}%
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              paddingRight: 8,
              fontSize: 15,
              fontFamily: "Nunito-Medium",
            }}
          >
            {totalPages}
          </Text>
        </View>
      </View>
      <View style={styles.controls}>
        <Pressable onPress={handleDecrement}>
          <FontAwesome6
            name="circle-minus"
            size={25}
            color={pagesRead === 0 ? "gray" : "black"}
          />
        </Pressable>
        <TextInput
          style={styles.input}
          value={pagesRead.toString()}
          placeholder="0"
          keyboardType="number-pad"
          onChangeText={handleInputChange}
        />
        <Pressable onPress={handleIncrement}>
          <FontAwesome6
            name="circle-plus"
            size={25}
            color={pagesRead === totalPages ? "gray" : "black"}
          />
        </Pressable>
        <Text style={{ fontSize: 22, fontFamily: "Nunito-SemiBold" }}>
          {" "}
          pages
        </Text>
      </View> */}

      <Text
        style={{ fontSize: 18, fontFamily: "Nunito-SemiBold", marginBottom: 5 }}
      >
        You've read {percentage}% of this book
      </Text>
      <View style={styles.progressBarContainer2}>
        <View style={[styles.progressBar2, { width: `${percentage}%` }]} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            marginTop: 3,
          }}
        >
          <Text
            style={{
              flex: 1,
              paddingLeft: 10,
              fontSize: 15,
              fontFamily: "Nunito-Medium",
            }}
          >
            0
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "right",
              paddingRight: 10,
              fontSize: 15,
              fontFamily: "Nunito-Medium",
            }}
          >
            {totalPages}
          </Text>
        </View>
      </View>
      <View style={styles.controls}>
        <Pressable onPress={handleDecrement}>
          <FontAwesome6
            name="circle-minus"
            size={25}
            color={pagesRead === 0 ? "gray" : "black"}
          />
        </Pressable>
        <TextInput
          style={styles.input}
          value={pagesRead.toString()}
          placeholder="0"
          keyboardType="number-pad"
          onChangeText={handleInputChange}
        />
        <Pressable onPress={handleIncrement}>
          <FontAwesome6
            name="circle-plus"
            size={25}
            color={pagesRead === totalPages ? "gray" : "black"}
          />
        </Pressable>
        <Text style={{ fontSize: 22, fontFamily: "Nunito-SemiBold" }}>
          {" "}
          pages
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  progressText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: "#d3d3d3",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4caf50",
  },
  progressBarContainer2: {
    height: 28,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 10,

    position: "relative",

    // borderWidth: 2,
    // borderColor: "#543757",
    backgroundColor: "#d2d2d2",
  },
  progressBar2: {
    height: "100%",
    // backgroundColor: "#FFD700",
    backgroundColor: "#FFD700",
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    textAlign: "center",
    height: 40,
    width: 60,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    fontSize: 20,
    fontFamily: "Nunito-SemiBold",
  },
  slider: {
    width: "100%",
    height: 40,
  },
});

export default BookProgress;
