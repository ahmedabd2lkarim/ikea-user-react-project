import { forwardRef, useImperativeHandle, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const Model = forwardRef(({ name, title,modelContent, ...props }, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useImperativeHandle(ref, () => ({
    handleShow,
  }));
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2">
        {name}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {modelContent}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
});
export default Model;
// function Example() {
//   return (
//     <>
//       {["start", "end", "top", "bottom"].map((placement, idx) => (
//         <OffCanvasExample key={idx} placement={placement} name={placement} />
//       ))}
//     </>
//   );
// }

// render(<Example />);
