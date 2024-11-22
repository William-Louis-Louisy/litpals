import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  Platform,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useUserContext } from "../contexts/UserContext";
import colors from "../constants/colors";
import Bookshelf from "../components/Bookshelf";

interface IRouterProps {
  navigation: NavigationProp<any, any>;
}

const MyBookshelves = ({ navigation }: IRouterProps) => {
  const { state } = useUserContext();
  const [newShelfModal, setNewShelfModal] = useState(false);
  const [newShelf, setNewShelf] = useState("");
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    console.log("BOOKSHELF", shelves);
  }, [shelves]);

  useFocusEffect(
    useCallback(() => {
      console.log("BOOKSHELVES INIT", state.bookshelf);
      getBookshelf();
    }, [])
  );

  const getBookshelf = async () => {
    console.log("state uid", state.uid);

    try {
      const bookshelf = await axios.get(
        `http://192.168.0.49:5000/user/${state.uid}/bookshelf`
      );
      if (bookshelf) console.log(bookshelf);

      if (bookshelf.data) {
        console.log("got bookshelf", bookshelf.data.bookshelf);
        setShelves(bookshelf.data.bookshelf);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createNewShelf = async () => {
    console.log("state bokkshelf", state.bookshelf);

    try {
      const bookshelf = await axios.patch(
        `http://192.168.0.49:5000/bookshelf/${state.bookshelf}/newShelf`,
        {
          name: newShelf,
        }
      );
      if (bookshelf.status === 201) setNewShelfModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.pageLayout}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            fontFamily: "Nunito-ExtraBold",
          }}
        >
          My Bookshelves
        </Text>
        <Pressable onPress={() => setNewShelfModal(true)}>
          <FontAwesome5 name="plus" size={30} color="black" />
        </Pressable>
      </View>
      {shelves.map((shelf: any) => {
        return (
          <Bookshelf key={shelf.name} shelf={shelf} navigation={navigation} />
        );
      })}
      {/* {Object.entries(shelves).map(([shelfName, books]) => (
        <Bookshelf
          key={shelfName}
          shelfName={shelfName}
          books={books}
          navigation={navigation}
        />
      ))} */}

      <Modal
        animationType="slide"
        visible={newShelfModal}
        onRequestClose={() => setNewShelfModal(false)}
      >
        <View style={{ paddingVertical: 50, paddingHorizontal: 20, gap: 20 }}>
          <Text>How do you want to name this new shelf ?</Text>
          <TextInput
            style={styles.input}
            value={newShelf}
            placeholder="Shelf name"
            onChangeText={(text) => setNewShelf(text)}
          />
          <Pressable style={styles.btnPrimary} onPress={() => createNewShelf()}>
            <Text style={styles.btnText}>Create new shelf</Text>
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default MyBookshelves;

const styles = StyleSheet.create({
  shelfHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deleteBook: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 5,
  },
  thumbnail: {
    height: 150,
    width: 100,
    borderRadius: 5,
  },
  book: {
    height: 150,
    width: 100,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    position: "relative",
    paddingTop: 10,
  },
  booksContainer: {
    // backgroundColor: "lightgray",
    marginBottom: -10,
    zIndex: 3,
    maxHeight: 160,
    paddingTop: 0,
    height: 160,
  },
  bookshelfThickness: {
    width: Dimensions.get("window").width,
    marginLeft: -20,
    height: 4,
    backgroundColor: "rgba(255, 222, 173, 1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  bookshelf: {
    width: Dimensions.get("window").width,
    height: 0,
    marginLeft: -20,
    borderLeftWidth: 20,
    borderLeftColor: "transparent",
    borderRightWidth: 20,
    borderRightColor: "transparent",
    borderBottomWidth: 25,
    borderBottomColor: "rgba(255, 222, 173, 1)",
  },
  bookshelfBg: {
    backgroundColor: "rgba(255, 222, 173, .5)",
    borderRadius: 5,
    paddingBottom: 30,
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
        paddingHorizontal: 25,
        paddingTop: 50,
      },
    },
  }),
});
