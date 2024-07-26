import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Platform,
  Modal,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import BooklistBook from "./BooklistBook";

const ChallengeCard = () => {
  const [openChallengeBooklist, setOpenChallengeBooklist] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [challenge, setChallenge] = useState({
    name: "July Reading Marathon",
    description: "Something",
    type: "month",
    timeframe: {
      from: {
        day: "01",
        month: "07",
        year: "2024",
      },
      to: {
        day: "31",
        month: "07",
        year: "2024",
      },
    },
    bookQuantity: 5,
    books: [
      {
        accessInfo: [Object],
        etag: "18EhJl9BsX8",
        id: "Sa5EEAAAQBAJ",
        kind: "books#volume",
        saleInfo: [Object],
        searchInfo: [Object],
        selfLink: "https://www.googleapis.com/books/v1/volumes/Sa5EEAAAQBAJ",
        volumeInfo: [Object],
      },
    ],
  });
  const booksRead = 4;

  useEffect(() => {
    const today = new Date();
    const end = new Date(
      `${challenge.timeframe.to.year}-${challenge.timeframe.to.month}-${challenge.timeframe.to.day}`
    );
    const diffInMs = Math.abs(end.getTime() - today.getTime());
    setDaysLeft(Math.ceil(diffInMs / (1000 * 60 * 60 * 24)));
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#EFE6EF",
        borderRadius: 10,
        padding: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "Nunito-ExtraBold",
          color: "#543757",
          fontSize: 18,
        }}
      >
        {challenge.name}
      </Text>
      <View style={{ flexDirection: "row" }}>
        <View
          style={
            challenge.timeframe.from.year
              ? styles.progressInfo
              : styles.progressInfoFull
          }
        >
          <Text
            style={{
              fontSize: 30,
              color: "#543757",
              fontFamily: "Nunito-SemiBold",
            }}
          >
            {booksRead}/{challenge.bookQuantity}
          </Text>
          <Text
            style={
              challenge.timeframe.from.year
                ? { color: "#543757", fontFamily: "Nunito-Medium" }
                : {
                    fontSize: 20,
                    color: "#543757",
                    fontFamily: "Nunito-SemiBold",
                  }
            }
          >
            books read ({Math.round((booksRead * 100) / challenge.bookQuantity)}
            %)
          </Text>
        </View>
        {challenge.timeframe.from.year && (
          <View
            style={{
              gap: 5,
              marginTop: 10,
              alignItems: "center",
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: "#543757",
                fontFamily: "Nunito-SemiBold",
              }}
            >
              {daysLeft} days
            </Text>
            <Text style={{ color: "#543757", fontFamily: "Nunito-Medium" }}>
              left to complete
            </Text>
          </View>
        )}
      </View>
      {!!challenge.books.length && (
        <Pressable
          style={{ alignSelf: "center", marginTop: 10 }}
          onPress={() => setOpenChallengeBooklist(true)}
        >
          <Text
            style={{
              color: "#543757",
              fontFamily: "Nunito-SemiBold",
              fontSize: 15,
            }}
          >
            See booklist
          </Text>
        </Pressable>
      )}

      <Modal
        animationType="slide"
        visible={openChallengeBooklist}
        onRequestClose={() => setOpenChallengeBooklist(false)}
      >
        <View style={styles.modal}>
          <View style={styles.progressHeader}>
            <Pressable
              onPress={() => setOpenChallengeBooklist(!openChallengeBooklist)}
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <FontAwesome6 name="chevron-left" size={24} color="black" />
              <Text style={{ fontFamily: "Nunito-Medium", fontSize: 15 }}>
                Back
              </Text>
            </Pressable>
          </View>
          <Text
            style={{
              fontSize: 22,
              fontFamily: "Nunito-Bold",
              marginBottom: 10,
            }}
          >
            {challenge.name} booklist
          </Text>

          {/* <ScrollView contentContainerStyle={styles.list}>
            {Array.from({ length: challenge.bookQuantity }, (_, index) => (
              <BooklistBook key={index} book={challenge.books[index] || null} />
            ))}
          </ScrollView> */}

          <FlatList
            horizontal={false}
            numColumns={3}
            contentContainerStyle={{ gap: 20 }}
            columnWrapperStyle={styles.col}
            data={Array.from({ length: challenge.bookQuantity }, (_, i) => i)}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item, index }) => (
              <BooklistBook book={challenge.books[index] || null} />
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default ChallengeCard;

const styles = StyleSheet.create({
  col: {
    gap: (Dimensions.get("window").width - 340) / 2,
  },
  list: {},
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
