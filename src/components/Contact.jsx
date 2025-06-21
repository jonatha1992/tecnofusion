import { Formik, Form } from "formik";
import { validarNumeroTelefono } from "../helper/Validacion.js";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { countries as countriesList } from "countries-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material UI imports
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, createTheme, ThemeProvider, Typography } from "@mui/material";

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
    name: Yup.string().required("El nombre es obligatorio"),
    telephone: Yup.string()
        .required("El número es obligatorio")
        .test("valido", "Número de teléfono no válido", (value) => validarNumeroTelefono(value)),
    email: Yup.string().email("El correo no es válido").required("El correo es obligatorio"),
    message: Yup.string().required("El mensaje es obligatorio"),
});

function Contact({ id, title }) {
    const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
        setErrors({});
        const phoneNumber = `${values.country}${values.telephone}`;
        try {
            // Enviar correo al destinatario principal
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    to_email: "tecnofusion.it@gmail.com", // Correo de la cuenta asociada
                    from_name: "Tecnofusión.IT",
                    subject: "Nuevo mensaje de " + values.name,
                    name: values.name,
                    message: `${values.message}`,
                    email: values.email,
                    telephone: phoneNumber,
                },
                import.meta.env.VITE_EMAILJS_USER_ID
            );

            // Enviar correo de confirmación al remitente
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_CONFIRM_TEMPLATE_ID,
                {
                    to_email: values.email, // Correo del remitente
                    from_name: "Tecnofusión.IT",
                    subject: "Confirmación de envío de mensaje",
                    name: values.name,
                },
                import.meta.env.VITE_EMAILJS_USER_ID
            );

            toast.success("¡La consulta se ha enviado con éxito!");
            resetForm();
        } catch (error) {
            toast.error("¡Hubo un error al enviar la consulta!");
        }

        setSubmitting(false);
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
            <div className="bg-gray-900 text-white py-16 ">
                <div className="container mx-auto px-4">
                    <div className="flex mx-4 justify-center">
                        <div className="w-full md:w-1/2 px-4 flex justify-center">
                            <Formik
                                initialValues={{
                                    name: "",
                                    telephone: "",
                                    email: "",
                                    message: "",
                                    country: defaultCountryValue,
                                }}
                                enableReinitialize={true}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                validateOnSubmit={true}
                                validateOnChange={false}
                                validateOnBlur={false}
                            >
                                {({ errors, touched, setFieldValue, values }) => (
                                    <Form className="w-full max-w-lg" id={id}>
                                        {/* <h1 className="text-3xl font-bold text-center mb-6 text-white">Contacto</h1> */}
                                        <Typography variant="h1" sx={{ fontSize: "4rem", mb: 4 }} className="text-gradient">
                                            {title}
                                        </Typography>
                                        <div className="mb-4">
                                            <TextField
                                                fullWidth
                                                name="name"
                                                label="Nombre Completo"
                                                variant="outlined"
                                                value={values.name}
                                                error={touched.name && Boolean(errors.name)}
                                                helperText={touched.name && errors.name}
                                                onChange={(e) => setFieldValue("name", e.target.value)}
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
                                                    name="telephone"
                                                    label="Número sin prefijo"
                                                    variant="outlined"
                                                    value={values.telephone}
                                                    error={touched.telephone && Boolean(errors.telephone)}
                                                    helperText={touched.telephone && errors.telephone}
                                                    onChange={(e) => setFieldValue("telephone", e.target.value)}
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
                                                value={values.email}
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                                onChange={(e) => setFieldValue("email", e.target.value)}
                                                sx={textFieldSx}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <TextField
                                                fullWidth
                                                name="message"
                                                label="Mensaje"
                                                variant="outlined"
                                                value={values.message}
                                                multiline
                                                rows={3}
                                                error={touched.message && Boolean(errors.message)}
                                                helperText={touched.message && errors.message}
                                                onChange={(e) => setFieldValue("message", e.target.value)}
                                                sx={textFieldSx}
                                            />
                                        </div>
                                        <Button type="submit" variant="contained" color="primary" fullWidth size="large" className="mt-4">
                                            Enviar
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                            <ToastContainer
                                autoClose={2000}
                                style={{
                                    zIndex: "9999",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default Contact;
