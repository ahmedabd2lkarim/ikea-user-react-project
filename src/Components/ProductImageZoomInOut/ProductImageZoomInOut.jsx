import React, { useEffect, useRef, useState, useCallback } from "react";
import "./ProductImageZoomInOut.css";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { IconButton } from "@mui/joy";
const MIN_SCALE = 1;
const MAX_SCALE = 2;

export default function ProductImageZoomInOut({ imageSrc }) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef(null);
  const isDraggingRef = useRef(false);
  const prevPositionRef = useRef({ x: 0, y: 0 });

  const handleZoomIn = useCallback(() => {
    setScale((scale) => Math.min(scale + 1, MAX_SCALE));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
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
    <div className="main-prdImg ">
      <div className="btn-container">
        <IconButton
          onClick={handleZoomIn}
          disabled={scale >= MAX_SCALE}
          aria-label="Zoom in"
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#444",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <ZoomInIcon />
        </IconButton>
        <IconButton
          onClick={handleZoomOut}
          disabled={scale <= MIN_SCALE}
          aria-label="Zoom out"
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#444",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <ZoomOutIcon />
        </IconButton>
        <IconButton
          onClick={handleReset}
          aria-label="Reset zoom and position"
          className="reset-btn"
          sx={{
            backgroundColor: "#f5f5f5",
            color: "#444",
            "&:hover": {
              backgroundColor: "#e0e0e0",
            },
          }}
        >
          <RestartAltIcon />
        </IconButton>
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
