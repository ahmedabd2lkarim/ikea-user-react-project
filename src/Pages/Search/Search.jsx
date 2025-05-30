import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SearchProductCard from '../../Components/SearchProductCard/SearchProductCard';
import './Search.css';
import { Pagination } from '@mui/material';
import Loading from '../../Components/Loading/Loading';
const { VITE_API_URL } = import.meta.env;


// Remove the static filters array since we're using dynamic filters now
const categoryOptions = [
    { value: 'textiles', label: { en: 'Textiles', ar: 'المنسوجات' } },
    { value: 'decoration', label: { en: 'Decoration', ar: 'الديكور' } },
    { value: 'storage', label: { en: 'Storage & organisation', ar: 'التخزين والتنظيم' } },
    { value: 'storage', label: { en: 'Kitchenware & tableware', ar: 'المطبخ' } }
];

const priceOptions = [
    { value: '0-100', label: { en: '0-100', ar: '0-100' } },
    { value: '100-500', label: { en: '100-500', ar: '100-500' } },
    { value: '500+', label: { en: '500+', ar: '500+' } }
];

const sizeOptions = [
    { value: 'small', label: { en: 'Small', ar: 'صغير' } },
    { value: 'medium', label: { en: 'Medium', ar: 'متوسط' } },
    { value: 'large', label: { en: 'Large', ar: 'كبير' } }
];

const colorOptions = [
    { value: 'white', label: { en: 'White', ar: 'أبيض' } },
    { value: 'black', label: { en: 'Black', ar: 'أسود' } },
    { value: 'gray', label: { en: 'Gray', ar: 'رمادي' } },
    { value: 'blue', label: { en: 'Blue', ar: 'أزرق' } }
];

const bestSellingOptions = [
    { value: 'most', label: { en: 'Best Selling', ar: 'الأكثر مبيعاً' } },
    { value: 'least', label: { en: 'Least Selling', ar: 'الأقل مبيعاً' } }
];


