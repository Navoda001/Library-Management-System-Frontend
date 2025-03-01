import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";
import { UpdateBook } from "../service/Books/UpdateBook";

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
  lastUpdateDate: String;
  lastUpdateTime: String;
}

interface BookEditProps {
  show: boolean;
  selectedRow: Book | null;
  handleClose: () => void;
  handleUpdate: (updatedBook: Book) => void;
}


function EditBook({ show, selectedRow, handleClose, handleUpdate }: BookEditProps) {

  const [book, setBook] = useState<Book>({
    bookId: "",
    bookName: "",
    author: "",
    edition: "",
    publisher: "",
    isbn: "",
    price: 0,
    totalQty: 0,
    availableQty: 0,
    lastUpdateDate: "",
    lastUpdateTime: ""
  });

  useEffect(() => {
    if (selectedRow) {
      setBook({ ...selectedRow })
    }
  }, [selectedRow])

  //add book data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value })
  }
  const handleSave = async () =>{
    try{
     const updatedBook = await UpdateBook(book);
     handleUpdate(updatedBook)
     handleClose()
    }catch(err){
        console.error("Failed to update the book",err)
    }        
}

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form>

            <FloatingLabel controlId="floatingInput" label="Book Id" className="mb-3">
              <Form.Control
                readOnly
                type="text"
                name="bookId"
                value={book.bookId?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
              <Form.Control
                type="text"
                name="bookName"
                value={book.bookName?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Author" className="mb-3">
              <Form.Control
                type="text"
                name="author"
                value={book.author?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Edition" className="mb-3">
              <Form.Control
                type="text"
                name="edition"
                value={book.edition?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Publisher" className="mb-3">
              <Form.Control
                type="text"
                name="publisher"
                value={book.publisher?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="ISBN" className="mb-3">
              <Form.Control
                type="text"
                name="isbn"
                value={book.isbn?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Price" className="mb-3">
              <Form.Control
                type="number"
                name="price"
                value={book.price}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Total Qty" className="mb-3">
              <Form.Control
                type="number"
                name="totalQty"
                value={book.totalQty}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Avl Qty" className="mb-3">
              <Form.Control
                type="number"
                name="availableQty"
                value={book.availableQty}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Last Updated Date" className="mb-3">
              <Form.Control
                type="text"
                name="lastUpdateDate"
                value={book.lastUpdateDate?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingInput" label="Last Updated time" className="mb-3">
              <Form.Control
                type="text"
                name="lastUpdateTime"
                value={book.lastUpdateTime?.toString()}
                onChange={handleOnChange}
              />
            </FloatingLabel>


          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditBook;