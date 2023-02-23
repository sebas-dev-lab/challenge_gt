import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../modules/auth/redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

const Header = () => {
  const [value, setValue] = React.useState(0);
  const [title, setTitle] = React.useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/tasks")) {
      setTitle("Tareas");
      setValue(1);
    } else {
      setTitle("Inicio");
      setValue(0);
    }
  }, []);

  function handleClose() {
    dispatch(logoutAction(navigate));
  }

  function handleNavigation(to, title) {
    navigate(to);
    setTitle(title);
  }
  return (
    <AppBar position="relative" color="transparent">
      <Toolbar
        style={{
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="inherit" noWrap>
          {title}
        </Typography>
        <Box sx={{ width: 300 }}>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Inicio"
              icon={<HomeIcon />}
              onClick={() => handleNavigation("/", "Inicio")}
            />
            <BottomNavigationAction
              label="Tareas"
              icon={<PlaylistAddCheckIcon />}
              onClick={() => handleNavigation("/tasks", "Tareas")}
            />
          </BottomNavigation>
        </Box>
        <IconButton onClick={handleClose}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
