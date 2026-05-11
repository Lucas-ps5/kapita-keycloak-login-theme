import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            environmentVariables: [
                { name: "MY_APP_API_URL", default: "http://localhost:5173" },
                { name: "MY_APP_PALETTE", default: "dracula" }
            ]
        })
    ]
});
