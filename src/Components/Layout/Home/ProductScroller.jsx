import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const ProductScroller = ({ deals, title, categories, products, cardWidth = 170 }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    categories ? Object.keys(categories)[0] : null
  );

  const renderProducts = () => {
    if (categories) {
      const selected = categories[selectedCategory];
      const deal = selected?.deal;
      return selected?.products.map((product, index) => (
        <HoverCard
          key={index}
          product={product}
          cardWidth={cardWidth}
          deals={deal} 
        />
      ));
    } else if (products) {
      return products.map((product, index) => (
        <HoverCard key={index} product={product} cardWidth={cardWidth} deals={deals} />
      ));
    } else {
      return null;
    }
  };

  if (!categories && !products) return null;

  return (
    <Box sx={{ my: 4 }}>

      {title && (
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}

      {categories && Object.keys(categories).length > 1  && (
        <Box sx={{ position: "relative", mb: 3 }}>
          <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
            {Object.keys(categories).map((category) => (
              <Typography
                key={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  cursor: "pointer",
                  color:
                    selectedCategory === category ? "black" : "gray",
                  fontWeight: selectedCategory === category ? "bold" : "normal",
                  borderBottom:
                    selectedCategory === category ? "3px solid #007bff" : "none",
                  pb: 0.5,
                  transition: "all 0.3s ease",
                }}
              >
                {category}
              </Typography>
            ))}
          </Box>
          <Box
            sx={{
              height: "1px",
              width: "100%",
              bgcolor: "lightgray",
              position: "absolute",
              bottom: 0,
              left: 0,
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 2,
          "&::-webkit-scrollbar": {
            height: 4,
            width: 10,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "black",
          },
          "&:hover::-webkit-scrollbar": {
            height: 5,
            width: 10,
          },
        }}
      >
        {renderProducts()}
      </Box>
    </Box>
  );
};

const HoverCard = ({ product, cardWidth, deals }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        minWidth: cardWidth,
        maxWidth: cardWidth,
        flex: "0 0 auto",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardMedia
        component="img"
        image={hovered ? product.contextualImageUrl : product.image}
        alt={product.imageAlt || product.name}
        sx={{ objectFit: "cover", p: 1 }}
      />

      <CardContent sx={{ px: 2, pb: 2 }}>
        {deals && <Typography variant="body1" color="red" fontWeight={'bold'} fontSize={12} sx={{ mb: 2 }}>
          {deals}
        </Typography>}
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{
            height: 38,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            mb: 0.5,
          }}
        >
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.typeName}
        </Typography>
        <Box>
          {product.price.discounted ? (
            <>
              <Typography
                variant="body2"
                color="black"
                sx={{
                  textDecoration: "line-through",
                  fontSize: "1rem",
                }}
              >
                 <Typography variant="span" fontSize=".8rem">{product.price?.currency}</Typography>{" "}
                {(product.price?.currentPrice + Math.floor(15 * 50) + 10).toFixed(2)}
              </Typography>
              <Typography color="error" fontWeight="bold" fontSize="1.2rem">
                <Typography variant="span" fontSize=".8rem">{product.price?.currency}</Typography> {product.price?.currentPrice}
              </Typography>
            </>
          ) : (
            <Typography color="black" fontWeight="bold" fontSize="1.2rem">
               <Typography variant="span" fontSize=".8rem">{product.price?.currency}</Typography> {product.price?.currentPrice}
            </Typography>
          )}
        </Box>

        <Box sx={{ gap: 1 }}>
          <Tooltip title="Add to Cart">
            <IconButton
              size="small"
              sx={{
                bgcolor: "#004F93",
                borderRadius: "50%",
                p: "0.3rem",
              }}
            >
              <span className="pip-btn__inner">
                <svg
                  viewBox="0 0 24 24"
                  focusable="false"
                  width="25"
                  height="20"
                  aria-hidden="true"
                  className="pip-svg-icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.9997 4C10.2948 4 9.019 5.122 8.5418 6.7127 8.2172 7.7946 7.97 8.9013 7.7083 10H1.5566l3.7501 10h9.6931v-2h-8.307l-2.2501-6h3.3251c.6634 2.1065 1.7665 4 4.2319 4 2.4653 0 3.5685-1.8935 4.2318-4h3.3252l-.375 1h2.136l1.125-3H16.291c-.2617-1.0987-.5089-2.2054-.8335-3.2873C14.9803 5.122 13.7045 4 11.9997 4zm2.2348 6c-.2293-.9532-.5299-2.1701-.6927-2.7127C13.3155 6.533 12.8255 6 11.9997 6s-1.3159.533-1.5422 1.2873C10.2947 7.83 9.9941 9.0468 9.7648 10h4.4697zm-4.361 2h4.2523c-.3635 1.0612-.8841 2-2.1261 2-1.2421 0-1.7627-.9388-2.1262-2z"
                  ></path>
                  <path
                    fill="white"
                    d="M19.9998 14h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2z"
                  ></path>
                </svg>
              </span>
            </IconButton>
          </Tooltip>
          <Tooltip title="Add to Favorites">
            <IconButton size="small" sx={{ bgcolor: "white" }}>
              <FavoriteBorderIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductScroller;
