import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
};

export default useFetchProducts;
