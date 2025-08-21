import {
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
import backBOT from "../assets/back-BOT.jpg";
import backSmart from "../assets/back-smart.jpg";

function Projects({ title, id, children, gradientClass }) {
  return (
    <div
      id={id}
      className={`md:h-screen min-h-screen py-20 ${gradientClass} text-white flex items-center justify-center`}
    >
      <Container>
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
                title="AESFRON"
                description="App web de venta de Cursos en linea"
                image={img}
                githubLink="https://github.com/proyecto1"
                previewLink="https://preview.com/proyecto1"
              />
              <ProjectCard
                title="ChatBOT de WhatsApp"
                description="Utilizando la API oficial de META, es posible desarrollar bots administrativos que reserven turnos, entre muchas otras funcionalidades."
                image={backBOT}
                githubLink="https://github.com/ctrl1758/BOT-turnos"
                previewLink="https://wa.link/i7yplw"
              />
              <ProjectCard
                title="SmartMenu"
                description="Esta app web móvil se convierte en una herramienta esencial para aquellos que buscan una forma rápida y eficiente de disfrutar de su comida rápida favorita con solo unos pocos clics en su dispositivo móvil."
                image={backSmart}
                githubLink="https://github.com/ctrl1758/morfiBurger2"
                previewLink="https://morfi-burger.fly.dev/"
              />
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

function ProjectCard({ title, description, image, githubLink, previewLink }) {
  return (
    <Card className="bg-gray-800 text-white h-full flex flex-col justify-between hover:shadow-lg hover:shadow-green-500 transform transition-transform hover:scale-105">
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          href={githubLink}
          startIcon={<GitHubIcon />}
          className="hover:text-green-500"
        >
          GitHub
        </Button>
        <Button
          size="small"
          href={previewLink}
          startIcon={<PreviewIcon />}
          className="hover:text-green-500"
        >
          Preview
        </Button>
      </CardActions>
    </Card>
  );
}

export default Projects;
