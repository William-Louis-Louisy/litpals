import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  Pressable,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import debounce from "lodash.debounce";
import Config from "react-native-config";

const ShelfCreation = ({ challenge, setChallenge }: any) => {
  const [bookQuery, setBookQuery] = useState("");
  const [booksDrowpdown, setBooksDropdown] = useState([] as any);
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
            q: `${bookQuery}`,
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

  const handleBookChange = useCallback(debounce(getBooks, 500), [bookQuery]);

  useEffect(() => {
    if (bookQuery.length > 2) handleBookChange();
    return () => handleBookChange.cancel();
  }, [bookQuery, handleBookChange]);

  const handleSelectBook = (book: any) => {
    setChallenge({
      ...challenge,
      books: [...challenge.books, book],
      bookQuantity: challenge.bookQuantity + 1,
    });
    setBookQuery("");
    toggleModal();
  };

  //   const handleClick = async () => {
  //     try {
  //       //   dispatch({
  //       //     type: "UPDATE_FIELD",
  //       //     payload: {
  //       //       field: "bookshelf",
  //       //       value: bookshelf.map((book) => book.id),
  //       //     },
  //       //   });

  //       const data = await axios.post(
  //         `http://192.168.0.49:5000/books`,
  //         bookshelf.map((book) => ({
  //           id: book.id,
  //           title: book.volumeInfo.title,
  //           thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
  //         }))
  //       );
  //       // navigateToApp();
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };

  return (
    <View>
      {/* <Text>{props}</Text> */}
      <View style={{ gap: 20 }}>
        <View style={styles.bookshelfBg}>
          <View style={styles.booksContainer}>
            <FlatList
              horizontal={true}
              data={challenge.books}
              renderItem={({ item }) => (
                <Pressable style={styles.book}>
                  <FontAwesome
                    style={styles.deleteBook}
                    onPress={() => {
                      setChallenge({
                        ...challenge,
                        books: challenge.books.filter(
                          (book: any) => book != item
                        ),
                        bookQuantity: challenge.bookQuantity - 1,
                      });
                    }}
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

        <View style={{ position: "relative" }}>
          <TextInput
            style={styles.input}
            value={bookQuery}
            placeholder={"Search for a book"}
            onChangeText={setBookQuery}
          />
          {bookQuery && (
            <ScrollView
              horizontal={true}
              keyboardShouldPersistTaps={"always"}
              style={styles.booksDropdownStyle}
              contentContainerStyle={styles.booksDropdownContainer}
            >
              {booksDrowpdown.map((book: any) => {
                return (
                  <Pressable
                    onPress={() => [setCurrentBookDetail(book), toggleModal()]}
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
          )}
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
    </View>
  );
};

export default ShelfCreation;

const styles = StyleSheet.create({
  btnPrimary: {
    width: "100%",
    backgroundColor: "#543757",
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 22,
    fontFamily: "Nunito-Bold",
  },
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
    height: 130,
    width: 85,
    borderRadius: 5,
  },
  booksDropdownCol: {
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  booksDropdownContainer: {
    columnGap: 10,
    paddingHorizontal: 10,
  },
  booksDropdownStyle: {
    backgroundColor: "lightgray",
    paddingTop: 10,
    height: 150,
    position: "absolute",
    zIndex: 5,
    top: 50,
  },
  book: {
    height: 130,
    width: 85,
    marginRight: 15,
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
    marginBottom: -10,
    zIndex: 3,
    maxHeight: 150,
    paddingTop: 10,
    paddingLeft: 15,
    height: 150,
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
    borderRadius: 10,
    height: 180,
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
    fontFamily: "Nunito-Medium",
  },
});
