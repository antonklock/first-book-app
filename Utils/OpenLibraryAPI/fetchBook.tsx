import axios from "axios";

const baseUrl = "http://openlibrary.org/";
const searchUrl = "search.json";

const fetchBook = async (searchTerm: string) => {
  let response: any;
  try {
    return (response = axios({
      method: "get",
      url: `${baseUrl}${searchUrl}?title=${searchTerm}`,
    }));
  } catch {}
};

export default fetchBook;
