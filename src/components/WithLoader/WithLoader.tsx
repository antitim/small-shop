import React, { FC, ReactNode } from "react";
import { Typography, CircularProgress } from "@mui/material";

interface WithLoaderProps {
  isData: boolean;
  isError: boolean;
  children: ReactNode;
}

export const WithLoader: FC<WithLoaderProps> = ({
  isData,
  isError,
  children,
}) => {
  if (isError)
    return (
      <Typography variant="h3" color="error">
        Loading error
      </Typography>
    );

  if (!isData) return <CircularProgress />;

  return <>{children}</>;
};
