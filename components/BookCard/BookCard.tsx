import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import axios from "axios";

type BookCardProps = {
  title: string;
  coverId: string;
  author: string;
};

const baseUrl = "https://covers.openlibrary.org/b/id/";

let bookWidth = 100;
let bookHeight = 150;

const fetchCover = async (id: string) => {
  let response: any;
  const config = {
    method: "get",
    url: `${baseUrl}${id}.json`,
  };
  try {
    response = await axios(config);
    return response.data;
  } catch (e) {
    console.log("Response is undefined");
    console.log("Url: " + `${baseUrl}${id}.json`);
    console.log("fetchCoveverError: " + e.response.data);
  }
};

export default function BookCard(props: BookCardProps) {
  const { title, coverId, author } = props;
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [coverUri, setCoverUri] = useState("");

  const handleLoadCover = async () => {
    let coverObject;
    try {
      coverObject = await fetchCover(coverId);
      const url = "https://covers.openlibrary.org/b/olid/";
      setCoverUri(`${url}${coverObject.olid}-M.jpg`);
      setCoverLoaded(true);
    } catch (e) {
      console.log("handleLoadCover error: " + e);
      console.log("Cover ID: " + coverId);
    }

    if (!coverLoaded) {
    }
  };

  handleLoadCover();

  return (
    <View style={styles.bookCard}>
      {coverLoaded ? (
        <>
          <Text>{title}</Text>
          <Image
            style={styles.image}
            source={{
              uri: coverUri,
            }}
          />
          <Text>{author}</Text>
        </>
      ) : (
        false
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bookCard: {
    backgroundColor: "red",
    width: 150,
    height: 200,
    margin: 15,
  },
  image: {
    width: bookWidth,
    height: bookHeight,
  },
});
