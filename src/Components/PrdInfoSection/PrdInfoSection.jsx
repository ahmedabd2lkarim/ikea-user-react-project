import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import IconButton from "@mui/material/IconButton";

export default function PrdInfoSection() {
  return (
    <div className="prd-description">
      <div className="d-flex justify-content-between">
        <div>
          <b className="text-danger font-weight-bold">Kitchen offer</b>
          <b className="d-block">ÄSPINGE</b>
          <p className="text-secondary">
            Kitchenette, black/ash,
            <Link className="hoverLink" onClick={openOffCanvas}>
              120x60x202 cm
            </Link>
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
      {/* <div className=""> */}
      <div className="d-flex justify-content-between my-2">
        <b>How to get it</b>
        <Link className="hoverLink">Change store</Link>
      </div>
      <div className="card p-3">
        <div className="d-flex flex-column ">
          <div className="d-flex align-items-center">
            <GrDeliver
              style={{ width: "24px" }}
              fontSize={"40px"}
              className="me-3"
            />
            <p className="m-0 fw-bold">Delivery</p>
          </div>
          <p
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
          </p>
        </div>
        <hr className="m-0" />
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column ">
            <div className="d-flex align-items-center">
              <HiOutlineBuildingStorefront
                style={{ width: "24px" }}
                fontSize={"40px"}
                className="me-3"
              />
              <p className="m-0 fw-bold">IKEA Cairo Festival City</p>
            </div>
            <p
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
            </p>
          </div>
          <NavigateNextIcon />
        </div>
      </div>
      <Button className="rounded-pill w-100 py-3 my-4">Add to bag</Button>
      <div className="border mb-3 ">
        <p className="py-2 text-center mb-0">
          <span className="text-primary fw-bold">39</span> people have viewed
          this product today
        </p>
      </div>
      {/* </div> */}
    </div>
  );
}
