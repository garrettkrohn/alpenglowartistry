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
    <div className="painting-backdrop">
      <CloseIcon
        sx={{ color: "white", fontSize: "80px" }}
        onClick={() => props.togglePainting()}
      />
      <img
        src={props.painting.assets[featurePaintingIndex].url}
        alt="painting"
        className="painting-feature"
      />
      {thumbnailPaintings.map((painting, index) => (
        <img
          className="painting-thumbnail"
          src={painting.url}
          alt={painting.filename}
          onClick={() => setFeaturedPaintingIndex(index)}
        />
      ))}
    </div>
  );
};

export default Painting;
