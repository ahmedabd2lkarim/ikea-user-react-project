import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/material";

export default function ProductRating({ productPrice }) {
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#000",
    },
  });

  const getRatingData = useMemo(() => {
    const price = productPrice?.currentPrice || 0;

    // Generate rating based on price range
    const getBaseRating = () => {
      if (price >= 10000) return 4.7;
      if (price >= 5000) return 4.5;
      if (price >= 2000) return 4.2;
      if (price >= 1000) return 4.0;
      return 3.8;
    };

    // Add some randomization to rating
    const baseRating = getBaseRating();
    const randomOffset = (Math.random() - 0.5) * 0.4; // +/- 0.2
    const rating = Math.min(5, Math.max(1, baseRating + randomOffset));

    // Generate number of reviews based on price
    const getReviewCount = () => {
      const baseCount = Math.floor(price / 100); // Higher price = more reviews
      const randomFactor = 0.3; // 30% variation
      const variation = Math.floor(
        baseCount * randomFactor * (Math.random() - 0.5)
      );
      return Math.max(3, baseCount + variation);
    };

    return {
      rating: Number(rating.toFixed(1)),
      reviewCount: getReviewCount(),
    };
  }, [productPrice]);

  return (
    <div className="d-flex align-items-center gap-2 mb-3">
      <StyledRating
        readOnly
        sx={{ fontSize: "18px" }}
        name="product-rating"
        value={getRatingData.rating}
        precision={0.1}
      />
      <span className="text-secondary" style={{ fontSize: "14px" }}>
        ({getRatingData.reviewCount})
      </span>
    </div>
  );
}
