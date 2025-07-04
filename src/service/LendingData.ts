import axios from 'axios'

const baseURL = "http://localhost:3700/booklib/api/v1/lending"

const fetchToken = () => {
  const token = localStorage.getItem("libToken")
  return "Bearer " + token
}

const AddLendingData = async (lending: any) => {
  //  save a book
  console.log("Save lending.......................................", lending)
  try {
    const response = await axios.post(
      baseURL,
      lending, {
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


const DeleteLending = async (lendingId: String) => {
  //  get the books
  try {
    console.log(lendingId)
    const response = await axios.delete(
      `${baseURL}/${lendingId}`, {
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


const GetLendings = async () => {
  //get the lendings
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

const UpdateLending = async (lending: any) => {
  //  get the lendings
  try {
    const response = await axios.patch(
      `${baseURL}/${lending.lendingId}`,
      lending, {
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
export { AddLendingData, DeleteLending, GetLendings, UpdateLending }