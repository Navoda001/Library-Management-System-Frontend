import axios from 'axios'
const updateURL = "http://localhost:8082/booklib/api/v1/books"

export const UpdateBook = async(book :any) =>{
  //  get the books
  try{
    const response  =  await axios.patch(
        `${updateURL}?bookId=${book.bookId}`,
        book
        );
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }   
}