import React, { useRef } from "react";
import { Formik, Form } from "formik";
import { validarNumeroTelefono } from "../helper/Validacion.js";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { countries as countriesList } from "countries-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material UI imports
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, createTheme, ThemeProvider } from "@mui/material";

// Crear un tema oscuro personalizado
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#e57373", // Un rojo claro para el botón
        },
        text: {
            primary: "#ffffff", // Texto blanco
        },
    },
});

// Obtener la lista de países con sus prefijos telefónicos
const countries = Object.keys(countriesList).map((code) => ({
    label: `${countriesList[code].name} (+${countriesList[code].phone})`,
    value: `+${countriesList[code].phone}`,
}));

// Encuentra el valor que corresponde a Argentina (+54)
const defaultCountryValue = countries.find((country) => country.value === "+54")?.value || countries[0].value;

const validationSchema = Yup.object().shape({
    nombre: Yup.string().required("El nombre es obligatorio"),
    telefono: Yup.string()
        .required("El número es obligatorio")
        .test("valido", "Número de teléfono no válido", (value) => validarNumeroTelefono(value)),
    email: Yup.string().email("El correo no es válido").required("El correo es obligatorio"),
    mensaje: Yup.string().required("El mensaje es obligatorio"),
});

const Contact = () => {
    const formRef = useRef();

    const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
        setErrors({});
        const phoneNumber = `${values.country}${values.telefono}`;
        try {
            let result = await emailjs.sendForm("service_cg53wui", "template_3a2716m", formRef.current, "qHtG6A2I87n7CARUF", {
                telefono: phoneNumber,
            });
            console.log(result.text);
            toast.success("¡La consulta se ha enviado con éxito!");
        } catch (error) {
            console.log(error.text);
            toast.error("¡Hubo un error al enviar la consulta!");
        }

        setSubmitting(true);
        resetForm();
    };

    const textFieldSx = {
        input: { color: "white" },
        label: { color: "white" },
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
        },
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="bg-gray-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap -mx-4">
                        <ToastContainer
                            autoClose={10000}
                            className="toast-container"
                            style={{
                                position: "relative",
                                top: "0",
                                zIndex: "9999",
                            }}
                        />
                        <div className="w-full md:w-1/2 px-4 flex justify-center">
                            <Formik
                                initialValues={{
                                    nombre: "",
                                    telefono: "",
                                    email: "",
                                    mensaje: "",
                                    country: defaultCountryValue,
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                validateOnSubmit={true}
                                validateOnChange={false}
                                validateOnBlur={false}
                            >
                                {({ errors, touched, setFieldValue }) => (
                                    <Form className="w-full max-w-lg" ref={formRef}>
                                        <h1 className="text-3xl font-bold text-center mb-6 text-white">Contacto</h1>
                                        <div className="mb-4">
                                            <TextField
                                                fullWidth
                                                name="nombre"
                                                label="Nombre Completo"
                                                variant="outlined"
                                                error={touched.nombre && Boolean(errors.nombre)}
                                                helperText={touched.nombre && errors.nombre}
                                                onChange={(e) => setFieldValue("nombre", e.target.value)}
                                                sx={textFieldSx}
                                            />
                                        </div>
                                        <div className="flex mb-4">
                                            <div className="w-1/3 mr-2">
                                                <FormControl fullWidth>
                                                    <InputLabel sx={{ color: "white" }}>País</InputLabel>
                                                    <Select
                                                        name="country"
                                                        value={defaultCountryValue}
                                                        label="País"
                                                        onChange={(e) => setFieldValue("country", e.target.value)}
                                                        sx={{
                                                            color: "white",
                                                            ".MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "white",
                                                            },
                                                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "white",
                                                            },
                                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                                borderColor: "white",
                                                            },
                                                        }}
                                                    >
                                                        {countries.map((country, index) => (
                                                            <MenuItem key={index} value={country.value}>
                                                                {country.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="w-2/3">
                                                <TextField
                                                    fullWidth
                                                    name="telefono"
                                                    label="Número sin prefijo"
                                                    variant="outlined"
                                                    error={touched.telefono && Boolean(errors.telefono)}
                                                    helperText={touched.telefono && errors.telefono}
                                                    onChange={(e) => setFieldValue("telefono", e.target.value)}
                                                    sx={textFieldSx}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <TextField
                                                fullWidth
                                                name="email"
                                                label="Email"
                                                variant="outlined"
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                                onChange={(e) => setFieldValue("email", e.target.value)}
                                                sx={textFieldSx}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <TextField
                                                fullWidth
                                                name="mensaje"
                                                label="Mensaje"
                                                variant="outlined"
                                                multiline
                                                rows={3}
                                                error={touched.mensaje && Boolean(errors.mensaje)}
                                                helperText={touched.mensaje && errors.mensaje}
                                                onChange={(e) => setFieldValue("mensaje", e.target.value)}
                                                sx={textFieldSx}
                                            />
                                        </div>
                                        <Button type="submit" variant="contained" color="primary" fullWidth size="large" className="mt-4">
                                            Enviar
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Contact;
