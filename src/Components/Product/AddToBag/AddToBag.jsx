import { Button } from "@mui/joy";
import styles from "./AddToBag.module.css";
import { TbBasketPlus } from "react-icons/tb";
export default function AddToBag({ currentProduct, relatedProducts }) {
  return (
    <>
      <div className={` ${styles.addedCardPrd} `}>
        <div>
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.imageAlt.en}
          />
        </div>
        <div className={`${styles["added-card-product-info"]}`}>
          <b>{currentProduct.name}</b>
          <p className="m-0">
            {currentProduct.typeName.en + ", " + currentProduct.measurement.en}
          </p>
          <p>
            <span
              style={{
                fontSize: "12px",
                verticalAlign: "top",
                fontWeight: "bold",
              }}
            >
              {currentProduct.price.currency}
            </span>
            <strong className="fs-3">
              {currentProduct.price.currentPrice}
            </strong>
          </p>
        </div>
      </div>
      <div
        style={{
          height: "50vh",
          borderBlock: "1px solid gray",
          padding: "2px 6px",
        }}
        className=" overflow-auto "
      >
        <h2 className="m-3 mb-5 fw-bold">Complement your order</h2>
        {relatedProducts.map((prd) => {
          console.log(prd);
          return (
            <div key={prd.id} className={styles.compeleteOrderProduct}>
              <div style={{ width: "fit-content" }}>
                <img src={prd.images[0]} alt="" />
              </div>
              <div className={styles.compeleteOrderProductInfo}>
                <b>{prd.name}</b>
                <p className="m-0">
                  {prd.typeName.en + ", " + prd.measurement.en}
                </p>
                <p>
                  <span
                    style={{
                      fontSize: "12px",
                      verticalAlign: "top",
                      fontWeight: "bold",
                    }}
                  >
                    {prd.price.currency}
                  </span>
                  <strong className="fs-3">{prd.price.currentPrice}</strong>
                </p>
              </div>
              <div>
                <Button
                  sx={{
                    borderRadius: "50%",
                    minWidth: 0,
                    width: 40,
                    height: 40,
                    padding: 0,
                  }}
                >
                  <TbBasketPlus fontSize={20} />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-around my-1 flex-wrap align-items-center">
        <Button
          className="rounded-pill"
          sx={{
            border: "1px black solid",
            background: "white",
            color: "black",
            padding: "18px 36px ",
            fontWeight: "bold",
          }}
        >
          Continue shopping
        </Button>
        <Button
          className="rounded-pill"
          sx={{
            background: "black",
            color: "white",
            padding: "18px 36px ",
            fontWeight: "bold",
          }}
        >
          Go to shopping bag
        </Button>
      </div>
    </>
  );
}
