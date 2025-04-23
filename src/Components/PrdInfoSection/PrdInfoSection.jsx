import { Link } from "react-router-dom";
import {
  IoMdInformationCircleOutline,
  HiOutlineBuildingStorefront,
  GrDeliver,
  FaAngleDown,
} from "../../common/react-icons/index";
import { Button } from "../../common/mui/index";
import {
  FavoriteBorderIcon,
  NavigateNextIcon,
} from "../../common/mui-icons/index";
import { IconButton } from "../../common/mui/index";
import OffCanvas from "../OffCanvas/OffCanvas";
import { useRef, useState } from "react";
import { Collapse } from "react-bootstrap";
export default function PrdInfoSection() {
  const measureRef = useRef();
  const storeRef = useRef();
  const storeInfoRef = useRef();
  const [open, setOpen] = useState(false);
  const openOffCanvas = (ref) => {
    ref.current?.handleShow();
  };
  //  const collapseIcon = useRef(null);
  const [collapseValue, setCollapse] = useState(false);
  const collapseFun = () => {
    setCollapse(!collapseValue);
    console.log(collapseValue);
  };
  const content = (
    <div className="d-flex flex-column">
      <span>Width</span>
      <span>height</span>
      <span>Weight</span>
      <img src="img1.avif" alt="" />

      <hr />
      {}
      <div
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        <div
          onClick={() => collapseFun()}
          className="d-flex justify-content-between align-items-center"
        >
          <p className="fw-bold sections-info">Packaging</p>
          <FaAngleDown style={collapseValue ? { rotate: "y 180deg" } : ""} />
        </div>
        <Collapse in={open}>
          <div id="example-collapse-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt esse
            placeat, perspiciatis nostrum officiis minus aspernatur iste
            distinctio assumenda voluptatibus? Voluptate ipsa itaque, doloremque
            quae temporibus quam doloribus. Nihil, ipsa!
          </div>
        </Collapse>
      </div>
    </div>
  );
  return (
    <div className="prd-description">
      <div className="d-flex justify-content-between">
        <div>
          <b className="text-danger font-weight-bold">Kitchen offer</b>
          <b className="d-block">ÄSPINGE</b>
          <p className="text-secondary">
            Kitchenette, black/ash,
            <Link
              className="hoverLink"
              onClick={() => openOffCanvas(measureRef)}
            >
              120x60x202 cm
            </Link>
            <OffCanvas ref={measureRef} title="Measurments" content={content} />
          </p>
          <p className="text-decoration-line-through fw-bold m-0">EGP29,995</p>
          <b className="text-danger fs-2">
            <sup>EGP</sup>24,995
          </b>
        </div>
        <div>
          <IconButton className="favIcon">
            <FavoriteBorderIcon />
          </IconButton>
        </div>
      </div>

      <div className="d-flex" style={{ fontSize: "12px", color: "gray" }}>
        <div className="d-flex align-items-center me-1">
          <IoMdInformationCircleOutline style={{ fontSize: "20px" }} />
        </div>
        <p className="my-2 ">
          FYNDIG sink, LAGAN mixer tap and LILLVIKEN water trap sold separately.
          Complete with your choice of TILLREDA portable hob, LAGAN or TILLREDA
          fridge, TILLREDA microwave oven, HÅLLBAR waste management and
          VARIERA/UPPDATERA organisers. Sold separately.
        </p>
      </div>
      <br />
      <div className="d-flex justify-content-between my-2">
        <b>How to get it</b>
        <Link className="hoverLink" onClick={() => openOffCanvas(storeRef)}>
          Change store
        </Link>
        <OffCanvas ref={storeRef} content={"hello every body"} />
      </div>
      <div className="card p-3">
        <div className="d-flex flex-column mb-3">
          <div className="d-flex align-items-center ">
            <GrDeliver
              style={{ width: "24px" }}
              fontSize={"40px"}
              className="me-3"
            />
            <p className="m-0 fw-bold">Delivery</p>
          </div>
          <div
            style={{
              fontSize: "14px",
              paddingLeft: "40px",
              color: "",
            }}
          >
            <div
              className="d-inline-block me-1"
              style={{
                width: "12px",
                height: "12px",
                background: "#0A8A00",
                borderRadius: "50%",
              }}
            ></div>
            Available
          </div>
        </div>
        <hr className="m-0" />
        <div
          className="d-flex justify-content-between align-items-center pointer"
          onClick={() => openOffCanvas(storeInfoRef)}
        >
          <div className="d-flex flex-column ">
            <div className="d-flex align-items-center">
              <HiOutlineBuildingStorefront
                style={{ width: "24px" }}
                fontSize={"40px"}
                className="me-3"
              />
              <p className="m-0 fw-bold">IKEA Cairo Festival City</p>
            </div>
            <div
              style={{
                fontSize: "14px",
                paddingLeft: "40px",
              }}
            >
              <div
                className="d-inline-block me-1"
                style={{
                  width: "12px",
                  height: "12px",
                  background: "#0A8A00",
                  borderRadius: "50%",
                }}
              ></div>
              Store - In stock
            </div>
          </div>
          <NavigateNextIcon />
        </div>
        <OffCanvas ref={storeInfoRef} content={"hello store info"} />
      </div>
      <Button className="rounded-pill w-100 py-3 my-4">Add to bag</Button>
      <div className="border mb-3 ">
        <p className="py-2 text-center mb-0">
          <span className="text-primary fw-bold">39</span> people have viewed
          this product today
        </p>
      </div>
    </div>
  );
}
