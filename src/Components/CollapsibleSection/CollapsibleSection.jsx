import React, { useEffect, useRef, useState } from "react";
import styles from "./CollapsibleSection.module.css";
import { Collapse } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa6";
import PropTypes from "prop-types";

const CollapsibleSection = ({
  title,
  children,
  className = "",
  defaultOpen = false,
  scrollOnOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isRotated, setIsRotated] = useState(defaultOpen);
  const contentRef = useRef(null);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsRotated(!isRotated);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && contentRef.current && scrollOnOpen) {
      setTimeout(() => {
        contentRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 100);
    }
  }, [isOpen, scrollOnOpen]);

  return (
    <div aria-expanded={isOpen} onClick={handleToggle}>
      <div className={`${className} ${styles.titleContainer} `}>
        <b className={styles.title}>{title}</b>
        <FaAngleDown
          className={`${styles.arrowIcon} ${isRotated ? styles.rotated : ""}`}
        />
      </div>
      <Collapse in={isOpen}>
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </Collapse>
    </div>
  );
};

CollapsibleSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  defaultOpen: PropTypes.bool,
  scrollOnOpen: PropTypes.bool,
};

export default CollapsibleSection;
