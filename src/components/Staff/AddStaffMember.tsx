import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";

interface Staff {
  staffId:string;
  firstName:string;
  lastName:string;
  email:string;
  joinDate:string;
  phone:string;
  role:string;
}

function AddStaffMember({ show, handleOnClose, handleAdd,addStaff }: any) {

  const [newStaff, setNewStaff] = useState<Staff>({
    staffId:"",
    firstName:"",
    lastName:"",
    email:"",
    joinDate:"",
    phone:"",
    role:""
  });

  //add Staff Member data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name ,value} = e.target;
    setNewStaff((prev)=> ({...prev,[name]:value}))
  }

  //add new Member
  const handleOnSubmit = async () =>{
    try{
     const newStaffDetails = await addStaff(newStaff);
     handleAdd(newStaffDetails)
     handleOnClose()
    }catch(err){
        console.error("Failed to update the Member",err)
    }        
}

const createFormElement = (label:string, name:keyof Staff, type="text") =>(
  <FloatingLabel controlId="floatingInput" label={label}className="mb-3">
    <Form.Control 
      type={type}
      name={name}
      value={newStaff[name]}
      onChange={handleOnChange}
    />
  </FloatingLabel>
 );
  return (
    <>
      <Modal show={show} onHide={handleOnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Staff Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form>
          {createFormElement("First Name","firstName")}
          {createFormElement("Last Name","lastName")}
          {createFormElement("Email","email")}
          {createFormElement("Join Date","joinDate")}
          {createFormElement("Phone Number","phone")}
          {createFormElement("Role","role")}
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOnClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddStaffMember;