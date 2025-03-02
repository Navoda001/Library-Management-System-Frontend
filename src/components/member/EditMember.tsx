import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState, useEffect } from "react";

interface Member {
  memberId: string;
  name: string;
  email: string;
}

interface MemberEditProps {
  show: boolean;
  selectedRow: Member | null;
  handleClose: () => void;
  handleUpdate: (updatedMember: Member) => void;
  updateMember: (member: Member) => Promise<void>;
}


function EditMember({ show, selectedRow, handleClose, handleUpdate, updateMember }: MemberEditProps) {

  const [member, setMember] = useState<Member>({
    memberId: "",
    name: "",
    email: ""
  });

  useEffect(() => {
    if (selectedRow) {
      setMember({ ...selectedRow })
    }
  }, [selectedRow])

  //add member data from the form
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember({ ...member, [e.target.name]: e.target.value })
  }
  const handleSave = async () => {
    try {
      await updateMember(member);
      handleUpdate(member)
      handleClose()
    } catch (err) {
      console.error("Failed to update the member", err)
    }
  }

  // handle the repeat of FloatingLabel
  const renderFloatingTable = (label: string, name: keyof Member, type = "text", readOnly = false) =>
  (
    <FloatingLabel controlId="floatingInput" label={label} className="mb-3">
      <Form.Control
        type={type}
        name={name}
        value={member[name]}
        onChange={handleOnChange}
        readOnly={readOnly}
      />
    </FloatingLabel>
  );

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Form */}
          <Form>
            {renderFloatingTable("Member Id", "memberId", "text", true)}
            {renderFloatingTable("Member Name", "name")}
            {renderFloatingTable("E mail", "email")}
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

export default EditMember;