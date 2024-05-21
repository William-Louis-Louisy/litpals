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
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { useUserContext } from "../contexts/UserContext";
import axios from "axios";

const defaultUserInfo = {
  gender: "",
  country: "",
  city: "",
  litMatchPreferences: {
    relationshipType: "",
    communicationType: "",
    genderPreference: "",
  },
};

const MeetingProfile = ({ navigation }: any) => {
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [relationshipType, setRelationshipType] = useState("");
  const [communicationType, setCommunicationType] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const { dispatch } = useUserContext();

  const handleClick = async () => {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          field: "meetingInfo",
          value: {
            ...userInfo,
            litMatchPreferences: {
              relationshipType,
              communicationType,
              genderPreference,
            },
          },
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
    navigation.navigate("ReadingProfile1");
  };

  // useEffect(() => {
  //   if (countryQuery.length >= 2) {
  //     getCountryList();
  //   }
  // }, [countryQuery]);

  // const getCountryList = async () => {
  //   try {
  //     const response: any = await axios.get(
  //       `https://restcountries.com/v3.1/name/${countryQuery}`
  //     );
  //     console.log("RESPONSE", response);

  //     // setAuthorsDropdown(authorsFound);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
        <Text style={styles.label}>GENDER</Text>
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.gender === "woman" && styles.pressableSelected,
            ]}
            onPress={() => setUserInfo({ ...userInfo, gender: "woman" })}
          >
            <FontAwesome6 name="venus" size={24} color="black" />
            <Text>Woman</Text>
          </Pressable>

          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.gender === "man" && styles.pressableSelected,
            ]}
            onPress={() => setUserInfo({ ...userInfo, gender: "man" })}
          >
            <FontAwesome6 name="mars" size={24} color="black" />
            <Text>Man</Text>
          </Pressable>

          <Pressable
            style={[
              styles.textIconBtn,
              userInfo.gender === "other" && styles.pressableSelected,
            ]}
            onPress={() => setUserInfo({ ...userInfo, gender: "other" })}
          >
            <FontAwesome6 name="ellipsis" size={24} color="black" />
            <Text>Other</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>COUNTRY</Text>
        <TextInput
          style={[styles.input, styles.mb15]}
          value={countryQuery}
          placeholder={"Country"}
          onChangeText={setCountryQuery}
          // onChangeText={(e) => setUserInfo({ ...userInfo, country: e })}
        />

        <Text style={styles.label}>CITY</Text>
        <TextInput
          style={[styles.input, styles.mb15]}
          value={userInfo.city}
          placeholder={"City"}
          onChangeText={(e) => setUserInfo({ ...userInfo, city: e })}
        />

        <Text style={styles.label}>LOOKING FOR</Text>
        {/* RELATIONSHIP TYPE */}
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              relationshipType === "love" && styles.pressableSelected,
            ]}
            onPress={() => setRelationshipType("love")}
          >
            <FontAwesome name="heart" size={24} color="black" />
            <Text>Love</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              relationshipType === "friendship" && styles.pressableSelected,
            ]}
            onPress={() => setRelationshipType("friendship")}
          >
            <FontAwesome6 name="handshake-angle" size={24} color="black" />
            <Text>Friendship</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              relationshipType === "both" && styles.pressableSelected,
            ]}
            onPress={() => setRelationshipType("both")}
          >
            <FontAwesome6 name="grin-stars" size={24} color="black" />
            <Text>Both</Text>
          </Pressable>
        </View>

        {/* COMMUNICATION TYPE */}
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              communicationType === "online" && styles.pressableSelected,
            ]}
            onPress={() => setCommunicationType("online")}
          >
            <FontAwesome name="laptop" size={24} color="black" />
            <Text>Online</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              communicationType === "irl" && styles.pressableSelected,
            ]}
            onPress={() => setCommunicationType("irl")}
          >
            <FontAwesome5 name="glass-cheers" size={24} color="black" />
            <Text>IRL</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              communicationType === "both" && styles.pressableSelected,
            ]}
            onPress={() => setCommunicationType("both")}
          >
            <FontAwesome name="comments" size={24} color="black" />
            <Text>Both</Text>
          </Pressable>
        </View>

        {/* GENDER PREFERENCES */}
        <View style={styles.flexContainer}>
          <Pressable
            style={[
              styles.textIconBtn,
              genderPreference === "woman" && styles.pressableSelected,
            ]}
            onPress={() => setGenderPreference("woman")}
          >
            <FontAwesome6 name="venus" size={24} color="black" />
            <Text>Woman</Text>
          </Pressable>

          <Pressable
            style={[
              styles.textIconBtn,
              genderPreference === "man" && styles.pressableSelected,
            ]}
            onPress={() => setGenderPreference("man")}
          >
            <FontAwesome6 name="mars" size={24} color="black" />
            <Text>Man</Text>
          </Pressable>
          <Pressable
            style={[
              styles.textIconBtn,
              genderPreference === "any-gender" && styles.pressableSelected,
            ]}
            onPress={() => setGenderPreference("any-gender")}
          >
            <FontAwesome6 name="venus-mars" size={24} color="black" />
            <Text>Any gender</Text>
          </Pressable>
        </View>
      </View>

      <Pressable onPress={handleClick} style={styles.btnPrimary}>
        <Text style={styles.btnText}>Next</Text>
      </Pressable>
    </View>
  );
};

export default MeetingProfile;

const styles = StyleSheet.create({
  pressableSelected: {
    borderWidth: 2,
    borderColor: "orange",
    backgroundColor: "rgba(255, 222, 173, .5)",
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
