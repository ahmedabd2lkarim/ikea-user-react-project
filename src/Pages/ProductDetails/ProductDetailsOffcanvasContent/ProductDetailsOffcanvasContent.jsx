import { useTranslation } from "react-i18next";
import CollapsibleSection from "../../../Components/CollapsibleSection/CollapsibleSection";
import styles from "./ProductDetailsOffcanvasContent.module.css";


export default function ProductDetailsOffcanvasContent({ currentProduct }) {
  const {
    product_details: {
      product_details_paragraphs: paragraphs,
      expandable_sections: {
        materials_and_care,
        good_to_know,
        safety_and_compliance,
        assembly_and_documents,
      },
    },
  } = { ...currentProduct };
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const mainParagraphs = paragraphs[language]?.slice(0, -2) || [];

  return (
    <>
      <div className={styles.OffcanvasBodyPrdDetails}>
        <h3 className="fw-bold my-4">{t("product.productDetails")}</h3>
        {mainParagraphs.map((paragraph, index) => (
          <p style={{ opacity: ".9", fontSize: "15px" }} key={index}>
            {paragraph}
          </p>
        ))}
        {good_to_know[language] && (
          <div>
            <hr />
            <CollapsibleSection
              title={t("product.goodToKnow")}
              children={good_to_know[language]}
            />
            <hr />
          </div>
        )}
        {materials_and_care[language] && (
          <div>
            <CollapsibleSection
              title={t("product.materialsAndCare")}
              children={materials_and_care[language]}
            />
            <hr />
          </div>
        )}

        {safety_and_compliance[language] && (
          <div>
            <CollapsibleSection
              title={t("product.sefetyAndCompliance")}
              children={safety_and_compliance[language]}
            />
            <hr />
          </div>
        )}
        {assembly_and_documents[language] && (
          <div>
            <CollapsibleSection
              title={t("product.assemblyAndDocuments")}
              children={assembly_and_documents[language]}
            />
          </div>
        )}
      </div>
    </>
  );
}