const Search = () => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentLang = i18n.language;
    const [products, setProducts] = useState({ data: [], total: 0, results: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 12;
    const [priceInputs, setPriceInputs] = useState({
        min: searchParams.get('priceMin') || '',
        max: searchParams.get('priceMax') || ''
    });

    const categoryName = searchParams.get('categoryName');
    const search = searchParams.get('search');
    const color = searchParams.get('color');
    const minWidth = searchParams.get('minWidth');
    const maxWidth = searchParams.get('maxWidth');
    const minHeight = searchParams.get('minHeight');
    const maxHeight = searchParams.get('maxHeight');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const minDepth = searchParams.get('minDepth');
    const maxDepth = searchParams.get('maxDepth');
    const limit = searchParams.get('limit');


    const getLabel = (label) => {
        return typeof label === 'object' ? label[currentLang] || label.en : label;
    };

    const getOptionLabel = (option) => {
        return typeof option.label === 'object' ? option.label[currentLang] || option.label.en : option;
    };

    const [dynamicFilters, setDynamicFilters] = useState({
        colors: [],
        priceRange: { min: 0, max: 0 }
    });

    const [tempPriceValue, setTempPriceValue] = useState(
        searchParams.get('priceMin') || dynamicFilters.priceRange?.min || 0
    );

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

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {
                categoryName,
                search,
                color,
                minWidth,
                maxWidth,
                minHeight,
                maxHeight,
                priceMin,
                priceMax,
                minDepth,
                maxDepth,
                limit: itemsPerPage,
                page
            };

            const response = await axios.get(`${VITE_API_URL}/api/products`, { params });
            setProducts(response.data);

            // Update dynamic filters if available in response
            if (response.data.filters) {
                setDynamicFilters(response.data.filters);
            }

        } catch (err) {
            setError(err.message || 'حدث خطأ أثناء جلب المنتجات');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(1);
        fetchProducts();
    }, [categoryName, search, color, minWidth, maxWidth, minHeight, maxHeight, minDepth, maxDepth]);

    useEffect(() => {
        if (page > 1) {
            fetchProducts();
        }
    }, [page]);

    useEffect(() => {
        if (categoryName) {
            const categoryOption = categoryOptions.find(option => option.value === categoryName);
            if (categoryOption) {
                setSelectedCategory(categoryOption);
            }
        }
    }, [categoryName]);

    // Update price inputs when URL parameters change
    useEffect(() => {
        setPriceInputs({
            min: searchParams.get('priceMin') || '',
            max: searchParams.get('priceMax') || ''
        });
    }, [searchParams]);

    // Update temp price value when URL parameters change
    useEffect(() => {
        const minPrice = searchParams.get('priceMin');
        if (minPrice) {
            setTempPriceValue(parseInt(minPrice));
        } else {
            setTempPriceValue(dynamicFilters.priceRange?.min || 0);
        }
    }, [searchParams, dynamicFilters.priceRange]);

    const [openDropdown, setOpenDropdown] = useState(null);
    const [options, setOptions] = useState([]);

    const handlePriceInputChange = (e, type) => {
        const value = e.target.value;
        const range = dynamicFilters.priceRange;

        // Only allow numbers within the dynamic range
        if (value === '' || /^\d+$/.test(value)) {
            const numValue = parseInt(value);
            if (value === '' || (numValue >= range.min && numValue <= range.max)) {
                setPriceInputs(prev => ({
                    ...prev,
                    [type]: value
                }));
            }
        }
    };

    const handlePriceInputBlur = () => {
        const newParams = new URLSearchParams(searchParams);

        // Only update if the value is a valid number
        if (priceInputs.min && !isNaN(priceInputs.min)) {
            newParams.set('priceMin', priceInputs.min);
        } else {
            newParams.delete('priceMin');
        }

        if (priceInputs.max && !isNaN(priceInputs.max)) {
            newParams.set('priceMax', priceInputs.max);
        } else {
            newParams.delete('priceMax');
        }

        // Only update if there are actual changes
        if (newParams.toString() !== searchParams.toString()) {
            setPage(1);
            setSearchParams(newParams);
        }
    };

    const handlePriceKeyPress = (e) => {
        if (e.key === 'Enter') {
            handlePriceInputBlur();
        }
    };

    const handleFilterClick = (filter, option) => {
        const newParams = new URLSearchParams(searchParams);

        switch (filter.label[currentLang]) {
            case currentLang === 'ar' ? 'الفئة' : 'Category':
                if (option) {
                    newParams.set('categoryName', option.value);
                    setSelectedCategory(option);
                }
                break;
            case currentLang === 'ar' ? 'اللون' : 'Color':
                if (option) {
                    // If the same color is clicked again, remove the filter
                    if (newParams.get('color') === option.value) {
                        newParams.delete('color');
                    } else {
                        newParams.set('color', option.value);
                    }
                }
                break;
            case currentLang === 'ar' ? 'الحجم' : 'Size':
                if (option) {
                    // Handle size filter
                    if (newParams.get('size') === option.value) {
                        newParams.delete('size');
                    } else {
                        newParams.set('size', option.value);
                    }
                }
                break;
            case currentLang === 'ar' ? 'الأكثر مبيعاً' : 'Best Selling':
                if (option) {
                    if (option.value === 'most') {
                        newParams.set('sort', 'bestSelling');
                    } else {
                        newParams.delete('sort');
                    }
                }
                break;
            case currentLang === 'ar' ? 'قابل للشراء على الإنترنت' : 'Available Online':
                const currentValue = newParams.get('availableOnline');
                if (currentValue === 'true') {
                    newParams.delete('availableOnline');
                } else {
                    newParams.set('availableOnline', 'true');
                }
                break;
        }

        // Reset to first page when filter changes
        setPage(1);
        // Update URL and trigger new search
        setSearchParams(newParams);
        setOpenDropdown(null);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const totalPages = Math.ceil((products.total || 0) / itemsPerPage);

    const resetAllFilters = () => {
        // Create new URL params without any filter parameters
        const newParams = new URLSearchParams();

        // Keep only search and page parameters if they exist
        const search = searchParams.get('search');
        const page = searchParams.get('page');
        if (search) newParams.set('search', search);
        if (page) newParams.set('page', page);

        // Reset to first page
        setPage(1);
        // Update URL and trigger new search
        setSearchParams(newParams);
        // Close any open dropdowns
        setOpenDropdown(null);
    };

    const handlePriceChange = (e) => {
        const value = parseInt(e.target.value);
        setTempPriceValue(value);
    };

    const handlePriceApply = () => {
        const newParams = new URLSearchParams(searchParams);

        // Only handle minimum price
        if (tempPriceValue > (dynamicFilters.priceRange?.min || 0)) {
            newParams.set('priceMin', tempPriceValue);
        } else {
            newParams.delete('priceMin');
        }

        // Remove priceMax if it exists
        newParams.delete('priceMax');

        setPage(1);
        navigate(`?${newParams.toString()}`);
        setOpenDropdown(null);

        // Explicitly reload the page
        window.location.reload();
    };

    const getDynamicFilters = () => {
        const filters = [
            {
                label: { en: 'Category', ar: 'الفئة' },
                type: 'dropdown',
                options: categoryOptions
            }
        ];

        // Add color filter if colors are available
        if (dynamicFilters.colors && dynamicFilters.colors.length > 0) {
            // Sort colors by count in descending order and take only top 10
            const sortedColors = [...dynamicFilters.colors]
                .sort((a, b) => b.count - a.count)
                .slice(0, 10); // Limit to top 10 colors

            const colorOptions = sortedColors.map(color => ({
                value: color.color,
                label: {
                    en: color.color,
                    ar: color.color
                },
                count: color.count
            }));

            filters.push({
                label: { en: 'Color', ar: 'اللون' },
                type: 'dropdown',
                options: colorOptions
            });
        }

        // Add price filter if price range is available
        if (dynamicFilters.priceRange) {
            filters.push({
                label: { en: 'Price', ar: 'السعر' },
                type: 'price-range',
                range: dynamicFilters.priceRange
            });
        }

        // Add other static filters
        filters.push(
            {
                label: { en: 'Size', ar: 'الحجم' },
                type: 'dropdown',
                options: sizeOptions
            },
            {
                label: { en: 'Available Online', ar: 'قابل للشراء على الإنترنت' },
                type: 'button'
            },
          
            {
                label: { en: 'Best Selling', ar: 'الأكثر مبيعاً' },
                type: 'dropdown',
                options: bestSellingOptions
            },
            {
                label: {
                    en: isAnyFilterActive() ? 'Reset Filters' : 'All Filters',
                    ar: isAnyFilterActive() ? 'إعادة تعيين الفلاتر' : 'جميع الفلاتر'
                },
                icon: isAnyFilterActive() ? 'fa fa-times' : 'fa fa-sliders',
                type: 'button',
                onClick: resetAllFilters
            },
        );

        return filters;
    };

    const capitalizeColorName = (colorName) => {
        // Handle special cases first
        if (colorName.includes('/')) {
            return colorName.split('/').map(part =>
                part.split(' ').map(word =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                ).join(' ')
            ).join(' / ');
        }

        // Handle regular cases
        return colorName.split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const getFilterLabel = (filter) => {
        const label = filter.label[currentLang];

        switch (label) {
            case currentLang === 'ar' ? 'اللون' : 'Color':
                const selectedColor = searchParams.get('color');
                if (selectedColor) {
                    return `${label}: ${capitalizeColorName(selectedColor)}`;
                }
                break;

            case currentLang === 'ar' ? 'الفئة' : 'Category':
                const selectedCategory = searchParams.get('categoryName');
                if (selectedCategory) {
                    const category = categoryOptions.find(opt => opt.value === selectedCategory);
                    if (category) {
                        return `${label}: ${getOptionLabel(category)}`;
                    }
                }
                break;

            case currentLang === 'ar' ? 'الحجم' : 'Size':
                const selectedSize = searchParams.get('size');
                if (selectedSize) {
                    const size = sizeOptions.find(opt => opt.value === selectedSize);
                    if (size) {
                        return `${label}: ${getOptionLabel(size)}`;
                    }
                }
                break;

            case currentLang === 'ar' ? 'الأكثر مبيعاً' : 'Best Selling':
                const sortValue = searchParams.get('sort');
                if (sortValue === 'bestSelling') {
                    return `${label}: ${currentLang === 'ar' ? 'الأكثر مبيعاً' : 'Best Selling'}`;
                }
                break;

            case currentLang === 'ar' ? 'قابل للشراء على الإنترنت' : 'Available Online':
                const availableOnline = searchParams.get('availableOnline');
                if (availableOnline === 'true') {
                    return label;
                }
                break;

            case currentLang === 'ar' ? 'السعر' : 'Price':
                const selectedPrice = searchParams.get('priceMin');
                if (selectedPrice) {
                    return `${label}: ${formatPrice(selectedPrice)}`;
                }
                break;
        }

        return label;
    };

    const isFilterActive = (filter) => {
        const label = filter.label[currentLang];

        switch (label) {
            case currentLang === 'ar' ? 'اللون' : 'Color':
                return !!searchParams.get('color');

            case currentLang === 'ar' ? 'الفئة' : 'Category':
                return !!searchParams.get('categoryName');

            case currentLang === 'ar' ? 'الحجم' : 'Size':
                return !!searchParams.get('size');

            case currentLang === 'ar' ? 'الأكثر مبيعاً' : 'Best Selling':
                return searchParams.get('sort') === 'bestSelling';

            case currentLang === 'ar' ? 'قابل للشراء على الإنترنت' : 'Available Online':
                return searchParams.get('availableOnline') === 'true';

            case currentLang === 'ar' ? 'السعر' : 'Price':
                return !!searchParams.get('priceMin');

            default:
                return false;
        }
    };

    const isAnyFilterActive = () => {
        return !!(
            searchParams.get('color') ||
            searchParams.get('categoryName') ||
            searchParams.get('size') ||
            searchParams.get('sort') === 'bestSelling' ||
            searchParams.get('availableOnline') === 'true' ||
            searchParams.get('priceMin') ||
            searchParams.get('priceMax')
        );
    };

    return (
        <div className="search-page-rtl">
            <div className="search-summary-bar">
                <div className="summary-counts">
                    <button className="summary-btn">
                        {products.total || 0} {currentLang === 'ar' ? 'المنتجات' : 'Products'}
                        <span className="arrow">↙</span>
                    </button>
                    <button className="summary-btn">
                        {products.results || 0} {currentLang === 'ar' ? 'نتائج المحتوى' : 'Content Results'}
                        <span className="arrow">↙</span>
                    </button>
                    {search && (
                        <span className="search-term">"{search}"</span>
                    )}
                </div>
            </div>
            <div className={`filter-bar ${currentLang === 'en' ? 'filter-bar-en' : 'filter-bar-ar'}`}>
                {getDynamicFilters().map((filter, idx) => (
                    <div
                        key={idx}
                        className="filter-pill-wrapper"
                        style={{ position: 'relative', display: 'inline-block' }}
                    >
                        <button
                            className={`filter-pill ${isFilterActive(filter) ? 'active' : ''} ${filter.type === 'button' && filter.onClick ? 'reset-button' : ''}`}
                            onClick={() => {
                                if (filter.type === 'dropdown' || filter.type === 'price-input' || filter.type === 'price-range') {
                                    setOpenDropdown(openDropdown === idx ? null : idx);
                                } else if (filter.onClick) {
                                    filter.onClick();
                                } else {
                                    handleFilterClick(filter);
                                }
                            }}
                        >
                            {filter.icon && <i className={filter.icon} style={{ marginLeft: 6 }}></i>}
                            {getFilterLabel(filter)}
                            {(filter.type === 'dropdown' || filter.type === 'price-input' || filter.type === 'price-range') &&
                                <IoIosArrowDown className="dropdown-arrow" />}
                        </button>
                        {filter.type === 'dropdown' && openDropdown === idx && (
                            <div className="filter-dropdown-menu">
                                {filter.options.map((option, oidx) => (
                                    <div
                                        key={oidx}
                                        className={`filter-dropdown-menu__item ${(filter.label[currentLang] === (currentLang === 'ar' ? 'اللون' : 'Color') && searchParams.get('color') === option.value) ||
                                                (filter.label[currentLang] === (currentLang === 'ar' ? 'الفئة' : 'Category') && searchParams.get('categoryName') === option.value) ||
                                                (filter.label[currentLang] === (currentLang === 'ar' ? 'الحجم' : 'Size') && searchParams.get('size') === option.value) ||
                                                (filter.label[currentLang] === (currentLang === 'ar' ? 'الأكثر مبيعاً' : 'Best Selling') && searchParams.get('sort') === 'bestSelling' && option.value === 'most')
                                                ? 'selected' : ''
                                            }`}
                                        onClick={() => handleFilterClick(filter, option)}
                                    >
                                        {filter.label[currentLang] === (currentLang === 'ar' ? 'اللون' : 'Color') ? (
                                            <>
                                                <div className="color-option">
                                                    <div
                                                        className={`color-circle ${searchParams.get('color') === option.value ? 'selected' : ''}`}
                                                        data-color={option.value}
                                                        title={capitalizeColorName(option.value)}
                                                    />
                                                    <span className="color-name">{capitalizeColorName(option.value)}</span>
                                                </div>
                                                {option.count !== undefined && (
                                                    <span className="color-count">({option.count})</span>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {getOptionLabel(option)}
                                                {option.count !== undefined && (
                                                    <span className="filter-count">({option.count})</span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {filter.type === 'price-input' && openDropdown === idx && (
                            <div className="filter-dropdown-menu price-input-menu">
                                <div className="price-input-container">
                                    <div className="price-input-group">
                                        <label>{currentLang === 'ar' ? 'الحد الأدنى' : 'Min Price'}</label>
                                        <div className="price-input-wrapper">
                                            <input
                                                type="number"
                                                min={dynamicFilters.priceRange?.min || 0}
                                                max={dynamicFilters.priceRange?.max || 9999}
                                                value={priceInputs.min}
                                                onChange={(e) => handlePriceInputChange(e, 'min')}
                                                onBlur={handlePriceInputBlur}
                                                onKeyPress={handlePriceKeyPress}
                                                placeholder={`${dynamicFilters.priceRange?.min || 0} ${currentLang === 'ar' ? 'ج.م' : 'EGP'}`}
                                                className="price-input"
                                            />
                                            <span className="price-currency">{currentLang === 'ar' ? 'ج.م' : 'EGP'}</span>
                                        </div>
                                    </div>
                                    <div className="price-input-group">
                                        <label>{currentLang === 'ar' ? 'الحد الأقصى' : 'Max Price'}</label>
                                        <div className="price-input-wrapper">
                                            <input
                                                type="number"
                                                min={dynamicFilters.priceRange?.min || 0}
                                                max={dynamicFilters.priceRange?.max || 9999}
                                                value={priceInputs.max}
                                                onChange={(e) => handlePriceInputChange(e, 'max')}
                                                onBlur={handlePriceInputBlur}
                                                onKeyPress={handlePriceKeyPress}
                                                placeholder={`${dynamicFilters.priceRange?.max || 9999} ${currentLang === 'ar' ? 'ج.م' : 'EGP'}`}
                                                className="price-input"
                                            />
                                            <span className="price-currency">{currentLang === 'ar' ? 'ج.م' : 'EGP'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {filter.type === 'price-range' && openDropdown === idx && (
                            <div className="filter-dropdown-menu price-range-menu">
                                <div className="price-range-container">
                                    <div className="price-range-labels">
                                        <span>{formatPrice(dynamicFilters.priceRange.min)}</span>
                                        <span>{formatPrice(dynamicFilters.priceRange.max)}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={dynamicFilters.priceRange.min}
                                        max={dynamicFilters.priceRange.max}
                                        value={tempPriceValue}
                                        onChange={handlePriceChange}
                                        step="1"
                                        className="price-range-slider"
                                    />
                                    <div className="price-range-value">
                                        {formatPrice(tempPriceValue)}
                                    </div>
                                    <button
                                        className="apply-price-filter"
                                        onClick={handlePriceApply}
                                    >
                                        {currentLang === 'ar' ? 'تطبيق' : 'Apply'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {loading && <Loading />}
            {!loading && !error && (!products.data || products.data.length === 0) && (
                <div className="no-results">
                    {currentLang === 'ar' ? 'لا توجد منتجات متاحة' : 'No products available'}
                </div>
            )}
            {!loading && !error && products.data && products.data.length > 0 && (
                <>
                    <div className="products-grid">
                        {products.data.map((product) => (
                            <SearchProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="pagination-container">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="large"
                                showFirstButton
                                showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        fontSize: '1rem',
                                        margin: '0 4px',
                                    },
                                    '& .Mui-selected': {
                                        backgroundColor: '#0058a3 !important',
                                        color: 'white !important',
                                    },
                                    '& .MuiPaginationItem-root:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            />
                        </div>
                    )}
                </>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Search; 
