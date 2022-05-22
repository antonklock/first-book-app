import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  ScrollView,
  Keyboard,
} from "react-native";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import fetchBook from "../../Utils/OpenLibraryAPI/fetchBook";

export default function BookList() {
  const [text, setText] = useState("Search for a book title.");
  const [books, setBooks] = useState([]);
  const [searchText, onChangeSearchText] = useState("");
  const textInputRef = useRef(null);
  const [keyboardStatus, setKeyboardStatus] = useState("");
  const _keyboardDidShow = () => setKeyboardStatus("Keyboard Shown");
  const _keyboardDidHide = () => setKeyboardStatus("Keyboard Hidden");

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      _keyboardDidShow
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      _keyboardDidHide
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  const renderBooks = async (searchString: string) => {
    let bookList = [];
    setBooks([]);
    setText("Seaching...");
    try {
      const book = await fetchBook(searchText);
      if (book) {
        for (let i = 0; i < 10; i++) {
          const title = book.data.docs[i].title;
          const author = book.data.docs[i].author_name[0];
          const id = book.data.docs[i].cover_i;
          if (title !== undefined && author !== undefined && id !== undefined) {
            bookList.push(
              <BookCard title={title} author={author} coverId={id} key={i} />
            );
          }
        }
      }
      setBooks(bookList);
      setText("Search for another title.");
    } catch (e) {
      console.log("renderBooksError: " + e);
      setText("Something went wrong. :(");
    }
  };

  const handleTextInputPosition = () => {
    if (keyboardStatus == "Keyboard Shown") {
      return { ...styles.inputContainer, flex: 1.2 };
    } else {
      return styles.inputContainer;
    }
  };

  return (
    <>
      <ScrollView style={styles.container} directionalLockEnabled={true}>
        <View style={styles.scrollView}>
          {books.length > 0 ? books : <Text>{text}</Text>}
        </View>
      </ScrollView>

      <View style={handleTextInputPosition()}>
        <Text>{text}</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={onChangeSearchText}
          ref={textInputRef}
        />
        <Button
          title={"Submit"}
          onPress={() => {
            renderBooks(searchText);
          }}
        >
          Submit
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingTop: 100,
  },
  scrollView: {
    paddingTop: 10,
    paddingBottom: 100,

    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: Dimensions.get("window").width - 10,
    padding: 25,
  },
  inputContainer: {
    flex: 0.35,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 25,
  },
  textInput: {
    borderColor: "lightblue",
    borderWidth: 1,
    borderRadius: 3,
    padding: 4,
    width: Dimensions.get("window").width * 0.5,
  },
  bookCardContainer: {
    flex: 2.75,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: Dimensions.get("window").width,
    padding: 25,
    paddingTop: 75,
  },
});
