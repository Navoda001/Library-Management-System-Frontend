import axios from 'axios'

const baseURL = "http://localhost:8082/booklib/api/v1/members"

const AddMemberData = async(member :any) =>{
  //  save a book
  console.log("Save Member.......................................",member)
  try{
    const response = await axios.post(
        baseURL,
        member
      );
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }
}


const DeleteMember = async(memberId :String) =>{
  //  get the books
  try{
    console.log(memberId)
    const response  =  await axios.delete(
        `${baseURL}?memberId=${memberId}`);
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to delete the data",error);
      throw error
  }
}


const GetMembers = async () => {
   //get the books
      try{
        const response = await  axios.get(`${baseURL}/getAllMember`)
        return response.data
      }catch(error){
        console.error("Failed to get the data",error);
        throw error
      }
}

const UpdateMember = async(member :any) =>{
  //  get the books
  try{
    const response  =  await axios.patch(
        `${baseURL}?memberId=${member.memberId}`,
        member
        );
    console.log(response.data)
    return response.data;
    
  }catch(error){
      console.error("Failed to get the data",error);
      throw error
  }   
}
export {AddMemberData, DeleteMember, GetMembers, UpdateMember}