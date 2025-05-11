import React, { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./Model.module.css";

const Model = forwardRef(({ content, title, ...props }, ref) => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  useImperativeHandle(ref, () => ({
    handleShow,
    handleClose,
  }));
  return (
    <Modal
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="xl"
      onHide={handleClose}
      dialogClassName={styles.modalCustom}
      contentClassName={styles.modalContent}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="text-center w-100"
          as={"p"}
          id="contained-modal-title-vcenter"
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalContent}>{content}</Modal.Body>
    </Modal>
  );
});
Model.displayName = "Model";
export default Model;
