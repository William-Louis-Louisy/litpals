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
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from "@expo/vector-icons";

const defaultUserInfo = {
  gender: "",
  country: "",
  city: "",
};

const MeetingProfile = () => {
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
        <Text style={styles.label}>GENDER</Text>
        <View style={styles.flexContainer}>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="venus" size={24} color="black" />
            <Text>Male</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="mars" size={24} color="black" />
            <Text>Female</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="ellipsis" size={24} color="black" />
            <Text>Other</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>COUNTRY</Text>
        <TextInput
          style={[styles.input, styles.mb15]}
          value={userInfo.country}
          placeholder={"Username"}
        />
        <Text style={styles.label}>CITY</Text>
        <TextInput
          style={[styles.input, styles.mb15]}
          value={userInfo.city}
          placeholder={"Username"}
        />

        <Text style={styles.label}>LOOKING FOR</Text>
        <View style={styles.flexContainer}>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome name="heart" size={24} color="black" />
            <Text>Love</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="handshake-angle" size={24} color="black" />
            <Text>Friendship</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="grin-stars" size={24} color="black" />
            <Text>Both</Text>
          </Pressable>
        </View>

        <View style={styles.flexContainer}>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome name="laptop" size={24} color="black" />
            <Text>Online</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome5 name="glass-cheers" size={24} color="black" />
            <Text>IRL</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome name="comments" size={24} color="black" />
            <Text>Both</Text>
          </Pressable>
        </View>

        <View style={styles.flexContainer}>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="venus" size={24} color="black" />
            <Text>Male</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="mars" size={24} color="black" />
            <Text>Female</Text>
          </Pressable>
          <Pressable style={styles.textIconBtn}>
            <FontAwesome6 name="venus-mars" size={24} color="black" />
            <Text>No matter</Text>
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

export default MeetingProfile;

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
