import React from "react";
import Button, { ButtonProps } from "@mui/material/Button/Button";

export interface KButtonProps extends ButtonProps {}

export const WButton = ({ children, ...rest }: KButtonProps) => {
  return <Button {...rest}>{children}</Button>;
};
