import React, { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button, AppBar, Toolbar, Container, Box } from "@mui/material";

export const Layout: FC = () => {
  return (
    <div>
      <AppBar component="nav" position="static">
        <Toolbar>
          <Button
            component={Link}
            to="/"
            sx={{ mx: 1, color: "white", display: "block" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/dashboard"
            sx={{ mx: 1, color: "white", display: "block" }}
          >
            Dashboard
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={2}>
          <Outlet />
        </Box>
      </Container>
    </div>
  );
};
