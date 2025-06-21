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
import { CheckIcon } from "@heroicons/react/outline";
import { FaGithub, FaEye } from "react-icons/fa";
import img from "../assets/imgApp.webp";
import franco from "../assets/franco.jpg";
import backBOT from "../assets/back-BOT.jpg";
import backSmart from "../assets/back-smart.jpg";
import foto_joni from "../assets/joni.jpg";
import svg1 from "../assets/imgsection2.svg";

function Section({ title, id, children, gradientClass }) {
  return (
    <div
      id={id}
      className={`min-h-[100vh] sm:min-h-[200vh] ${gradientClass} text-white flex items-center justify-center`}
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
        ) : id === "Nosotros" ? (
          <div className=" flex items-center justify-center">
            <div
              className="flex flex-wrap w-full max-w-screen-lg"
              style={{ height: "80vh" }}
            >
              <div className="flex-1 min-w-[300px] p-4 flex flex-col justify-around">
                <div>
                  <Typography
                    variant="h1"
                    sx={{ fontSize: "4rem", textTransform: "capitalize" }}
                    className="text-gradient"
                  >
                    {title}
                  </Typography>
                  <Typography variant="h3">
                    Este es nuestro equipo de trabajo!
                  </Typography>
                </div>
                <div className="p-4 flex-col flex justify-end">
                  <img
                    src={svg1}
                    alt="Ilustraci\u00f3n representando al equipo de trabajo"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[300px] p-4 flex flex-col gap-4 justify-center">
                <div className="bg-gray-700 p-4 flex-1 rounded-lg">
                  <div className="flex justify-between items-center">
                    <Typography variant="h6">Jonathan Correa</Typography>
                    <img
                      src={foto_joni}
                      alt="Foto de Jonathan Correa"
                      className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
                    />
                    <Typography variant="h6">Analista Programador</Typography>
                  </div>
                  <div className="flex justify-between mt-4 items-end">
                    <ul className="list-none ml-4 mt-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        JavaScript, Typescript, React
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        Tailwind, Material UI y Boobstrap
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        PostgressSQL, Firestore, Sql Server
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        NodeJS Express
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        C#, ASP.NET CORE , Windows Forms
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        Python , R
                      </li>
                    </ul>
                    <div className="ml-4 mt-2 flex flex-col gap-2 h-full">
                      <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        <FaGithub className="mr-2" />
                        GitHub
                      </button>
                      <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        <FaEye className="mr-2" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 p-4 flex-1 rounded-lg">
                  <div className="flex justify-between items-center">
                    <Typography variant="h6">Franco More</Typography>
                    <img
                      src={franco}
                      alt="Foto de Franco More"
                      className="inline-block h-20 w-20 rounded-full ring-2 ring-white"
                    />
                    <Typography variant="h6">Full Stack WEB</Typography>
                  </div>
                  <div className="flex justify-between mt-4 items-end">
                    <ul className="list-none ml-4 mt-2">
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        HTML-CSS-JavaScript
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        React
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        Tailwind, Material UI
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        NodeJS
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        Google Cloud Services
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        OPEN AI
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        MP, Stripe, Paypal
                      </li>
                      <li className="flex items-center">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        Firebase, Firestore
                      </li>
                    </ul>
                    <div className="ml-4 mt-2 flex flex-col gap-2 h-full">
                      <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        <FaGithub className="mr-2" />
                        GitHub
                      </button>
                      <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                        <FaEye className="mr-2" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}

function ProjectCard({ title, description, image, githubLink, previewLink }) {
  return (
    <Card sx={{ maxWidth: 345, bgcolor: "background.paper" }}>
      <CardMedia component="img" height="140" image={image} alt={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.description">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          href={githubLink}
          target="_blank"
        >
          <GitHubIcon />
        </Button>
        <Button
          size="small"
          color="secondary"
          href={previewLink}
          target="_blank"
        >
          <PreviewIcon />
        </Button>
      </CardActions>
    </Card>
  );
}

export default Section;
