import { Formik, Form } from "formik";
import { validarNumeroTelefono } from "../helper/Validacion.js";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { countries as countriesList } from "countries-list";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    return (
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
                                    <h1 className="text-3xl font-bold text-center mb-6">Contacto</h1>
                                    <div className="mb-4">
                                        <input
                                            type="text"
                                            name="nombre"
                                            placeholder="Nombre Completo"
                                            className={`w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 ${
                                                touched.nombre && errors.nombre ? "border-red-500" : "border-gray-400"
                                            }`}
                                            onChange={(e) => setFieldValue("nombre", e.target.value)}
                                        />
                                        {touched.nombre && errors.nombre && (
                                            <div className="text-red-500 text-sm mt-1">{errors.nombre}</div>
                                        )}
                                    </div>
                                    <div className="flex mb-4">
                                        <div className="w-1/3 mr-2">
                                            <select
                                                name="country"
                                                className="w-full px-4 py-2 rounded-md bg-gray-900 text-white"
                                                onChange={(e) => setFieldValue("country", e.target.value)}
                                                value={defaultCountryValue}
                                            >
                                                {countries.map((country, index) => (
                                                    <option key={index} value={country.value}>
                                                        {country.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-2/3">
                                            <input
                                                type="text"
                                                name="telefono"
                                                placeholder="Número sin prefijo"
                                                className={`w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 ${
                                                    touched.telefono && errors.telefono ? "border-red-500" : "border-gray-400"
                                                }`}
                                                onChange={(e) => setFieldValue("telefono", e.target.value)}
                                            />
                                            {touched.telefono && errors.telefono && (
                                                <div className="text-red-500 text-sm mt-1">{errors.telefono}</div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className={`w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 ${
                                                touched.email && errors.email ? "border-red-500" : "border-gray-400"
                                            }`}
                                            onChange={(e) => setFieldValue("email", e.target.value)}
                                        />
                                        {touched.email && errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                                    </div>
                                    <div className="mb-4">
                                        <textarea
                                            name="mensaje"
                                            placeholder="Mensaje"
                                            rows={3}
                                            className={`w-full px-4 py-2 rounded-md bg-gray-100 text-gray-900 ${
                                                touched.mensaje && errors.mensaje ? "border-red-500" : "border-gray-400"
                                            }`}
                                            onChange={(e) => setFieldValue("mensaje", e.target.value)}
                                        />
                                        {touched.mensaje && errors.mensaje && (
                                            <div className="text-red-500 text-sm mt-1">{errors.mensaje}</div>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
                                    >
                                        Enviar
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    <div className="w-full md:w-1/2 px-4 flex justify-center items-center mt-8 md:mt-0"></div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
