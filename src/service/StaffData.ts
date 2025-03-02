import axios from 'axios'

const baseURL = "http://localhost:8082/booklib/api/v1/staff"

const AddStaffData = async(staff :any) =>{
  //  save a staff member
  console.log("Save Staff Member.......................................",staff)
  try{
    const response = await axios.post(
        baseURL,
        staff
      );
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }
}


const DeleteStaff = async(staffId :String) =>{
  //  get the staff member
  try{
    console.log(staffId)
    const response  =  await axios.delete(
        `${baseURL}?staffId=${staffId}`);
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to delete the data",error);
      throw error
  }
}


const GetStaff = async () => {
   //get the staff
      try{
        const response = await  axios.get(`${baseURL}/getAllStaff`)
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const UpdateStaff = async(staff :any) =>{
  //  get the books
  try{
    const response  =  await axios.patch(
        `${baseURL}?staffId=${staff.staffId}`,
        staff
        );
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }   
}
export {AddStaffData, DeleteStaff, GetStaff, UpdateStaff}