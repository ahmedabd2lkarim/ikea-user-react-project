import { useState, useEffect } from "react";

const STORAGE_KEY = "product_views";
const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const useProductViews = (productId) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const trackProductView = () => {
      try {
        // Get existing views from localStorage
        const storedViews = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "{}"
        );
        const now = Date.now();

        // Clean up expired views
        Object.keys(storedViews).forEach((key) => {
          if (now - storedViews[key].timestamp > EXPIRY_TIME) {
            delete storedViews[key];
          }
        });

        // Update view count for current product
        const currentViews = Object.values(storedViews).filter(
          (view) => view.productId === productId
        ).length;

        // Add new view if user hasn't viewed in current session
        if (!sessionStorage.getItem(`viewed_${productId}`)) {
          const newView = {
            productId,
            timestamp: now,
          };
          storedViews[crypto.randomUUID()] = newView;
          sessionStorage.setItem(`viewed_${productId}`, "true");
        }

        // Save updated views
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedViews));

        // Update view count
        setViewCount(currentViews + 1);
      } catch (error) {
        console.error("Error tracking product view:", error);
      }
    };

    trackProductView();
  }, [productId]);

  return viewCount;
};

export default useProductViews;
