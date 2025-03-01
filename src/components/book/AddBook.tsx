import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";

interface Book {
  bookId: string;
  bookName: string;
  author: string;
  edition: string;
  publisher: string;
  isbn: string;
  price: number;
  totalQty: number;
  availableQty: number;
}

function AddBook({ show, handleOnClose, handleAdd,addBook }: any) {

  const [newBook, setNewBook] = useState<Book>({
    bookId: "",
    bookName: "",
    author: "",
    edition: "",
    publisher: "",
    isbn: "",
    price: 0,
    totalQty: 0,
    availableQty: 0
  });

  //add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name ,value} = e.target;
    setNewBook((prev)=> ({...prev,[name]:value}))
  }

  //add new book
  const handleOnSubmit = async () =>{
    try{
     const newBookDetails = await addBook(newBook);
     handleAdd(newBookDetails)
     handleOnClose()
    }catch(err){
        console.error("Failed to update the book",err)
    }        
}

const createFormElement = (label:string, name:keyof Book, type="text") =>(
  <FloatingLabel controlId="floatingInput" label={label}className="mb-3">
    <Form.Control 
      type={type}
      name={name}
      value={newBook[name]}
      onChange={handleOnChange}
    />
  </FloatingLabel>
 );
  return (
    <>
      <Modal show={show} onHide={handleOnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form>
          {createFormElement("Title","bookName","text")}
          {createFormElement("Author","author","text")}
          {createFormElement("Edition","edition","text")}
          {createFormElement("Publisher","publisher","text")}
          {createFormElement("ISBN","isbn","text")}
          {createFormElement("Price","price","number")}
          {createFormElement("Total Qty","totalQty","number")}
          {createFormElement("Avl Qty","availableQty","number")}
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

export default AddBook;