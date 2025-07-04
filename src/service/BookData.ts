import axios from 'axios'

const baseURL = "http://localhost:3700/booklib/api/v1/books"

const fetchToken = () => {
  const token = localStorage.getItem("libToken")
  return "Bearer " + token
}

const AddBookData = async (book: any) => {
  //  save a book
  console.log("Save book.......................................", book)
  try {
    const response = await axios.post(
      baseURL,
      book, {
      headers: {
        Authorization: fetchToken()
      }
    }
    );
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("Failed to get the data", error);
    throw error
  }
}


const DeleteBook = async (bookId: String) => {
  //  get the books
  try {
    console.log(bookId)
    const response = await axios.delete(
      `${baseURL}/${bookId}`,
      {
        headers: {
          Authorization: fetchToken()
        }
      }

    );
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("Failed to delete the data", error);
    throw error
  }
}


const GetBooks = async () => {
  //get the books
  try {
    const response = await axios.get(`${baseURL}`,{
        headers: {
          Authorization: fetchToken()
        }
      }
    );
    return response.data
  } catch (error) {
    console.error("Failed to get the data", error);
    throw error
  }
}

const UpdateBook = async (book: any) => {
  //  get the books
  try {
    const response = await axios.patch(
      `${baseURL}/${book.bookId}`,
      book,{
          headers:{
            Authorization: fetchToken()
          }
        }
    );
    console.log(response.data)
    return response.data;

  } catch (error) {
    console.error("Failed to get the data", error);
    throw error
  }
}
export { AddBookData, DeleteBook, GetBooks, UpdateBook }