import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";

interface Lending {
  lendingId:string;
  book:string;
  member:string;
}

function AddLending({ show, handleOnClose, handleAdd,addBook }: any) {

  const [newLending, setNewLending] = useState<Lending>({
    lendingId: "",
    book: "",
    member: "",
  });

  //add lending data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name ,value} = e.target;
    setNewLending((prev)=> ({...prev,[name]:value}))
  }

  //add new book
  const handleOnSubmit = async () =>{
    try{
     const newLendingDetails = await AddLending(newLending);
     handleAdd(newLendingDetails)
     handleOnClose()
    }catch(err){
        console.error("Failed to update the book",err)
    }        
}

const createFormElement = (label:string, name:keyof Lending, type="text") =>(
  <FloatingLabel controlId="floatingInput" label={label}className="mb-3">
    <Form.Control 
      type={type}
      name={name}
      value={newLending[name]}
      onChange={handleOnChange}
    />
  </FloatingLabel>
 );
  return (
    <>
      <Modal show={show} onHide={handleOnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Lending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form>
          {createFormElement("Book Id","book","text")}
          {createFormElement("Member Id","member","text")}
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

export default AddLending;