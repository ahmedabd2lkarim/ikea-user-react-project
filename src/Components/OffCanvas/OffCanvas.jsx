import { forwardRef, useImperativeHandle, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";

const OffCanvas = forwardRef(({content,title, ...props }, ref) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useImperativeHandle(ref, () => ({
    handleShow,
  }));
  return (
    <>
      <Offcanvas
        className="rounded-start"
        show={show}
        onHide={handleClose}
        placement="end"
        {...props}
      >
        <Offcanvas.Header closeButton>
          <h4>{title}</h4>
        </Offcanvas.Header>
        <Offcanvas.Body>{content}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
});
export default OffCanvas;
