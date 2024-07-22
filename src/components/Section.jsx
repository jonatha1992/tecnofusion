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
import { CheckIcon } from "@heroicons/react/outline";
import { FaGithub, FaEye } from "react-icons/fa";
import img from "../assets/imgApp.webp";
import franco from "../assets/franco.jpg";
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
          <div className="min-h-screen flex items-center justify-center">
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
                  <Typography variant="body1">
                    Este es nuestro equipo de trabajo!
                  </Typography>
                </div>
                <div className="p-4 flex-col flex justify-end">
                  <img src={svg1} alt="Imagen" className="" />
                </div>
              </div>
              <div className="flex-1 min-w-[300px] p-4 flex flex-col gap-4 justify-center">
                <div className="bg-gray-700 p-4 flex-1">
                  <div className="flex justify-between items-center">
                    <Typography variant="h6">Gabriel Correa</Typography>
                    <img
                      alt=""
                      src=""
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
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />4
                        Años de experiencia freelance
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
                <div className="bg-gray-700 p-4 flex-1">
                  <div className="flex justify-between items-center">
                    <Typography variant="h6">Franco More</Typography>
                    <img
                      alt=""
                      src={franco}
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
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />4
                        Años de experiencia freelance
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
