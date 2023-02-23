import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginTitle from "../components/contents/login.title";
import { useDispatch } from "react-redux";
import { loginAction, registerAction } from "../modules/auth/redux/actions";
import { useLocation, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function set_register() {
    if (location.pathname.includes("register")) {
      return true;
    }
    return false;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const log = {
      username: data.get("email"),
      password: data.get("password"),
    };
    if (set_register()) {
      dispatch(registerAction(log, navigate));
    } else {
      dispatch(loginAction(log, navigate));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LoginTitle
            title={set_register() ? "Nuevo registro" : "Autenticación"}
          />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username  - Demo: test1"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password - Demo: test123*"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  href={set_register() ? "/auth" : "/auth/register"}
                  variant="body2"
                >
                  {!set_register()
                    ? "Crear una cuenta nueva"
                    : "Iniciar sesión"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
