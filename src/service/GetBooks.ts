import React from 'react';
import axios from 'axios'
const getBooksURL = "http://localhost:8082/booklib/api/v1/books/getAllbooks"

export const GetBooks = async () => {
   //get the books
      try{
        const response = await  axios.get(getBooksURL)
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
};
