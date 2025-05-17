import CollapsibleSection from "../../../Components/CollapsibleSection/CollapsibleSection";
import styles from "./ProductDetailsOffcanvasContent.module.css";

const GoodToKnow = ({ paragraphs }) => {
  if (!paragraphs?.en) return null;

  // Get last two elements of the array
  const lastTwoElements = paragraphs.en.slice(-2);

  return (
    <div>
      {lastTwoElements.map((paragraph, index) => (
        <p key={index} style={{ opacity: ".9", fontSize: "15px" }}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};
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

  // Show all paragraphs except last two
  const mainParagraphs = paragraphs?.en?.slice(0, -2) || [];

  return (
    <>
      <div className={styles.OffcanvasBodyPrdDetails}>
        <h3 className="fw-bold my-4">Product details</h3>
        {mainParagraphs.map((paragraph, index) => (
          <p style={{ opacity: ".9", fontSize: "15px" }} key={index}>
            {paragraph}
          </p>
        ))}
        {good_to_know?.en && (
          <div>
            <hr />
            <CollapsibleSection
              title="Good to know"
              children={good_to_know?.en}
            />
            <hr />
          </div>
        )}
        {materials_and_care.en && (
          <div>
            <CollapsibleSection
              title="Materials and care"
              children={materials_and_care.en}
            />
            <hr />
          </div>
        )}

        {safety_and_compliance.en && (
          <div>
            <CollapsibleSection
              title="Sefety and compliance"
              children={safety_and_compliance.en}
            />
          </div>
        )}
        {assembly_and_documents.en && (
          <div>
            <hr />

            <CollapsibleSection
              title="Assembly and documents"
              children={assembly_and_documents.en}
            />
          </div>
        )}
      </div>
    </>
  );
}
