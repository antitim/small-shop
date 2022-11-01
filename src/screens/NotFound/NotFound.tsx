import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

export const NotFound: FC = () => {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Page not Found
      </Typography>
      <Button component={Link} to="/">
        Go to home page
      </Button>
    </>
  );
};
