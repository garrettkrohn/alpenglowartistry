import { CircularProgress } from "@mui/material";
import React from "react";

export const Loading = (props: { size: string; style?: string }) => {
  return (
    // <div className={"loading " + props.style}>
    <CircularProgress sx={{ color: "white" }} size={props.size} />
    // </div>
  );
};
