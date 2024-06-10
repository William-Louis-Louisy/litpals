import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  Platform,
  Dimensions,
  FlatList,
  ScrollView,
  Keyboard,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import debounce from "lodash.debounce";
import axios from "axios";
import Config from "react-native-config";
import { useAuth } from "../contexts/AuthContext";
import { useUserContext } from "../contexts/UserContext";

const Bookshelf = ({ navigation }: any) => {
  const [bookQuery, setBookQuery] = useState("");
  const [booksDrowpdown, setBooksDropdown] = useState([] as any);
  const [bookshelf, setBookshelf] = useState([] as any[]);
  const { setIsLoggedIn, setIsSignedUp } = useAuth();
  const { state, dispatch } = useUserContext();
  const [currentBookDetail, setCurrentBookDetail] = useState({} as any);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const getBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes`,
        {
          params: {
            q: `intitle:${bookQuery}`,
            langRestrict: "fr",
            key: Config.API_KEY,
            maxResults: 10,
          },
        }
      );

      setBooksDropdown(
        response.data.items.filter(
          (item: any) =>
            item.volumeInfo.imageLinks &&
            item.volumeInfo.imageLinks.smallThumbnail
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleBookChange = useCallback(debounce(getBooks, 300), [bookQuery]);

  useEffect(() => {
    if (bookQuery.length > 2) handleBookChange();
    return () => handleBookChange.cancel();
  }, [bookQuery, handleBookChange]);

  const handleSelectBook = (book: any) => {
    setBookshelf([...bookshelf, book]);
    setBookQuery("");
    toggleModal();
  };

  const handleClick = async () => {
    try {
      dispatch({
        type: "UPDATE_FIELD",
        payload: {
          field: "bookshelf",
          value: bookshelf.map((book) => book.id),
        },
      });

      const data = await axios.post(
        `http://192.168.0.49:5000/books`,
        bookshelf.map((book) => ({
          id: book.id,
          title: book.volumeInfo.title,
          thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
        }))
      );
      // navigateToApp();
    } catch (e) {
      console.error(e);
    }
  };

  const navigateToPrev = () => {
    navigation.goBack();
  };

  // const navigateToApp = () => {
  //   setIsSignedUp(false);
  //   setIsLoggedIn(true);
  // };

  useEffect(() => {
    currentBookDetail.volumeInfo && toggleModal();
  }, [currentBookDetail]);

  return (
    <View style={styles.pageLayout}>
      <View style={styles.progressHeader}>
        <Pressable onPress={navigateToPrev}>
          <FontAwesome6 name="chevron-left" size={24} color="black" />
        </Pressable>
      </View>

      <View>
        <View style={styles.bookshelfBg}>
          <Text style={{ fontSize: 18, padding: 15 }}>Your bookshelf</Text>
          <View style={styles.booksContainer}>
            <FlatList
              horizontal={true}
              data={bookshelf}
              renderItem={({ item }) => (
                <Pressable style={styles.book}>
                  <FontAwesome
                    style={styles.deleteBook}
                    onPress={() =>
                      setBookshelf(bookshelf.filter((book) => book != item))
                    }
                    name="times-circle"
                    size={24}
                    color="white"
                  />
                  <Image
                    style={styles.thumbnail}
                    source={{
                      uri: item.volumeInfo.imageLinks.smallThumbnail,
                    }}
                  />
                </Pressable>
              )}
              keyExtractor={(item) => item.volumeInfo.title}
            />
          </View>
          <View style={styles.bookshelf}></View>
          <View style={styles.bookshelfThickness}></View>
        </View>

        <View>
          <Text>Add books to your bookshelf</Text>
          <TextInput
            style={styles.input}
            value={bookQuery}
            placeholder={"Search for a book"}
            onChangeText={setBookQuery}
          />
          <ScrollView
            keyboardShouldPersistTaps={"always"}
            style={styles.booksDropdownStyle}
            contentContainerStyle={styles.booksDropdownContainer}
          >
            {booksDrowpdown.map((book: any) => {
              return (
                <Pressable
                  onPress={() => setCurrentBookDetail(book)}
                  key={book.id}
                >
                  <Image
                    style={styles.thumbnail}
                    source={{
                      uri: book.volumeInfo.imageLinks.smallThumbnail,
                    }}
                  />
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <FontAwesome
              style={styles.deleteBook}
              onPress={toggleModal}
              name="times-circle"
              size={24}
              color="black"
            />
            <Text>
              {currentBookDetail?.volumeInfo?.authors?.join() || "N/A"}
            </Text>
            <Text>{currentBookDetail?.volumeInfo?.description || "N/A"}</Text>
            <Pressable
              style={styles.btnPrimary}
              onPress={() => handleSelectBook(currentBookDetail)}
            >
              <Text style={styles.btnText}>Add to bookshelf</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Pressable onPress={handleClick} style={styles.btnPrimary}>
        <Text style={styles.btnText}>Done</Text>
      </Pressable>
    </View>
  );
};

export default Bookshelf;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    height: "60%",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  booksDropdownCol: {
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  booksDropdownContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    rowGap: 10,
  },
  booksDropdownStyle: {
    backgroundColor: "lightgray",
    paddingTop: 10,
    height: Dimensions.get("window").height / 3,
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
    height: 250,
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
