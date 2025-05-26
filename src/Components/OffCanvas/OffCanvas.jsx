import { forwardRef, useImperativeHandle, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import useViewport from "../../hooks/useViewport";
import styles from "./OffCanvas.module.css";
const OffCanvas = forwardRef(({ content, title, ...props }, ref) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useImperativeHandle(ref, () => ({
    handleShow,
    handleClose,
  }));
  const width = useViewport();
  return (
    <>
      <Offcanvas
        className={`rounded-start  ${styles.offCanvas} ${
          width < 600 ? styles.offCanvasSmall : ""
        }`}
        show={show}
        onHide={handleClose}
        placement={width < 600 ? "bottom" : "end"}
        {...props}
      >
        <Offcanvas.Header className=" pt-3 " closeButton>
          <h6>{title}</h6>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-3" style={{ padding: "0" }}>
          {content}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
});
export default OffCanvas;
