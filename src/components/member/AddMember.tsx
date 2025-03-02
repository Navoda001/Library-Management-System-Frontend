import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";

interface Member {
  memberId: string;
  name: string;
  email: string;
}

function AddMember({ show, handleOnClose, handleAdd,addMember }: any) {

  const [newMember, setNewMember] = useState<Member>({
    memberId: "",
    name: "",
    email: ""
  });

  //add Member data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name ,value} = e.target;
    setNewMember((prev)=> ({...prev,[name]:value}))
  }

  //add new Member
  const handleOnSubmit = async () =>{
    try{
     const newMemberDetails = await addMember(newMember);
     handleAdd(newMemberDetails)
     handleOnClose()
    }catch(err){
        console.error("Failed to update the Member",err)
    }        
}

const createFormElement = (label:string, name:keyof Member, type="text") =>(
  <FloatingLabel controlId="floatingInput" label={label}className="mb-3">
    <Form.Control 
      type={type}
      name={name}
      value={newMember[name]}
      onChange={handleOnChange}
    />
  </FloatingLabel>
 );
  return (
    <>
      <Modal show={show} onHide={handleOnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form>
          {createFormElement("Member Name","name","text")}
          {createFormElement("E mail","email","text")}
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

export default AddMember;