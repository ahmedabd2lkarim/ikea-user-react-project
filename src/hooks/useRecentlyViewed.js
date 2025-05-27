const MAX_RECENT_PRODUCTS = 3;
const STORAGE_KEY = "recently_viewed_products";

export const useRecentlyViewed = () => {
  const addRecentlyViewed = (product) => {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

      const filtered = existing.filter((item) => item._id !== product._id);

      const updated = [product, ...filtered].slice(0, MAX_RECENT_PRODUCTS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error updating recently viewed products:", error);
    }
  };

  return { addRecentlyViewed };
};
