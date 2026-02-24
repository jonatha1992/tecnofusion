import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY;
const MODEL = process.env.VITE_GEMINI_MODEL || "gemini-2.5-flash";

async function test() {
  console.log(`Testing Gemini with model: ${MODEL}`);
  if (!API_KEY) {
    console.error("No API key found in .env");
    return;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  try {
    const model = genAI.getGenerativeModel({ model: MODEL });
    const result = await model.generateContent("Say 'Gemini 2.5 is working!'");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
