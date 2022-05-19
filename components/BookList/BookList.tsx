import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

//Open library EXAMPLE
//http://openlibrary.org/search.json?q=the+lord+of+the+rings
const baseUrl = "http://openlibrary.org/";
const search = "search.json";

export default function BookList() {
  const [text, setText] = useState("Search for a book title.");

  const [books, setBooks] = useState([]);

  const [searchText, onChangeSearchText] = useState("");

  const fetchBook = async (searchTerm: string) => {
    let response: any;
    try {
      return (response = axios({
        method: "get",
        url: `${baseUrl}${search}?title=${searchTerm}`,
      }));
    } catch {}
  };

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

  return (
    <>
      <View style={styles.bookCardContainer}>
        {books.length > 0 ? books : <Text>{text}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Text>{text}</Text>
        <TextInput style={styles.textInput} onChangeText={onChangeSearchText} />
        <Button
          title={"Submit"}
          onPress={() => {
            // fetchBook(searchText);
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
  inputContainer: {
    flex: 1,
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
