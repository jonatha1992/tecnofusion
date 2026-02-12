import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Polyfill for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkModels() {
    try {
        // Read .env file manually to avoid dotenv dependency issues
        const envPath = path.resolve(__dirname, ".env");
        if (!fs.existsSync(envPath)) {
            console.error("Error: .env file not found at", envPath);
            return;
        }

        const envContent = fs.readFileSync(envPath, "utf-8");
        const match = envContent.match(/VITE_GEMINI_API_KEY=(.*)/);

        if (!match || !match[1]) {
            console.error("Error: VITE_GEMINI_API_KEY not found in .env");
            return;
        }

        // Clean the key (remove quotes and whitespace)
        const apiKey = match[1].trim().replace(/["']/g, "");

        console.log("Testing with API Key ending in:", apiKey.slice(-4));

        const genAI = new GoogleGenerativeAI(apiKey);

        // For listing models, we don't need a specific model yet, 
        // but the SDK structure usually involves getting a model. 
        // However, the ModelService is available via the library if accessible, 
        // but the easiest way to check access is often just trying a known stable model 
        // or finding a way to list.
        // The node-specific API might allow listing. 
        // Actually, usually it's genAI.getGenerativeModel... 
        // Let's try to just run a simple prompt on a very standard model first 
        // to see if it's a model name issue or a key issue.

        // We will try to list models if the method exists, otherwise test standard models.
        // The current JS SDK doesn't expose listModels directly on the main class easily 
        // in all versions without authorized manager.

        // Verify via REST API
        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        try {
            console.log("Fetching models from:", url.replace(apiKey, "HIDDEN_KEY"));
            const response = await fetch(url);
            const data = await response.json();

            if (data.error) {
                console.error("API Error:", data.error);
            } else if (data.models) {
                console.log("Writing models to models.json");
                fs.writeFileSync("models.json", JSON.stringify(data.models, null, 2));
            } else {
                console.log("No models returned or unexpected format:", data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }

    } catch (error) {
        console.error("Fatal error:", error);
    }
}

checkModels();
