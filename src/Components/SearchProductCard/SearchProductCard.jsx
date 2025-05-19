import React from 'react';
import { Card } from 'react-bootstrap';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TbBasketPlus } from 'react-icons/tb';
import { FavoriteBorderIcon } from '../../common/mui-icons';
import ProductRating from '../ProductRating/ProductRating';
import './SearchProductCard.css';

const SearchProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const currentLang = i18n.language;

    // Add price formatting helper function
    const formatPrice = (price) => {
        if (!price) return '';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EGP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            currencyDisplay: 'symbol'
        }).format(price);
    };

    const handleCardClick = () => {
        navigate(`/productDetails/${product._id}`);
    };

    return (
        <Card
            onClick={handleCardClick}
            className="product-card"
        >
            <div className="product-image-container">
                <img
                    className="product-image"
                    src={product.images[0]}
                    alt={product.imageAlt?.[currentLang] || product.name}
                />
                <IconButton className="favorite-button">
                    <FavoriteBorderIcon />
                </IconButton>
            </div>
            <Card.Body>
                <Card.Title className="product-title">{product.name}</Card.Title>
                <Card.Text className="product-type">
                    {product.typeName?.[currentLang] || product.typeName?.en}
                </Card.Text>
                <Card.Text className="product-measurements">
                    {`${product.measurement?.width}x${
                        product.measurement?.depth
                            ? product.measurement?.depth + 'x'
                            : product.measurement?.length
                            ? product.measurement?.length + 'x'
                            : ''
                    }${product.measurement?.height} ${
                        product.measurement?.unit || 'cm'
                    }`}
                </Card.Text>
                <Card.Text className="product-price">
                    <strong>{formatPrice(product.price.currentPrice)}</strong>
                </Card.Text>
                <ProductRating productPrice={product.price} />
                <div className="product-actions">
                    <IconButton className="add-to-cart-button">
                        <TbBasketPlus fontSize={20} />
                    </IconButton>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SearchProductCard; 