import { Fragment, useState } from "react";
import { Chip, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Correct import for CloseIcon
import { Offcanvas } from "react-bootstrap";

function LoginButton() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <Fragment>
      {/* Log In Chip Button */}
      <Chip
        label="Log In"
        onClick={handleShow}
        clickable
        sx={{
          backgroundColor: "#fff",
          color: "#212529",
          px: { xs: 0.5, sm: 1.5, md: 1 },
          py: { xs: 0.5, sm: 1, md: 2.4},
          fontSize: { xs: 11, sm: 13, md: 14 },
          fontWeight: "bold",
          borderRadius: 35,
          border: "2px solid #212529",
          transition: "all 0.1s ease-in-out",
          width: { md: "12%", sm: "30%", xs: "100%" },
          "&:hover": {
            borderWidth: "2.5px",
            backgroundColor: "#fff",
          },
        }}
      />

      {/* Offcanvas for login */}
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement={"end"}
        scroll={true}
        backdrop={true}
        style={{
          height: "auto",
          padding: "20px",
          borderRadius: "2%",
          width: "35%",
        }}
      >
        <Offcanvas.Header className="border-0">
          <Offcanvas.Title className="w-100 d-flex justify-content-between align-items-center">
            <Typography
              variant="h6"
              className="fw-bolder text-center flex-grow-1 fs-3"
            >
              Login
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body
          className="d-flex flex-column justify-content-between"
          style={{ height: "100%" }}
        >
          {/* Login content (you can replace this with actual login form) */}
          <Typography variant="h5" color="initial">
            Log in form or style goes here
          </Typography>
        </Offcanvas.Body>
      </Offcanvas>
    </Fragment>
  );
}

export default LoginButton;
