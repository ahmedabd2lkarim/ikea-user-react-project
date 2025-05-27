import { useState, useEffect } from "react";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;

const useFetchProducts = (categoryId) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return; // avoid fetching if no categoryId

    axios
      .get(`${VITE_API_URL}/api/promos/products/${categoryId}`)
      .then((res) => {
        setProducts(res.data.data || res.data); // depends on your API response structure
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  return { products, loading };
};

export default useFetchProducts;
