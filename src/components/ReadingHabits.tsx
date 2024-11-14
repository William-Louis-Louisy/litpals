import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { IUserData } from "../interfaces/user.interface";

interface IProps {
  userInfo: IUserData;
  setUserInfo: Dispatch<SetStateAction<IUserData>>;
}

const ReadingHabits = ({ userInfo, setUserInfo }: IProps) => {
  const handleSelectBookType = (type: string) => {
    if (!userInfo.readingHabits.bookTypes.includes(type))
      setUserInfo({
        ...userInfo,
        readingHabits: {
          ...userInfo.readingHabits,
          bookTypes: [...userInfo.readingHabits.bookTypes, type],
        },
      });
    else
      setUserInfo({
        ...userInfo,
        readingHabits: {
          ...userInfo.readingHabits,
          bookTypes: userInfo.readingHabits.bookTypes.filter(
            (existingGenre) => existingGenre !== type
          ),
        },
      });
  };

  return (
    <View style={styles.content}>
      <View>
        <Text style={styles.label}>Book Type</Text>
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.readingHabits.bookTypes.includes("paperback") &&
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
              userInfo.readingHabits.bookTypes.includes("e-book") &&
                styles.pressableSelected,
            ]}
            onPress={() => handleSelectBookType("e-book")}
          >
            <FontAwesome5 name="tablet-alt" size={24} color="black" />
            <Text>E-Book</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.readingHabits.bookTypes.includes("hardcover") &&
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
              userInfo.readingHabits.bookTypes.includes("pocket-book") &&
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
              userInfo.readingHabits.bookTypes.includes("audio-book") &&
                styles.pressableSelected,
            ]}
            onPress={() => handleSelectBookType("audio-book")}
          >
            <FontAwesome6 name="headphones" size={24} color="black" />
            <Text>Audio book</Text>
          </Pressable>
        </View>
      </View>

      <View>
        <Text style={styles.label}>Reading Languages</Text>
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.readingHabits.readingLanguages === "french" &&
                styles.pressableSelected,
            ]}
            onPress={() =>
              setUserInfo({
                ...userInfo,
                readingHabits: {
                  ...userInfo.readingHabits,
                  readingLanguages: "french",
                },
              })
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
              userInfo.readingHabits.readingLanguages === "english" &&
                styles.pressableSelected,
            ]}
            onPress={() =>
              setUserInfo({
                ...userInfo,
                readingHabits: {
                  ...userInfo.readingHabits,
                  readingLanguages: "english",
                },
              })
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
              userInfo.readingHabits.readingLanguages === "both" &&
                styles.pressableSelected,
            ]}
            onPress={() =>
              setUserInfo({
                ...userInfo,
                readingHabits: {
                  ...userInfo.readingHabits,
                  readingLanguages: "both",
                },
              })
            }
          >
            <Image
              style={styles.flag}
              source={require("../../assets/flags/uk-fr.png")}
            />
            <Text>Both</Text>
          </Pressable>
        </View>
      </View>

      <View>
        <Text style={styles.label}>Format</Text>
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.readingHabits.format === "serie" &&
                styles.pressableSelected,
            ]}
            onPress={() =>
              setUserInfo({
                ...userInfo,
                readingHabits: {
                  ...userInfo.readingHabits,
                  format: "serie",
                },
              })
            }
          >
            <Ionicons name="library" size={24} color="black" />
            <Text>Series</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.readingHabits.format === "standalone" &&
                styles.pressableSelected,
            ]}
            onPress={() =>
              setUserInfo({
                ...userInfo,
                readingHabits: {
                  ...userInfo.readingHabits,
                  format: "standalone",
                },
              })
            }
          >
            <FontAwesome6 name="book" size={24} color="black" />
            <Text style={styles.textMed}>Standalone</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.readingHabits.format === "both" &&
                styles.pressableSelected,
            ]}
            onPress={() =>
              setUserInfo({
                ...userInfo,
                readingHabits: {
                  ...userInfo.readingHabits,
                  format: "both",
                },
              })
            }
          >
            <FontAwesome6
              name="grin-hearts"
              size={24}
              color={colors.light.textPrimary}
            />
            <Text style={styles.textMed}>Both</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ReadingHabits;

const styles = StyleSheet.create({
  textMed: {
    fontFamily: "Nunito-Medium",
    color: colors.light.textPrimary,
  },
  content: {
    gap: 30,
  },
  pressableSelected: {
    borderWidth: 2,
    borderColor: "orange",
    backgroundColor: "rgba(255, 222, 173, .5)",
  },
  flag: {
    width: 30,
    height: 20,
  },
  flexContainer: {
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
    marginBottom: 10,
    fontSize: 22,
    fontFamily: "Nunito-SemiBold",
    color: colors.light.secondary,
  },
});
