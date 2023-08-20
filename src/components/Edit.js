import React from "react";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { editTodo } from "../redux/action/action";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


export default function Edit({ todoLists, showModal, onHide }) {
  const dispatch = useDispatch();
  const editRef = useRef(null);

  const handleEditItem = () => {
    dispatch(
      editTodo({
        id: todoLists.id,
        text: editRef.current.value,
        isDone: false,
      })
    );
    onHide();
  };

  // const id = todoLists?.id;
  const text = todoLists?.text;

  return (
    <Modal show={showModal} animation={true} onHide={onHide}  backdropClassName="customBackdrop">
      <Modal.Header>
        <Modal.Title>Edit Todo</Modal.Title>
        <button className="close" onClick={onHide}>
          {/* You can use any icon or text */}
          &times;
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="text" defaultValue={text} ref={editRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleEditItem}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
