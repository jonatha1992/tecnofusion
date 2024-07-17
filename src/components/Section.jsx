import React from "react";
import { Box, Typography, Container } from "@mui/material";

function Section({ title, id, children, gradientClass }) {
  return (
    <div
      id={id}
      className={`h-[90vh] ${gradientClass} text-white flex items-center justify-center`}
    >
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
    </div>
  );
}

export default Section;
