import { CircularProgress } from "@mui/material";
import React from "react";

export const Loading = (props: { size: string; style?: string }) => {
  return (
    <div className={"loading " + props.style}>
      <CircularProgress color="inherit" size={props.size} />
    </div>
  );
};
