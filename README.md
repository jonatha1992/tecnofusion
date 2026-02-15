# TecnoFusion Portfolio

A modern, dynamic portfolio application built with React, Vite, and Firebase. This project features a powerful Admin Panel controlled by AI for automated project analysis and management.

## 🚀 Key Features

### 1. **Project Management with AI**

- **AI Fallback Integration**: Uses Gemini, OpenRouter, and Groq with automatic failover.
- **Smart Autofill**: Upload a file or paste text, and the AI fills out the form for you.
- **Admin Panel**: Full CRUD (Create, Read, Update, Delete) operations for projects.

### 2. **Advanced README Integration**

- **File Storage**: Upload and store README files directly in Firebase Storage.
- **In-App Viewer**: Beautiful **Markdown Viewer** modal to read documentation without leaving the site.
- **Edit Mode Support**: Add or update READMEs for existing projects.

### 3. **Dynamic UI/UX**

- **Responsive Design**: Built with Tailwind CSS for perfect rendering on any device.
- **Animations**: Smooth transitions powered by `framer-motion`.
- **Optional Demo Links**: Support for backend-only or non-deployed projects (checkbox logic).

### 4. **IA Assistant (Navi) para visitantes**

- **Asesor comercial**: Widget flotante en la página pública para ayudar a prospectos.
- **Multi-provider powered**: Gemini + OpenRouter + Groq con fallback automatico para evitar caidas por cuota/tokens.
- **Flujo ágil**: Atajos rápidos, Enter para enviar, historial en localStorage.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend / Database**: Firebase (Firestore, Storage, Authentication)
- **AI**: Google Gemini API (`@google/generative-ai`) + OpenRouter + Groq
- **Markdown**: `react-markdown`, `remark-gfm`

## 📦 Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/jonatha1992/tecnofusion.git
    cd tecnofusion
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Environment Setup**:
    Create a `.env` file in the root directory and add your keys:

    ```env
    # Firebase Configuration
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id

    # AI Providers (fallback: Gemini -> OpenRouter -> Groq)
    VITE_GEMINI_API_KEY=your_gemini_api_key
    VITE_OPEN_ROUTER_API_KEY=your_openrouter_api_key
    VITE_GROQ_API_KEY=your_groq_api_key

    # Optional model overrides
    VITE_GEMINI_MODEL=gemini-2.5-flash
    VITE_OPEN_ROUTER_MODEL=meta-llama/llama-3.1-8b-instruct
    VITE_GROQ_MODEL=llama-3.3-70b-versatile
    ```

4. **Run Locally**:

    ```bash
    npm run dev
    ```

## 🔧 Deployment

The project is optimized for deployment on **Vercel** or **Netlify**.

```bash
npm run build
```

---

*Built with ❤️ by Jonathan*
