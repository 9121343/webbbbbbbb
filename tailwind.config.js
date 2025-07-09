/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        neon: {
          pink: "#ff006e",
          purple: "#8338ec",
          blue: "#3a86ff",
          cyan: "#06ffa5",
          yellow: "#ffbe0b",
        },
        dark: {
          100: "#1a1a2e",
          200: "#16213e",
          300: "#0f3460",
          400: "#533483",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Orbitron", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "rotate-slow": "rotate 10s linear infinite",
        "pulse-neon": "pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        morph: "morph 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: {
            textShadow: "0 0 20px #fff, 0 0 30px #fff, 0 0 40px #ff006e",
          },
          to: {
            textShadow:
              "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff006e, 0 0 40px #ff006e",
          },
        },
        "pulse-neon": {
          "0%, 100%": {
            opacity: "1",
            boxShadow: "0 0 20px #ff006e, 0 0 40px #ff006e, 0 0 60px #ff006e",
          },
          "50%": {
            opacity: ".8",
            boxShadow: "0 0 10px #ff006e, 0 0 20px #ff006e, 0 0 30px #ff006e",
          },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center bottom",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "400% 400%",
            "background-position": "right center",
          },
        },
        morph: {
          "0%, 100%": { borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" },
          "50%": { borderRadius: "30% 60% 70% 40% / 50% 60% 30% 60%" },
        },
      },
      backgroundImage: {
        "neon-gradient": "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)",
        "cyber-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "purple-gradient": "linear-gradient(90deg, #8338ec 0%, #3a86ff 100%)",
        "rainbow-gradient":
          "linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b)",
      },
      boxShadow: {
        neon: "0 0 20px #ff006e, 0 0 40px #ff006e, 0 0 60px #ff006e",
        "neon-blue": "0 0 20px #3a86ff, 0 0 40px #3a86ff, 0 0 60px #3a86ff",
        "neon-purple": "0 0 20px #8338ec, 0 0 40px #8338ec, 0 0 60px #8338ec",
        cyber: "0 25px 50px -12px rgba(255, 0, 110, 0.4)",
      },
    },
  },
  plugins: [],
};
