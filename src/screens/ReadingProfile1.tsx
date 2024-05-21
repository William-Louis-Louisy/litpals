import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";

const defaultUserInfo = {
  bookTypes: [] as string[],
  readingLanguages: "",
  format: "",
};

const ReadingProfile1 = ({ navigation }: any) => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const { dispatch } = useUserContext();

  const handleSelectBookType = (type: string) => {
    if (!userInfo.bookTypes.includes(type))
      setUserInfo({ ...userInfo, bookTypes: [...userInfo.bookTypes, type] });
    else
      setUserInfo({
        ...userInfo,
        bookTypes: userInfo.bookTypes.filter(
          (existingGenre) => existingGenre !== type
        ),
      });
  };

  const handleClick = async () => {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          field: "readingInfo1",
          value: userInfo,
        },
      });
      navigateToNext();
    } catch (e) {
      console.error(e);
    }
  };

  const navigateToPrev = () => {
    navigation.goBack();
  };

  const navigateToNext = () => {
    navigation.navigate("ReadingProfile2");
  };

  return (
    <View style={styles.pageLayout}>
      <View style={styles.progressHeader}>
        <Pressable onPress={navigateToPrev}>
          <FontAwesome6 name="chevron-left" size={24} color="black" />
        </Pressable>
        <Pressable onPress={navigateToNext} style={styles.btnOutlineDiscreet}>
          <Text style={styles.btnOutlineDiscreetText}>Skip</Text>
        </Pressable>
      </View>

      <View>
        <Text style={styles.label}>BOOK TYPE</Text>
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.bookTypes.includes("paperback") &&
                styles.pressableSelected,
            ]}
            onPress={() => handleSelectBookType("paperback")}
          >
            <Ionicons name="book" size={24} color="black" />
            <Text>Paperback</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.bookTypes.includes("e-book") && styles.pressableSelected,
            ]}
            onPress={() => handleSelectBookType("e-book")}
          >
            <FontAwesome5 name="tablet-alt" size={24} color="black" />
            <Text>E-Book</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.bookTypes.includes("hardcover") &&
                styles.pressableSelected,
            ]}
            onPress={() => handleSelectBookType("hardcover")}
          >
            <FontAwesome6 name="book-bookmark" size={24} color="black" />
            <Text>Hardcover</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.bookTypes.includes("pocket-book") &&
                styles.pressableSelected,
            ]}
            onPress={() => handleSelectBookType("pocket-book")}
          >
            <FontAwesome name="book" size={24} color="black" />
            <Text>Pocket book</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.bookTypes.includes("audio-book") &&
                styles.pressableSelected,
            ]}
            onPress={() => handleSelectBookType("audio-book")}
          >
            <FontAwesome6 name="headphones" size={24} color="black" />
            <Text>Audio book</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>READING LANGUAGES</Text>
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.readingLanguages === "french" &&
                styles.pressableSelected,
            ]}
            onPress={() =>
              setUserInfo({ ...userInfo, readingLanguages: "french" })
            }
          >
            <Image
              style={styles.flag}
              source={require("../../assets/flags/france.png")}
            />
            <Text>French</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.readingLanguages === "english" &&
                styles.pressableSelected,
            ]}
            onPress={() =>
              setUserInfo({ ...userInfo, readingLanguages: "english" })
            }
          >
            <Image
              style={styles.flag}
              source={require("../../assets/flags/uk.png")}
            />
            <Text>English</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.readingLanguages === "both" && styles.pressableSelected,
            ]}
            onPress={() =>
              setUserInfo({ ...userInfo, readingLanguages: "both" })
            }
          >
            <Image
              style={styles.flag}
              source={require("../../assets/flags/uk-fr.png")}
            />
            <Text>Both</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>FORMAT</Text>
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.format === "series" && styles.pressableSelected,
            ]}
            onPress={() => setUserInfo({ ...userInfo, format: "series" })}
          >
            <Ionicons name="library" size={24} color="black" />
            <Text>Series</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.format === "standalone" && styles.pressableSelected,
            ]}
            onPress={() => setUserInfo({ ...userInfo, format: "standalone" })}
          >
            <FontAwesome6 name="book" size={24} color="black" />
            <Text>Standalone</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.format === "both" && styles.pressableSelected,
            ]}
            onPress={() => setUserInfo({ ...userInfo, format: "both" })}
          >
            <FontAwesome6 name="grin-hearts" size={24} color="black" />
            <Text>Both</Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={handleClick} style={styles.btnPrimary}>
        <Text style={styles.btnText}>Next</Text>
      </Pressable>
    </View>
  );
};

export default ReadingProfile1;

const styles = StyleSheet.create({
  pressableSelected: {
    borderWidth: 2,
    borderColor: "orange",
    backgroundColor: "rgba(255, 222, 173, .5)",
  },
  flag: {
    width: 30,
    height: 20,
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    flexWrap: "wrap",
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
    minWidth: "30%",
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
    backgroundColor: "teal",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
  },
  btnText: {
    color: "white",
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
