import React, { useState, useEffect } from "react";
import Recommendedproducts from "../../Components/Product/Recommendedproducts/RecommendedProducts";
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
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="home-container">
      {/* You can add other sections of your home page here */}

      {/* Featured Products Section */}
      <section className="featured-products">
        <h2 className="section-title">Featured Products</h2>
        <Recommendedproducts products={products} />
      </section>

      {/* You can add more sections as needed */}
    </div>
  );
};

export default Home;
