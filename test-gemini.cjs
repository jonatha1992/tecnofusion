const { GoogleGenerativeAI } = require("@google/generative-ai");

const API_KEY = "AIzaSyDXKXmiaNC_2PqQp69AGhgE1BjKbqtxAmQ"; // Hardcoded for verification only
const MODEL = "gemini-2.5-flash";

async function test() {
  console.log(`Testing Gemini with model: ${MODEL}`);
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
