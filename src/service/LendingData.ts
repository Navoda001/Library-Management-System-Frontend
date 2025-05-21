import axios from 'axios'

const baseURL = "http://localhost:8082/booklib/api/v1/lendings"

const AddLendingData = async(lending :any) =>{
  //  save a book
  console.log("Save lending.......................................",lending)
  try{
    const response = await axios.post(
        baseURL,
        lending
      );
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }
}


const DeleteLending = async(lendingId :String) =>{
  //  get the books
  try{
    console.log(lendingId)
    const response  =  await axios.delete(
        `${baseURL}?lendingId=${lendingId}`);
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to delete the data",error);
      throw error
  }
}


const GetLendings = async () => {
   //get the lendings
      try{
        const response = await  axios.get(`${baseURL}/getAllLendings`)
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const UpdateLending = async(lending :any) =>{
  //  get the lendings
  try{
    const response  =  await axios.patch(
        `${baseURL}?lendingId=${lending.lendingId}`,
        lending
        );
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }   
}
export {AddLendingData, DeleteLending, GetLendings, UpdateLending}