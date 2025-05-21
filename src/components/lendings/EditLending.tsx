import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";


interface Lending {
  lendingId:string;
  book:string;
  member:string;
}

interface LendingEditProps {
  show: boolean;
  selectedRow: Lending | null;
  handleClose: () => void;
  handleUpdate: (updatedLending: Lending) => void;
  updateLending: (lending: Lending) => Promise<void>;
}


function EditLending({ show, selectedRow, handleClose, handleUpdate, updateLending }: LendingEditProps) {

  const [lending, setLending] = useState<Lending>({
    lendingId: "",
    book: "",
    member: "",
  });

  useEffect(() => {
    if (selectedRow) {
      setLending({ ...selectedRow })
    }
  }, [selectedRow])

  //add lending data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLending({ ...lending, [e.target.name]: e.target.value })
  }
  const handleSave = async () => {
    try {
      await updateLending(lending);
      handleUpdate(lending)
      handleClose()
    } catch (err) {
      console.error("Failed to update the book", err)
    }
  }

  // handle the repeat of FloatingLabel
  const renderFloatingTable = (label: string, name: keyof Lending, type = "text", readOnly = false) =>
  (
    <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
      <Form.Control
        type={type}
        name={name}
        value={lending[name]}
        onChange={handleOnChange}
        readOnly={readOnly}
      />
    </FloatingLabel>
  );

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Lending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form>
          {renderFloatingTable("Book Id","book","text")}
          {renderFloatingTable("Member Id","member","text")}
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

export default EditLending;