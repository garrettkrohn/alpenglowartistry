import React from "react";
import { paintingResource } from "../../Services/DTOs";
import "./painting.css";
import CloseIcon from "@mui/icons-material/Close";

const Painting = (props: {
  painting: paintingResource;
  togglePainting: Function;
}) => {
  return (
    <div className="painting-backdrop" onClick={() => props.togglePainting}>
      <CloseIcon
        sx={{ color: "white", fontSize: "40px" }}
        onClick={() => props.togglePainting}
      />
      <img
        src={props.painting.image.url}
        alt="painting"
        className="painting-feature"
        onClick={() => props.togglePainting}
      />
    </div>
  );
};

export default Painting;
