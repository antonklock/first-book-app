import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import axios from "axios";

//Open library EXAMPLE
//http://openlibrary.org/search.json?q=the+lord+of+the+rings
const baseUrl = "http://openlibrary.org/search.json";

export default function BookList() {
  const [text, setText] = useState("Search for a book title.");
  const [searchText, onChangeSearchText] = useState("");

  //   useEffect(() => {
  //     fetchBook(searchText);
  //   }, [searchText]);

  const fetchBook = async (searchTerm: string) => {
    let response: any;
    try {
      const config = {
        method: "get",
        url: `${baseUrl}?title=${searchTerm}`,
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
      <View>
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
  textInput: {
    borderColor: "lightblue",
    borderWidth: 1,
    borderRadius: 3,
    padding: 4,
  },
});
