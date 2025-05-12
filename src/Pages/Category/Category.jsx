import React from "react";
import {
    Button,
    Box,
    Grid,
    CircularProgress,
    Typography
} from "@mui/material";
import Teaser from "../../Components/Home/Teaser";
import useFetchTeaser from "../../hooks/useFetchTeaser";
import { useTranslation } from "react-i18next";
import axios from "axios";
import PromoScroller from "../../Components/Home/PromoScroller";

function Category() {
    const categoryId = "67b724ef9379cb0ddd1b0960";
    const { i18n } = useTranslation();
    const language = i18n.language;

    const {
        teaserData: categoryTeasers,
        loading: loadingCategoryTeasers
    } = useFetchTeaser(categoryId);

    const [categoryIntro, setCategoryIntro] = React.useState(null);
    const [loadingIntro, setLoadingIntro] = React.useState(true);

    const getLocalized = (obj) => obj?.[language] || obj?.["en"];

    React.useEffect(() => {
        const fetchCategoryIntro = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/intros/${categoryId}`
                );
                setCategoryIntro(response.data);
            } catch (error) {
                console.error("Error fetching category intro", error);
            } finally {
                setLoadingIntro(false);
            }
        };

        fetchCategoryIntro();
    }, []); 

    if (loadingCategoryTeasers || loadingIntro) {
        return (
            <Box display="flex" justifyContent="center" my={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container px={{ xs: 1, sm: 2, md: 5 }}>
            {categoryIntro && (
                <Box mb={4}>
                    <Typography variant="h4" fontWeight="bold">
                        {getLocalized(categoryIntro.title)}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {getLocalized(categoryIntro.content)}
                    </Typography>
                </Box>
            )}

            {categoryTeasers?.teasers?.map((teaser) => (
                <Teaser
                    key={teaser._id} 
                    title={getLocalized(teaser.title)}
                    content={teaser.content}
                    promoImage={teaser.promoImage}
                    promoHotspots={teaser.promoHotspots}
                    rightImages={teaser.rightImages}
                    language={language}
                />
            ))}

            <PromoScroller categoryId={categoryId} />

            <Box my={3} display="flex" gap={2}>
                <Button variant="outlined" onClick={() => i18n.changeLanguage("en")}>
                    English
                </Button>
                <Button variant="outlined" onClick={() => i18n.changeLanguage("ar")}>
                    العربية
                </Button>
            </Box>
        </Grid>
    );
}

export default Category;
