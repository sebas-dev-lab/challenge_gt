import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/header/appbar.herader";
import { Outlet } from "react-router-dom";

const theme = createTheme();

export default function BaseLayout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Outlet />
        </Container>
      </main>
    </ThemeProvider>
  );
}
