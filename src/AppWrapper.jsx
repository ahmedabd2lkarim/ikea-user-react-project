import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

function AppWrapper({ children }) {
  const { i18n } = useTranslation();
  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  const theme = createTheme({
    direction,
    typography: {
      fontFamily:
        i18n.language === "ar" ? "'Cairo', sans-serif" : "'Roboto', sans-serif",
    },
  });

  const rtlCache = createCache({
    key: direction === "rtl" ? "muirtl" : "mui",
    stylisPlugins: direction === "rtl" ? [rtlPlugin] : [],
  });

  useEffect(() => {
    document.body.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  return (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}

export default AppWrapper;
