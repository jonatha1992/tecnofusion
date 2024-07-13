import React from "react";
import { Box, Container, CssBaseline } from "@mui/material";
import Header from "./Header";

function Layout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <Header />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default" }}>
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
      >
        <Container maxWidth="sm">
          <Box textAlign="center">
            © {new Date().getFullYear()} Mi Portfolio. Todos los derechos
            reservados.
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
