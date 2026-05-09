/** @type {import("tailwindcss").Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#f9fbf9",
                foreground: "#12211a",
                card: "#ffffff",
                "card-foreground": "#12211a",
                primary: "#3b9b6e",
                "primary-foreground": "#ffffff",
                muted: "#eef1f0",
                "muted-foreground": "#677e73",
                border: "#dce5e0",
                input: "#dce5e0",
                ring: "#3b9b6e"
            },
            fontFamily: {
                sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
            }
        }
    },
    plugins: []
};
