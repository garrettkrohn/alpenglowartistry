import React, { useState } from "react";
import { paintingResource } from "../../Services/DTOs";
import "./painting.css";
import CloseIcon from "@mui/icons-material/Close";

const Painting = (props: {
  painting: paintingResource;
  togglePainting: Function;
}) => {
  const [featurePaintingIndex, setFeaturedPaintingIndex] = useState(0);

  const thumbnailPaintings = props.painting.assets;

  return (
    <div className="painting-page">
      <div
        className="painting-backdrop"
        onClick={() => props.togglePainting()}
      />
      <CloseIcon
        sx={{ color: "white", fontSize: "80px", position: "fixed", zIndex: 2 }}
        onClick={() => props.togglePainting()}
      />
      <div className="painting-container">
        <div className="painting-left">
          {thumbnailPaintings.map((painting, index) => (
            <img
              className="painting-thumbnail"
              src={painting.url}
              alt={painting.filename}
              onClick={() => setFeaturedPaintingIndex(index)}
            />
          ))}
        </div>
        <div className="painting-right">
          <img
            src={props.painting.assets[featurePaintingIndex].url}
            alt="painting"
            className="painting-feature"
          />
        </div>
      </div>
    </div>
  );
};

export default Painting;
