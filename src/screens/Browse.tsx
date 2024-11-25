import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Button,
  ScrollView,
  Dimensions,
  FlatList,
  Animated,
} from "react-native";
import Checkbox from "expo-checkbox";
import React, { useCallback, useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { showToast } from "../utils/Toasts";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import colors from "../constants/colors";
import Config from "react-native-config";
import debounce from "lodash.debounce";
import BookSearch from "../components/BookSearch";

interface IRouterProps {
  navigation: NavigationProp<any, any>;
}

const defaultUserInfo = {
  gender: "",
  country: "",
  city: "",
};

const Browse = ({ navigation }: IRouterProps) => {
  const [query, setQuery] = useState("");
  const [booklist, setBooklist] = useState([]);
  const [currentBookDetail, setCurrentBookDetail] = useState({} as any);

  const getBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes`,
        {
          params: {
            q: `intitle:${query}`,
            langRestrict: "fr",
            key: Config.API_KEY,
            maxResults: 10,
          },
        }
      );

      setBooklist(
        response.data.items.filter(
          (item: any) =>
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail &&
            new Date(item.volumeInfo.publishedDate).getFullYear() > 1900
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookChange = useCallback(debounce(getBooks, 300), [query]);

  useEffect(() => {
    if (query.length > 2) handleBookChange();
    return () => handleBookChange.cancel();
  }, [query, handleBookChange]);

  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [200, 50], // Image height reduces from 200 to 70
    extrapolate: "clamp",
  });

  const imageHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [150, 50], // Image height reduces from 150 to 50
    extrapolate: "clamp",
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0], // Title fades out
    extrapolate: "clamp",
  });

  const showContent = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.pageLayout}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TextInput
          editable
          placeholder="Search book..."
          onChangeText={(text) => setQuery(text)}
          value={query}
          style={{
            padding: 10,
            borderWidth: 2,
            borderColor: "lightgray",
            borderRadius: 10,
            fontSize: 18,
            fontFamily: "Nunito-SemiBold",
            width: "100%",
          }}
        />
        <FontAwesome
          style={styles.deleteBook}
          name="times-circle"
          size={24}
          color="gray"
          onPress={() => {
            setQuery("");
            setBooklist([]);
          }}
        />
      </View>

      <View style={styles.booksDropdownStyle}>
        <FlatList
          contentContainerStyle={{ rowGap: 10, paddingHorizontal: 20 }}
          data={booklist}
          renderItem={({ item }: any) => (
            <Pressable
              onPress={() =>
                navigation.navigate("BookDetails", {
                  id: item.id,
                  title: item.volumeInfo.title,
                  subtitle: item.volumeInfo.subtitle,
                  authors: item.volumeInfo.authors,
                  publisher: item.volumeInfo.publisher,
                  publishedDate: item.volumeInfo.publishedDate,
                  pageCount: item.volumeInfo.pageCount,
                  language: item.volumeInfo.language,
                  maturity: item.volumeInfo.maturityRating,
                  description: item.volumeInfo.description,
                  thumbnail: item.volumeInfo.imageLinks.smallThumbnail,
                })
              }
              key={item.id}
              style={styles.bookSearch}
            >
              <Image
                style={styles.thumbnail}
                source={{
                  uri: item.volumeInfo.imageLinks.smallThumbnail,
                }}
              />
              <View style={{ gap: 10, justifyContent: "center" }}>
                {item.volumeInfo.subtitle && (
                  <Text>{item.volumeInfo.subtitle}</Text>
                )}
                <Text>{item.volumeInfo.title}</Text>
                <Text>{item.volumeInfo.authors}</Text>
                <View style={{ flexDirection: "row" }}>
                  <Text>{item.volumeInfo.publisher}</Text>
                  {item.volumeInfo.publisher &&
                    item.volumeInfo.publishedDate && <Text> - </Text>}
                  {item.volumeInfo.publishedDate && (
                    <Text>
                      {new Date(item.volumeInfo.publishedDate).getFullYear()}
                    </Text>
                  )}
                </View>
              </View>
            </Pressable>
          )}
          keyExtractor={(item: any, index) => item.volumeInfo.title + index}
        />
      </View>
    </View>
  );
};

export default Browse;

const styles = StyleSheet.create({
  deleteBook: {
    marginLeft: -30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  shadowWrapper: {
    elevation: 9, // Controls the shadow size
    backgroundColor: "transparent",
    position: "relative",
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  bookSearch: {
    backgroundColor: "white",
    flexDirection: "row",
    gap: 15,
    borderRadius: 5,
  },
  booksContainer: {
    marginBottom: -10,
    zIndex: 3,
    maxHeight: 160,
    paddingTop: 0,
    height: 160,
  },
  thumbnail: {
    height: 90,
    width: 60,
    borderRadius: 5,
  },
  booksDropdownContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: 10,
    paddingBottom: 22,
  },
  booksDropdownStyle: {
    gap: 10,
    // marginHorizontal: 20,
    flex: 1,
  },
  pageLayout: {
    backgroundColor: colors.light.background,
    paddingHorizontal: 20,
    paddingVertical: 30,
    // display: "flex",
    // justifyContent: "space-between",
    height: "100%",
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
    backgroundColor: colors.light.accent,
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "rgba(255, 222, 173, .5)",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  tagsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 5,
  },
  tag: {
    borderWidth: 1,
    borderColor: colors.light.accent,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: colors.light.accent,
    flexGrow: 1,
    maxWidth: "50%",
    textAlign: "center",
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
    backgroundColor: colors.light.accent,
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
        paddingTop: 45,
        flex: 1,
      },
    },
  }),
});
