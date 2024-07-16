import React from "react";
import { Box, Typography, Container } from "@mui/material";

function Section({ title, id, children }) {
  return (
    <Box id={id} sx={{ py: 8, mt: 8, bgcolor: "background.default" }}>
      <Container>
        <Typography variant="h3" component="h2" gutterBottom>
          {title}
        </Typography>
        {children || (
          <Typography variant="body1">
            Contenido de la sección. Personaliza esto según tus necesidades.
          </Typography>
        )}
      </Container>
    </Box>
  );
}

export default Section;
