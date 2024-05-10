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
import React, { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import axios from "axios";
import Config from "react-native-config";
import { useUserContext } from "../contexts/UserContext";

const defaultUserInfo = {
  username: "",
  birthdate: {
    day: "",
    month: "",
    year: "",
  },
  birthdatePrivate: false,
  accountType: "reader",
  litMatchEnabled: false,
};

const PersonalInfo = ({ navigation }: any) => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isBirthdatePrivate, setIsBirthdatePrivate] = useState(false);
  const [isLitMatchEnabled, setIsLitMatchEnabled] = useState(false);
  const [accountType, setAccountType] = useState("reader");
  const { state, dispatch } = useUserContext();
  const accountTypes = [
    { label: "Reader", value: "reader" },
    { label: "Author", value: "author" },
    { label: "Content creator", value: "content-creator" },
    { label: "Book merch maker", value: "merch-maker" },
  ];

  const handleClick = async () => {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          field: "personalInfo",
          value: {
            ...userInfo,
            birthdatePrivate: isBirthdatePrivate,
            accountType,
            litMatchEnabled: isLitMatchEnabled,
          },
        },
      });
      navigateToNext();
    } catch (e) {
      console.error(e);
    }
  };

  const navigateToNext = () => {
    navigation.navigate("MeetingProfile");
  };

  return (
    <View style={styles.pageLayout}>
      <View>
        <View style={styles.imgContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://source.unsplash.com/random/?woman",
            }}
          />
        </View>
        <Text style={styles.label}>USERNAME</Text>
        <TextInput
          style={[styles.input, styles.mb15]}
          value={userInfo.username}
          placeholder={"Username"}
          onChangeText={(e) => setUserInfo({ ...userInfo, username: e })}
          // autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
        />
        <View style={styles.twoColContainer}>
          <View>
            <Text style={styles.label}>BIRTHDATE</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={styles.input}
                value={userInfo.birthdate.day}
                placeholder={"jj"}
                keyboardType="number-pad"
                onChangeText={(e) =>
                  setUserInfo({
                    ...userInfo,
                    birthdate: { ...userInfo.birthdate, day: e },
                  })
                }
              />
              <Text style={styles.slash}>/</Text>
              <TextInput
                style={styles.input}
                value={userInfo.birthdate.month}
                placeholder={"mm"}
                keyboardType="number-pad"
                onChangeText={(e) =>
                  setUserInfo({
                    ...userInfo,
                    birthdate: { ...userInfo.birthdate, month: e },
                  })
                }
              />
              <Text style={styles.slash}>/</Text>
              <TextInput
                style={styles.input}
                value={userInfo.birthdate.year}
                placeholder={"aaaa"}
                keyboardType="number-pad"
                onChangeText={(e) =>
                  setUserInfo({
                    ...userInfo,
                    birthdate: { ...userInfo.birthdate, year: e },
                  })
                }
              />
            </View>
          </View>
          <Pressable
            onPress={() => setIsBirthdatePrivate(!isBirthdatePrivate)}
            style={styles.checkboxContainer}
          >
            <Checkbox
              style={styles.checkbox}
              value={isBirthdatePrivate}
              onValueChange={setIsBirthdatePrivate}
              color={"orange"}
            />
            <Text>Private</Text>
          </Pressable>
        </View>
        <Text style={styles.mb15}>
          Please note that if you enable LitMatch, your age will be displayed on
          your profile for compatibility purposes.
        </Text>

        <Dropdown
          data={accountTypes}
          labelField="label"
          valueField="value"
          placeholder="Choose your account type:"
          onChange={(e) => setAccountType(e.value)}
          style={[styles.input, styles.mb15]}
          value={accountType}
        />

        <Pressable
          onPress={() => setIsLitMatchEnabled(!isLitMatchEnabled)}
          style={[
            styles.input,
            styles.mb15,
            isLitMatchEnabled && styles.bgOrangeLight,
          ]}
        >
          <View style={styles.litMatchBtn}>
            <Text style={{ fontSize: 20, marginBottom: 5 }}>
              Enable LitMatch
            </Text>
            <Checkbox
              style={styles.checkbox}
              value={isLitMatchEnabled}
              onValueChange={setIsLitMatchEnabled}
              color={"orange"}
            />
          </View>
          <Text>
            LitMatch is a feature that allow you to be matched with other book
            lovers and start a discussion.
          </Text>
        </Pressable>
      </View>

      <Pressable onPress={handleClick} style={styles.btnPrimary}>
        <Text style={styles.btnText}>Next</Text>
      </Pressable>
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  slash: {
    fontSize: 20,
    margin: 10,
  },
  pageLayout: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    flex: 1,
  },
  imgContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "40%",
    aspectRatio: 1 / 1,
    borderRadius: 200,
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
  halfWidth: {
    width: "50%",
  },
  checkboxContainer: {
    // width: "50%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  checkbox: {
    borderRadius: 100,
  },
  twoColContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 20,
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
  litMatchBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
