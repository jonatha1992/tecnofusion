import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

function Hero() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        py: 8,
      }}
    >
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a mi Portfolio
        </Typography>
        <Typography variant="h5" component="p" paragraph>
          Desarrollador web apasionado por crear experiencias digitales
          increíbles
        </Typography>
        <Button variant="contained" color="secondary">
          Contáctame
        </Button>
      </Container>
    </Box>
  );
}

export default Hero;