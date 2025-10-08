# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm run lint` - Run ESLint with React/hooks rules
- `npm run preview` - Preview production build locally

## Environment Setup

Create a `.env.local` (or `.env`) file with these variables (all prefixed with `VITE_` for Vite exposure). A starter is provided in `.env.example`.

```bash
# Firebase Configuration (optional)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# EmailJS Configuration (required for Contact form)
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_REQUEST=
VITE_EMAILJS_TEMPLATE_RESPONSE=
VITE_EMAILJS_PUBLIC_KEY=
```

## Architecture Overview

This is a React 18 + Vite single-page portfolio/company website for Tecnofusión.IT using a dual styling approach:

### Styling System
- **Material-UI v5** - Primary component library with custom theme in `App.jsx:10-70`
- **Tailwind CSS** - Utility classes with custom animations (fadeIn) in `tailwind.config.js`
- **Custom Theme Colors**: Primary `#131842`, Secondary `#E68369`, backgrounds and typography configured for dark theme

### Component Architecture
```
src/
├── App.jsx              # Main app with MUI ThemeProvider and page layout
├── components/          # All UI components
│   ├── Layout.jsx       # Main page wrapper with header/footer
│   ├── Hero.jsx         # Landing section
│   ├── Contact.jsx      # Contact form with Formik validation
│   ├── Projects.jsx     # Portfolio section
│   ├── Section.jsx      # Team/about section
│   ├── Servicios.jsx    # Services section
│   ├── Header.jsx       # Navigation header
│   └── WhatsAppChat.jsx # Floating WhatsApp widget
├── helper/
│   ├── Validacion.js    # Custom validation functions
│   └── Tools.js         # Utility functions
└── firebase.js          # Firebase/Firestore configuration
```

### Form Handling Pattern
The Contact component uses a specific pattern:
- **Formik** for form state management
- **Yup** for validation schema
- **EmailJS** for sending emails (dual emails: to recipient + confirmation)
- **Countries-list** for phone number prefixes
- Custom validation in `helper/Validacion.js`

### Key Technical Patterns

1. **Theme Integration**: Components mix MUI sx props with Tailwind classes
2. **Props Pattern**: Most components accept `title`, `id`, and `gradientClass` props
3. **Animation**: Uses custom `animate-fade-in` Tailwind class defined in config
4. **Firebase Usage**: Only Firestore is configured, used potentially for form submissions
5. **Environment Variables**: All external service configs use Vite's `import.meta.env` pattern

### ESLint Configuration
- React 18 setup with hooks rules
- Prop-types disabled (using TypeScript-style prop passing)
- Unused variables as warnings, not errors
- Located in `.eslintrc.cjs`

## Development Notes

- The project uses ES modules (`"type": "module"` in package.json)
- PostCSS configured for Tailwind CSS processing
- No test framework currently configured
- Assets are stored in `src/assets/` including team photos and hero video