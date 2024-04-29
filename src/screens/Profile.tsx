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

const defaultUserInfo = {
  gender: "",
  country: "",
  city: "",
};

const MeetingProfile = () => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [isLitMatchEnabled, setIsLitMatchEnabled] = useState(false);

  const onPressFunction = () => {
    console.log("I was pressed");
  };

  return (
    <View>
      <View style={styles.profileHeader}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://source.unsplash.com/random/?woman",
            }}
          />
        </View>
        <Text>Username</Text>
        <Text>15/09/1992</Text>
        <Text>Lyon, FR</Text>
      </View>

      <View style={styles.pageLayout}>
        <View style={[styles.card, styles.mb15]}>
          <View style={styles.settingsCheckbox}>
            <Text>Enable LitMatch</Text>
            <Checkbox
              style={styles.checkbox}
              value={isLitMatchEnabled}
              onValueChange={setIsLitMatchEnabled}
              color={"orange"}
            />
          </View>
        </View>
        <View style={styles.card}>
          <View>
            <Text>Favorite genres:</Text>
            <View style={styles.tagsContainer}>
              <Text style={styles.tag}>Fantasy</Text>
              <Text style={styles.tag}>Murder mystery</Text>
              <Text style={styles.tag}>Romance</Text>
              <Text style={styles.tag}>Sci-fi</Text>
            </View>
          </View>
        </View>
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

      {/* <Pressable onPress={onPressFunction} style={styles.btnPrimary}>
          <Text style={styles.btnText}>Next</Text>
        </Pressable> */}
    </View>
  );
};

export default MeetingProfile;

const styles = StyleSheet.create({
  pageLayout: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    // display: "flex",
    // justifyContent: "space-between",
    // height: "100%",
    // flex: 1,
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
  profileHeader: {
    backgroundColor: "teal",
    paddingHorizontal: 20,
    paddingVertical: 30,
    display: "flex",
    alignItems: "center",
    borderEndEndRadius: 30,
    borderEndStartRadius: 30,
  },
  checkbox: {
    borderRadius: 100,
  },
  settingsCheckbox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  card: {
    backgroundColor: 'rgba(255, 222, 173, .5)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5
  },
  tag: {
    borderWidth: 1,
    borderColor: "teal",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'teal',
    flexGrow: 1,
    maxWidth: '50%',
    textAlign: 'center'
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
