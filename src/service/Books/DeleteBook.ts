
import axios from 'axios'
const deleteURL = "http://localhost:8082/booklib/api/v1/books"

export const DeleteBook = async(bookId :String) =>{
  //  get the books
  try{
    console.log(bookId)
    const response  =  await axios.delete(
        `${deleteURL}?bookId=${bookId}`);
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to delete the data",error);
      throw error
  }
}