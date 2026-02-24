import { GoogleGenerativeAI } from "@google/generative-ai";

const ENV = import.meta.env;

const GEMINI_API_KEY = ENV.VITE_GEMINI_API_KEY;
const OPEN_ROUTER_API_KEY =
  ENV.VITE_OPEN_ROUTER_API_KEY ||
  ENV.VITE_OPENROUTER_API_KEY;
const GROQ_API_KEY = ENV.VITE_GROQ_API_KEY;

const GEMINI_MODEL = ENV.VITE_GEMINI_MODEL || "gemini-1.5-flash";
const OPEN_ROUTER_MODEL =
  ENV.VITE_OPEN_ROUTER_MODEL || ENV.VITE_OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct";
const GROQ_MODEL = ENV.VITE_GROQ_MODEL || "llama-3.3-70b-versatile";

const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

const parseResponseError = async (response) => {
  try {
    const data = await response.json();
    if (typeof data?.error === "string") return data.error;
    if (data?.error?.message) return data.error.message;
    if (data?.message) return data.message;
    return JSON.stringify(data);
  } catch {
    const text = await response.text();
    return text || response.statusText;
  }
};

const normalizeContent = (content) => {
  if (typeof content === "string") return content.trim();
  if (Array.isArray(content)) {
    return content
      .map((part) => {
        if (typeof part === "string") return part;
        if (typeof part?.text === "string") return part.text;
        return "";
      })
      .join("")
      .trim();
  }
  return "";
};

const callGemini = async (prompt) => {
  if (!genAI) throw new Error("API key no configurada");
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();
  if (!text) throw new Error("Respuesta vacia");
  return text;
};

const callOpenAICompatible = async ({ endpoint, apiKey, model, prompt, headers = {} }) => {
  if (!apiKey) throw new Error("API key no configurada");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const detail = await parseResponseError(response);
    throw new Error(`HTTP ${response.status} - ${detail}`);
  }

  const data = await response.json();
  const text = normalizeContent(data?.choices?.[0]?.message?.content);
  if (!text) throw new Error("Respuesta vacia");
  return text;
};

const callOpenRouter = async (prompt) =>
  callOpenAICompatible({
    endpoint: "https://openrouter.ai/api/v1/chat/completions",
    apiKey: OPEN_ROUTER_API_KEY,
    model: OPEN_ROUTER_MODEL,
    prompt,
    headers: {
      "HTTP-Referer":
        ENV.VITE_OPENROUTER_SITE_URL ||
        (typeof window !== "undefined" ? window.location.origin : "http://localhost"),
      "X-Title": ENV.VITE_OPENROUTER_APP_NAME || "Tecnofusion",
    },
  });

const callGroq = async (prompt) =>
  callOpenAICompatible({
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    apiKey: GROQ_API_KEY,
    model: GROQ_MODEL,
    prompt,
  });

const PROVIDERS = [
  { name: "gemini", isConfigured: Boolean(GEMINI_API_KEY), call: callGemini },
  { name: "openrouter", isConfigured: Boolean(OPEN_ROUTER_API_KEY), call: callOpenRouter },
  { name: "groq", isConfigured: Boolean(GROQ_API_KEY), call: callGroq },
];

export const getConfiguredAiProviders = () =>
  PROVIDERS.filter((provider) => provider.isConfigured).map((provider) => provider.name);

export const generateTextWithFallback = async (prompt, order = ["gemini", "openrouter", "groq"]) => {
  const byName = new Map(PROVIDERS.map((provider) => [provider.name, provider]));
  const queue = order
    .map((name) => byName.get(name))
    .filter(Boolean)
    .filter((provider) => provider.isConfigured);

  if (!queue.length) {
    throw new Error(
      "Configura al menos una API key: VITE_GEMINI_API_KEY, VITE_OPEN_ROUTER_API_KEY o VITE_GROQ_API_KEY."
    );
  }

  const failures = [];

  for (const provider of queue) {
    try {
      const text = await provider.call(prompt);
      return { text, provider: provider.name };
    } catch (error) {
      const detail = error instanceof Error ? error.message : String(error);
      failures.push(`${provider.name}: ${detail}`);
      console.warn(`[AI fallback] fallo ${provider.name}:`, detail);
    }
  }

  console.error("[AI fallback] Todos los proveedores fallaron", failures);
  throw new Error("No pude responder ahora. Intenta nuevamente en unos segundos.");
};
