import React, { useState } from "react";
import { paintingResource } from "../../Services/DTOs";
import "./painting.css";
import CloseIcon from "@mui/icons-material/Close";
import trimDescription from "../../Util/UtilityFunctions";

const Painting = (props: {
  painting: paintingResource;
  togglePainting: Function;
}) => {
    const {painting, togglePainting} = props;
    const [featurePaintingIndex, setFeaturedPaintingIndex] = useState(0);

    const thumbnailPaintings = painting.assets;
    const description = painting.description;

  return (
    <div className="painting-page">
      <div
        className="painting-backdrop"
        onClick={() => togglePainting()}
      />
      <CloseIcon
        sx={{ color: "white", fontSize: "80px", position: "fixed", zIndex: 2 }}
        onClick={() => togglePainting()}
      />

      <div className="painting-container">

          <div className="painting-left">
              <div className='painting_description'>{trimDescription(description)}</div>
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
            src={painting.assets[featurePaintingIndex].url}
            alt="painting"
            className="painting-feature"
          />
        </div>
      </div>
    </div>
  );
};

export default Painting;
