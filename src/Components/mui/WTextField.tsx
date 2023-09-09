import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField/TextField";
import { PropsWithChildren } from "react";

export type WTextFieldProps = TextFieldProps;

export const WTextField = ({
  children,
  ...rest
}: PropsWithChildren<WTextFieldProps>) => {
  return <TextField {...rest}>{children}</TextField>;
};
