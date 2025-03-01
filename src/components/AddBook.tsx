import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { AddBookData,DeleteBook,GetBooks,UpdateBook } from '../service/BookData';


interface Book {
  bookId: String;
  bookName: String;
  author: String;
  edition: String;
  publisher: String;
  isbn: String;
  price: number;
  totalQty: number;
  availableQty: number;
}

// interface BookEditProps {
//   show: boolean;
//   selectedRow: Book | null;
//   handleClose: () => void;
//   handleUpdate: (updatedBook: Book) => void;
// }


function AddBook({ show, handleOnClose, handleAdd }: any) {

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
     const newBookDetails = await AddBookData(newBook);
     handleAdd(newBookDetails)
     handleOnClose()
    }catch(err){
        console.error("Failed to update the book",err)
    }        
}

  return (
    <>
      <Modal show={show} onHide={handleOnClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form>

            <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
              <Form.Control
                type="text"
                name="bookName"
                value={newBook.bookName?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Author" className="mb-3">
              <Form.Control
                type="text"
                name="author"
                value={newBook.author?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Edition" className="mb-3">
              <Form.Control
                type="text"
                name="edition"
                value={newBook.edition?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Publisher" className="mb-3">
              <Form.Control
                type="text"
                name="publisher"
                value={newBook.publisher?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="ISBN" className="mb-3">
              <Form.Control
                type="text"
                name="isbn"
                value={newBook.isbn?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
              <Form.Control
                type="number"
                name="price"
                value={newBook.price}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Total Qty" className="mb-3">
              <Form.Control
                type="number"
                name="totalQty"
                value={newBook.totalQty}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Avl Qty" className="mb-3">
              <Form.Control
                type="number"
                name="availableQty"
                value={newBook.availableQty}
                onChange={handleOnChange}
              />
            </FloatingLabel>

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