import React from "react";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import PreviewIcon from "@mui/icons-material/Preview";
import img from "../assets/imgApp.webp";
import svg1 from "../assets/imgsection2.svg";

function Section({ title, id, children, gradientClass }) {
  return (
    <div
      id={id}
      className={`min-h-[100vh] ${gradientClass} text-white flex items-center justify-center`}
    >
      <Container>
        {id === "proyectos" ? (
          <>
            <Typography
              variant="h1"
              sx={{ fontSize: "4rem", mb: 8 }}
              className="text-gradient"
            >
              {title}
            </Typography>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {children || (
                <>
                  <ProjectCard
                    title="Proyecto 1"
                    description="Descripción del proyecto 1"
                    image={img}
                    githubLink="https://github.com/proyecto1"
                    previewLink="https://preview.com/proyecto1"
                  />
                  <ProjectCard
                    title="Proyecto 2"
                    description="Descripción del proyecto 2"
                    image="https://uizard.io/static/cf424bbe243fbeea669a73e9a643b942/0cfa7/4f1d95da946fb3f71d54297dfb6e5de9fe712af3-1440x835.webp"
                    githubLink="https://github.com/proyecto2"
                    previewLink="https://preview.com/proyecto2"
                  />
                  <ProjectCard
                    title="Proyecto 3"
                    description="Descripción del proyecto 3"
                    image="https://uizard.io/static/ad6ed79a8d0a71b0ae07d216a95824f1/0cfa7/e33b6844ef5e56ea7e36dc6b9e9b520bf8fa69c0-1440x835.webp"
                    githubLink="https://github.com/proyecto3"
                    previewLink="https://preview.com/proyecto3"
                  />
                  <ProjectCard
                    title="Proyecto 4"
                    description="Descripción del proyecto 4"
                    image="https://uizard.io/static/ad6ed79a8d0a71b0ae07d216a95824f1/0cfa7/e33b6844ef5e56ea7e36dc6b9e9b520bf8fa69c0-1440x835.webp"
                    githubLink="https://github.com/proyecto4"
                    previewLink="https://preview.com/proyecto4"
                  />
                  <ProjectCard
                    title="Proyecto 5"
                    description="Descripción del proyecto 5"
                    image="https://uizard.io/static/ad6ed79a8d0a71b0ae07d216a95824f1/0cfa7/e33b6844ef5e56ea7e36dc6b9e9b520bf8fa69c0-1440x835.webp"
                    githubLink="https://github.com/proyecto5"
                    previewLink="https://preview.com/proyecto5"
                  />
                </>
              )}
            </div>
          </>
        ) : id === "nosotros" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                <Typography
                  variant="h1"
                  sx={{ fontSize: "4rem", textTransform: "capitalize" }}
                  className="text-gradient"
                >
                  {title}
                </Typography>
                <Typography variant="body1">
                  Este es nuestro equipo de trabajo!
                </Typography>
                <div className="p-4 flex-1">
                  <img
                    src={svg1}
                    alt="Imagen"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <div className="bg-gray-700 p-4 flex-1">
                  <Typography variant="h6">Div de Gabi</Typography>
                  <Typography variant="body1">Contenido del Gabi.</Typography>
                </div>

                <div className="bg-gray-700 p-4 flex-1">
                  <Typography variant="h6">Div de Franco</Typography>
                  <Typography variant="body1">Contenido del Franco.</Typography>
                </div>
              </div>
            </div>
          </>
        ) : (
          children || (
            <Typography variant="h4" className="text-2xl">
              Contenido de la sección. Personaliza esto según tus necesidades.
            </Typography>
          )
        )}
      </Container>
    </div>
  );
}

function ProjectCard({ title, description, image, githubLink, previewLink }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#131842",
        color: "white",
        boxShadow: "0 0 10px #131842, 0 0 20px #131842, 0 0 30px #3e4dcf",
      }}
      className="transition-transform transform hover:scale-105"
    >
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "#ff7e5f", fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href={githubLink}
          target="_blank"
          startIcon={<GitHubIcon />}
          sx={{ color: "white" }}
        >
          GitHub
        </Button>
        <Button
          size="small"
          href={previewLink}
          target="_blank"
          startIcon={<PreviewIcon />}
          sx={{ color: "white" }}
        >
          Preview
        </Button>
      </CardActions>
    </Card>
  );
}

export default Section;
