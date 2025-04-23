import React, { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "../../common/mui/index";
import "./ProductImageZoomInOut.css";

const MIN_SCALE = 1;
const MAX_SCALE = 3;

export default function ProductImageZoomInOut({ imageSrc }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevPositionRef = useRef({ x: 0, y: 0 });

  const handleZoomIn = useCallback(() => {
    setScale((scale) => Math.min(scale + 0.1, MAX_SCALE));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((scale) => Math.max(scale - 0.1, MIN_SCALE));
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const constrainPosition = useCallback((pos) => {
    const bounds = imageRef.current?.getBoundingClientRect();
    if (!bounds) return pos;

    return {
      x: Math.min(Math.max(pos.x, -bounds.width), bounds.width),
      y: Math.min(Math.max(pos.y, -bounds.height), bounds.height),
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    isDraggingRef.current = true;
    prevPositionRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - prevPositionRef.current.x;
      const deltaY = e.clientY - prevPositionRef.current.y;
      prevPositionRef.current = { x: e.clientX, y: e.clientY };

      setPosition((pos) =>
        constrainPosition({
          x: pos.x + deltaX,
          y: pos.y + deltaY,
        })
      );
    },
    [constrainPosition]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    image.addEventListener("mousedown", handleMouseDown);
    image.addEventListener("mousemove", handleMouseMove);
    image.addEventListener("mouseup", handleMouseUp);
    image.addEventListener("mouseleave", handleMouseUp);

    return () => {
      image.removeEventListener("mousedown", handleMouseDown);
      image.removeEventListener("mousemove", handleMouseMove);
      image.removeEventListener("mouseup", handleMouseUp);
      image.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return (
    <div className="main-prdImg">
      <div className="btn-container">
        <Button
          onClick={handleZoomIn}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
        >
          +
        </Button>
        <Button
          onClick={handleZoomOut}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
        >
          -
        </Button>
        <Button
          onClick={handleReset}
          aria-label="Reset zoom and position"
          className="reset-btn"
        >
          Reset
        </Button>
      </div>
      <img
        ref={imageRef}
        className="img-fluid prd-heroImg"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          cursor: "move",
        }}
        src={imageSrc}
        alt="Product view with zoom capabilities"
        draggable={false}
        onLoad={handleImageLoad}
      />
      {isLoading && <div className="loading-spinner">Loading...</div>}
    </div>
  );
}
