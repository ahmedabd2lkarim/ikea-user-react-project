import React from "react";
import { Button, Box, Grid, CircularProgress, Typography } from "@mui/material";
import Teaser from "../../components/layout/Home/Teaser";
import useFetchTeaser from "../../hooks/useFetchTeaser";
import { useTranslation } from "react-i18next";
import axios from "axios";

function Category() {
    const { _, i18n } = useTranslation();
    const { teaserData: categoryTeasers, loading: loadingCategoryTeasers } = useFetchTeaser("Storage");
    const language = i18n.language;
    const [categoryIntro, setCategoryIntro] = React.useState(null);
    const [loadingIntro, setLoadingIntro] = React.useState(true);

    const categoryId = "67b724ef9379cb0ddd1b0972";

    React.useEffect(() => {
        const fetchCategoryIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/intros/${categoryId}`);
                setCategoryIntro(response.data);
            } catch (error) {
                console.error("Error fetching category intro", error);
            } finally {
                setLoadingIntro(false);
            }
        };

        fetchCategoryIntro();
    }, [categoryId]);
    if (loadingCategoryTeasers || loadingIntro) {
        return (
            <Box display="flex" justifyContent="center" my={5}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Grid container px={{ xs: 1, sm: 2, md: 5 }}>
            {categoryIntro ? (
                <Box mb={4}>
                    <Typography variant="h4" fontWeight="bold">
                        {categoryIntro.title?.[language] || categoryIntro.title?.["en"]}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {categoryIntro.content?.[language] || categoryIntro.content?.["en"]}
                    </Typography>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center" my={5}>
                    <CircularProgress />
                </Box>
            )}

            {categoryTeasers ? (
                categoryTeasers.teasers.map((teaser, index) => (
                    <Teaser
                        key={index}
                        title={teaser.title?.[i18n.language]}
                        content={teaser.content}
                        promoImage={teaser.promoImage} 
                        promoHotspots={teaser.promoHotspots}
                        rightImages={teaser.rightImages}
                        language={language}
                    />
                ))
            ) : (
                <Box display="flex" justifyContent="center" my={5}>
                    <CircularProgress />
                </Box>
            )}

            <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
            <Button onClick={() => i18n.changeLanguage('ar')}>العربية</Button>
        </Grid>
    );
}

export default Category;
