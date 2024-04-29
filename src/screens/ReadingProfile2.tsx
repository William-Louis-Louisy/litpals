import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

const defaultUserInfo = {
  gender: "",
  country: "",
  city: "",
};

const ReadingProfile2 = () => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  const onPressFunction = () => {
    console.log("I was pressed");
  };

  return (
    <View style={styles.pageLayout}>
      <View style={styles.progressHeader}>
        <Pressable>
          <FontAwesome6 name="chevron-left" size={24} color="black" />
        </Pressable>
        <Pressable style={styles.btnOutlineDiscreet}>
          <Text style={styles.btnOutlineDiscreetText}>Skip</Text>
        </Pressable>
      </View>

      <View>
        <Text style={styles.label}>FORMAT</Text>
        <View style={styles.flexContainer}>
          <Pressable style={styles.textIconBtn}>
            <Ionicons name="book" size={24} color="black" />
            <Text>Paperback</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome5 name="tablet-alt" size={24} color="black" />
            <Text>E-Book</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="book-bookmark" size={24} color="black" />
            <Text>Hardcover</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome name="book" size={24} color="black" />
            <Text>Pocket book</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="headphones" size={24} color="black" />
            <Text>Audio book</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>READING LANGUAGES</Text>
        <View style={styles.flexContainer}>
            <Pressable style={styles.textIconBtn}>
            <FontAwesome name="book" size={24} color="black" />
            <Text>French</Text>
            </Pressable>
            <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="headphones" size={24} color="black" />
            <Text>English</Text>
            </Pressable>
            <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="headphones" size={24} color="black" />
            <Text>Both</Text>
            </Pressable>
        </View>

        <Text style={styles.label}>CITY</Text>
        <View style={styles.flexContainer}>
            <Pressable style={styles.textIconBtn}>
            <Ionicons name="library" size={24} color="black" />
            <Text>Sagas</Text>
            </Pressable>
            <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="book" size={24} color="black" />
            <Text>Standalone</Text>
            </Pressable>
            <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="grin-hearts" size={24} color="black" />
            <Text>Both</Text>
            </Pressable>
        </View>
        


        {/* <Dropdown
            data={accountTypes}
            labelField="label"
            valueField="value"
            placeholder="Choose your account type:"
            onChange={(e) => setAccountType(e.value)}
            style={[styles.input, styles.mb15]}
            value={accountType}
          /> */}
      </View>

      <Pressable onPress={onPressFunction} style={styles.btnPrimary}>
        <Text style={styles.btnText}>Next</Text>
      </Pressable>
    </View>
  );
};

export default ReadingProfile2;

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
