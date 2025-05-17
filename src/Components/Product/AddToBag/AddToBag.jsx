import { Button } from "@mui/joy";
import styles from "./AddToBag.module.css";
import { TbBasketPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProductRating from "../../ProductRating/ProductRating";

export default function AddToBag({ currentProduct, products }) {
  const relatedProducts = [];
  products.filter((product) => {
    if (
      currentProduct._id !== product._id &&
      currentProduct.typeName.en === product.typeName.en
    ) {
      relatedProducts.push(product);
    }
  });
<<<<<<< HEAD
  console.log(relatedProducts);
=======
  // console.log(relatedProducts);
>>>>>>> origin/Magy

  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const handleMouseEnter = (productId) => {
    setHoveredId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
  };

  return (
    <div className="d-flex flex-column justify-content-center h-100">
      <div className={` ${styles.addedCardPrd} mb-3`}>
        <div>
          <img
            src={currentProduct.images[0]}
            alt={currentProduct.imageAlt.en}
          />
        </div>
        <div className={`${styles["added-card-product-info"]}`}>
          <p className="m-0 " style={{ fontSize: "15px" }}>
            <b className="d-block ">{currentProduct.name}</b>
            {currentProduct.typeName.en + ", "}
            {`${currentProduct.measurement.width}x${
              currentProduct.measurement.depth
                ? currentProduct.measurement.depth + "x"
                : ""
            }${
              currentProduct.measurement.height ||
              currentProduct.measurement.length
            } ${currentProduct.measurement.unit || "cm"}`}
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
          borderBlock: "1px solid #00000029",
          padding: "2px 6px",
        }}
        className=" overflow-auto "
      >
        <h3 className="m-3 mb-5 fw-bold">Complement your order</h3>

        {relatedProducts.map((prd) => {
          return (
            <div className="d-flex" key={prd.id}>
              <div
                onClick={() => navigate(`/productDetails/${prd._id}`)}
                className={styles.compeleteOrderProduct}
              >
                <div style={{ width: "fit-content" }}>
                  <img
                    src={
                      hoveredId === prd.id && prd.images[1]
                        ? prd.images[1]
                        : prd.images[0]
                    }
                    alt="prd.imageAlt.en"
                    onMouseEnter={() => handleMouseEnter(prd.id)}
                    onMouseLeave={handleMouseLeave}
                  />
                </div>

                <div>
                  <div className="d-flex justify-content-between mb-2">
                    <div
                      style={{ width: "100%" }}
                      className={styles.compeleteOrderProductInfo}
                    >
                      <p className="m-0 " style={{ fontSize: "15px" }}>
                        <b className="d-block ">{prd.name}</b>
                        {prd.typeName.en + ", "}
                        {`${prd.measurement?.width}x${
                          prd.measurement?.depth
                            ? prd.measurement?.depth + "x"
                            : ""
                        }${
                          prd.measurement?.height || prd.measurement?.length
                        } ${prd.measurement?.unit || "cm"}`}
                      </p>
                      <p className="m-0">
                        <span
                          style={{
                            fontSize: "12px",
                            verticalAlign: "top",
                            fontWeight: "bold",
                          }}
                        >
                          {prd.price.currency}
                        </span>
                        <strong className="fs-3">
                          {prd.price.currentPrice}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <div>
                    <ProductRating productPrice={prd.price} />
                  </div>
                </div>
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
      <div className="d-flex justify-content-around flex-wrap py-4">
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
    </div>
  );
}
