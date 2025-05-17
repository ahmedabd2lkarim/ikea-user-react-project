<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import Recommendedproducts from "../../Components/Product/ProductsCarousel/ProductsCarousel";
import Loading from "../../Components/Loading/Loading";
import "./Home.css";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://127.0.0.1:5000/api/products`);
        const res = await response.json();
        console.log(response);

        setProducts(res.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);
  console.log(products);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <Recommendedproducts products={products} />
      </section>
    </div>
  );
};

=======
import React from "react";

const Home = () => {
  return <div>Home</div>;
};

>>>>>>> origin/Soha
export default Home;
