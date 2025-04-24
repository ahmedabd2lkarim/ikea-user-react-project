// hooks/useFetchTeaser.js
import { useEffect, useState } from "react";
import axios from "axios";

const useFetchTeaser = (category = "Home") => {
  const [teaserData, setTeaserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeaser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/teasers/${category}`);
        setTeaserData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching teaser data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeaser();
  }, [category]);

  return { teaserData, loading };
};

export default useFetchTeaser;
