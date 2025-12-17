module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:react/jsx-runtime", "plugin:react-hooks/recommended"],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
        "react/jsx-no-target-blank": "off",
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        // Añade estas reglas para solucionar los problemas específicos:
        "react/prop-types": "off", // Desactiva la advertencia sobre prop-types
        "no-unused-vars": "warn", // Cambia el error por una advertencia para variables no utilizadas
        "react/jsx-key": "warn", // Cambia el error por una advertencia para keys en listas
        "react/display-name": "off", // Desactiva la advertencia sobre nombres de visualización
        "react/no-unescaped-entities": "off", // Desactiva la advertencia sobre entidades sin escapar
    },
};
