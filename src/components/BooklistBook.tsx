import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BooklistBook = ({ book }: any) => {
  const [retrievedBook, setRetrievedBook] = useState({
    title: "",
    author: "",
    thumbnail: "",
  });

  const read = true;

  useEffect(() => {
    if (book) {
      try {
        getBooks();
      } catch (error) {}
    }
  }, []);

  const getBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${book.id}`
      );
      setRetrievedBook({
        title: response.data.volumeInfo.title,
        author: response.data.volumeInfo.authors,
        thumbnail: response.data.volumeInfo.imageLinks.smallThumbnail,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      {book && read && (
        <View
          style={{
            zIndex: 9,
            transform: [{ translateY: 18 }],
            marginTop: -20,
            alignSelf: "flex-end",
            marginRight: -10,
          }}
        >
          <MaterialCommunityIcons name="decagram" size={30} color="green" />
        </View>
      )}
      {book ? (
        <Pressable style={styles.book} key={book}>
          <Image
            style={styles.thumbnail}
            source={{
              uri: retrievedBook.thumbnail,
            }}
          />
        </Pressable>
      ) : (
        <Pressable
          style={[
            styles.book,
            {
              borderWidth: 2,
              borderColor: "lightgray",
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            },
          ]}
        >
          <FontAwesome6 name="circle-plus" size={30} color="lightgray" />
          <Text>Choose book</Text>
        </Pressable>
      )}
      {book && read && (
        <Pressable>
          <Text>Book card</Text>
        </Pressable>
      )}

      {book && !read && (
        <Pressable>
          <Text>Start reading</Text>
        </Pressable>
      )}
    </View>
  );
};

export default BooklistBook;

const styles = StyleSheet.create({
  undefinedBook: {},
  progressInfo: {
    gap: 5,
    marginTop: 10,
    alignItems: "center",
    borderRightWidth: 3,
    borderColor: "#543757",
    width: "50%",
  },
  progressInfoFull: {
    gap: 10,
    marginTop: 10,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  modal: {
    borderRadius: 10,
    padding: 20,
    flex: 1,
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
  book: {
    height: 150,
    width: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 8,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
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
  ...Platform.select({
    android: {
      pageLayout: {
        paddingHorizontal: 25,
        paddingTop: 50,
        paddingBottom: 30,
        justifyContent: "space-between",
        height: "100%",
      },
    },
  }),
});
