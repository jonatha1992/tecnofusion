import { Typography, Container } from "@mui/material";
import { CheckIcon } from "@heroicons/react/outline";
import { FaGithub, FaEye } from "react-icons/fa";
import franco from "../assets/franco.jpg";
import foto_joni from "../assets/joni.jpg";
import svg1 from "../assets/imgsection2.svg";

function Section({ title, id, gradientClass }) {
  return (
    <div
      id={id}
      className={`min-h-[100vh] sm:min-h-[200vh] ${gradientClass} text-white flex items-center justify-center`}
    >
      <Container>
        {id === "Nosotros" ? (
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

export default Section;
