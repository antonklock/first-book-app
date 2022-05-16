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
  const [searchText, onChangeSearchText] = useState("");

  const fetchBook = async (searchTerm: string) => {
    let response: any;
    try {
      const config = {
        method: "get",
        url: `${baseUrl}${search}?title=${searchTerm}`,
      };
      setText("Searching...");
      response = await axios(config);
    } catch {
      setText("Couldn't find anything.");
    } finally {
      setText(response.data.docs[0].author_name[0]);
    }
  };

  return (
    <>
      <View style={styles.bookCardContainer}>
        <BookCard
          title={"Test title"}
          author={"Test author"}
          coverId={"12547191"}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>{text}</Text>
        <TextInput style={styles.textInput} onChangeText={onChangeSearchText} />
        <Button
          title={"Submit"}
          onPress={() => {
            fetchBook(searchText);
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
