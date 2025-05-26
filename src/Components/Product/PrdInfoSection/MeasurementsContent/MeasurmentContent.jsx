import { useTranslation } from "react-i18next";
import CollapsibleSection from "./../../../CollapsibleSection/CollapsibleSection";

export default function MeasurementsContent({ product, addDotEvery3Chars }) {
  const {
    width,
    depth,
    height,
    length,
    unit = "cm",
  } = { ...product?.measurement };
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const cmAr = "سم";
  return (
    <div className="pb-5">
      <p className="fs-3 px-4 fw-bold">{t("product.measurements")}</p>
      <div
        className="px-4 d-flex flex-column pb-3"
        style={{ fontSize: "14px", color: "rgb(74,74,74)" }}
      >
        {width && (
          <span>
            <b>{t("product.width")}: </b>
            {`${width} ${language == "ar" ? cmAr : unit}`}
          </span>
        )}
        {depth && (
          <span>
            <b>{t("product.depth")}: </b>
            {`${depth} ${language == "ar" ? cmAr : unit}`}
          </span>
        )}
        {height && (
          <span>
            <b>{t("product.height")}: </b>
            {`${height} ${language == "ar" ? cmAr : unit}`}
          </span>
        )}
        {length && (
          <span>
            <b>{t("product.length")}: </b>
            {`${length} ${language == "ar" ? cmAr : unit}`}
          </span>
        )}
        <div>
          <br />
        </div>
        <img
          className="mb-5"
          src={product.images[product.images.length - 1]}
          alt=""
        />
        <hr className="mt-5" />

        <CollapsibleSection
          title={t("product.packaging")}
          children={
            <>
              <div className="mt-4">
                <b>{product.name}</b>
                <p>{product.typeName[language]}</p>
              </div>
              <p
                style={{ fontSize: "14px", opacity: "0.9" }}
                className="m-0  mb-2"
              >
                {t("product.articleNumber")}
              </p>
              <span
                style={{ fontSize: "14px" }}
                className=" text-light p-1 px-3  fw-bold bg-black"
              >
                {addDotEvery3Chars(product.id)}
              </span>
              <div className="d-flex flex-column my-4 mb-5">
                {" "}
                {width && (
                  <span>
                    <b>{t("product.width")}: </b>
                    {`${width} ${language == "ar" ? cmAr : unit}`}
                  </span>
                )}
                {depth && (
                  <span>
                    <b>{t("product.depth")}: </b>
                    {`${depth} ${language == "ar" ? cmAr : unit}`}
                  </span>
                )}
                {height && (
                  <span>
                    <b>{t("product.height")}: </b>
                    {`${height} ${language == "ar" ? cmAr : unit}`}
                  </span>
                )}
                {length && (
                  <span>
                    <b>{t("product.length")}: </b>
                    {`${length} ${language == "ar" ? cmAr : unit}`}
                  </span>
                )}
              </div>
            </>
          }
        />
      </div>
    </div>
  );
}
