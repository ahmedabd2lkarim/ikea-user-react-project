import React, { useRef } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Recommendedproducts = ({ products }) => {
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };
  return (
    <Container>
      <Row className="mb-2">
        <Col className="text-start">
          <Button variant="outline-primary" onClick={() => scroll("left")}>
            ◀
          </Button>
        </Col>
        <Col className="text-end">
          <Button variant="outline-primary" onClick={() => scroll("right")}>
            ▶
          </Button>
        </Col>
      </Row>

      <div
        ref={scrollRef}
        className="d-flex overflow-auto pb-3"
        style={{ scrollBehavior: "smooth", gap: "1rem" }}
      >
        {products.map((product) => (
          <Card
            onClick={() => navigate(`/productDetails/${product.id}`)}
            key={product.id}
            style={{ minWidth: "18rem" }}
            className="flex-shrink-0"
          >
            <Card.Img
              variant="top"
              style={{ height: "180px", objectFit: "contain" }}
              src={product.images[0]}
              alt={product.name}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>
                <strong>${product.price.currentPrice}</strong>
              </Card.Text>
              <Button variant="primary">Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Recommendedproducts;
