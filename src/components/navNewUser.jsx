import React, { useContext } from "react";
import {
  useTheme,
  useMediaQuery,
  Typography,
  Button,
  Box,
} from "@mui/material";
import NewUserForm from "./newUserForm";
import { Context } from "./contextProvider";

export default function NavNewUser() {
  const { setRegister, register } = useContext(Context);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  function openModal() {
    setRegister(true);
  }

  return (
    <Box
      sx={{
        padding: isSmallScreen ? "16px" : "32px",
        textAlign: "center",
        backgroundColor: theme.palette.background.default,
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant={isSmallScreen ? "h4" : "h2"}
        sx={{
          color: theme.palette.primary.main,
          marginBottom: "16px",
        }}
      >
        Hey There!!!!
      </Typography>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: isSmallScreen ? "12px" : "24px",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.primary,
            marginBottom: "16px",
          }}
        >
          Are you new here?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={openModal}
          sx={{
            padding: isSmallScreen ? "8px 16px" : "12px 24px",
            fontSize: isSmallScreen ? "0.875rem" : "1rem",
          }}
        >
          Register
        </Button>
        {register && <NewUserForm />}
      </Box>
    </Box>
  );
}
