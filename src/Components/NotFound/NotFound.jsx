import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NotFound.css";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="not-found-container">
      <img width="200px" src={"/404.jpg"} alt="page 404"/>
      <h1>{t("notFound.title")}</h1>
      <p>{t("notFound.message")}</p>
      <Link to="/" className="back-home-btn">
        {t("notFound.backHome")}
      </Link>
    </div>
  );
};

export default NotFound;
