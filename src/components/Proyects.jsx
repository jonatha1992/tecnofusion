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

function Proyects({ title, id, children, gradientClass }) {
  return (
    <div
      id={id}
      className={`md:h-screen h-[130vh]  ${gradientClass} text-white flex items-center justify-center`}
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
                    title="AESFRON"
                    description="App web de venta de Cursos en linea"
                    image={img}
                    githubLink="https://github.com/proyecto1"
                    previewLink="https://preview.com/proyecto1"
                  />
                  <ProjectCard
                    title="Contador de Calorias"
                    description="Descripción del proyecto 2"
                    image="https://uizard.io/static/cf424bbe243fbeea669a73e9a643b942/0cfa7/4f1d95da946fb3f71d54297dfb6e5de9fe712af3-1440x835.webp"
                    githubLink="https://github.com/proyecto2"
                    previewLink="https://preview.com/proyecto2"
                  />
                  <ProjectCard
                    title="Citas Online"
                    description="Descripción del proyecto 3"
                    image={
                      "https://uizard.io/static/ad6ed79a8d0a71b0ae07d216a95824f1/0cfa7/e33b6844ef5e56ea7e36dc6b9e9b520bf8fa69c0-1440x835.webp"
                    }
                    githubLink="https://github.com/proyecto3"
                    previewLink="https://preview.com/proyecto3"
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
                    description="Esta app web móvil se convierte en una herramienta esencial para aquellos que buscan una forma rápida y eficiente de disfrutar de su comida rápida favorita con solo unos pocos clics en su dispositivo móvil. "
                    image={backSmart}
                    githubLink="https://github.com/ctrl1758/morfiBurger2"
                    previewLink="https://morfi-burger.fly.dev/"
                  />
                </>
              )}
            </div>
          </>
        ) : null}
        </Container>
    </div>
  );
}

function ProjectCard({ title, description, image, githubLink, previewLink }) {
  return (
    <Card className="bg-gray-800 text-white h-full flex flex-col justify-between hover:shadow-lg hover:shadow-green-500">
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

export default Proyects;
