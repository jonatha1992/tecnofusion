import { useState } from "react";
import { TextField, Box, Typography, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";

const WhatsAppChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const theme = useTheme();

    const textFieldStyle = {
        "& .MuiInputLabel-root": { color: theme.palette.primary.main },
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: theme.palette.primary.main },
            "&:hover fieldset": { borderColor: theme.palette.primary.main },
            "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
        },
        "& .MuiInputBase-input": { color: theme.palette.primary.main },
    };

    const handleSend = () => {
        if (message) {
            window.open(`https://wa.me/5491160235647?text=${encodeURIComponent(message)}`, "_blank");
            setMessage("");
        }
    };

    return (
        <>
            <IconButton
                sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    backgroundColor: "green",
                    color: "white",
                    "&:hover": { backgroundColor: "darkgreen" },
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <CloseIcon sx={{ fontSize: 40 }} /> : <WhatsAppIcon sx={{ fontSize: 40 }} />}
            </IconButton>

            {isOpen && (
                <Box
                    sx={{
                        position: "fixed",
                        bottom: 100,
                        right: 20,
                        width: 300,
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 3,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            padding: 2,
                            width: "100%",
                        }}
                    >
                        <Typography variant="h6" align="center" sx={{ color: "white" }}>
                            Chatea con nosotros
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 2, padding: 2, backgroundColor: theme.palette.secondary.main }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Nombre Completo"
                            label="Nombre Completo"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ ...textFieldStyle, mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Escribe tu mensaje"
                            label="Escribe tu mensaje"
                            multiline
                            rows={4}
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={{ ...textFieldStyle, mb: 2 }}
                        />

                        <button
                            className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded w-full"
                            onClick={handleSend}
                        >
                            ENVIAR
                        </button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default WhatsAppChat;
