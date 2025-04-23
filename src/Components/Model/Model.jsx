import React, { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-bootstrap/Modal";

const Model = forwardRef(({ content,title, ...props }, ref) => {
  const [show, setShow] = useState(false);
  console.log(props);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useImperativeHandle(ref, () => ({
    handleShow,
  }));
  return (
    <Modal
      show={show}
      // dialogClassName="modal-90w"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="xl"
      onHide={handleClose}
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title
          className="text-center w-100"
          style={{ textAlign: "center" }}
          as={"p"}
          id="contained-modal-title-vcenter"
        >
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
        {/* <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
});
export default Model;
// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }
