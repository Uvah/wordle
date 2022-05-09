module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#0064fb",
      },
      fontFamily: {
        Raleway: ["Raleway", "sans-serif"],
      },
      animation: {
        pulse: "pulse 0.3s ease-in-out 1",
        flipX: "flipX 1.5s ease-in-out 1",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale3d(1, 1, 1)" },
          "50%": { transform: "scale3d(1.02, 1.02, 1.02)" },
        },
        flipX: {
          "0%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, 90deg)",
            "animation-timing-function": "ease-in",
            opacity: 0,
          },
          "40%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, -20deg)",
            "animation-timing-function": "ease-in",
          },
          "60%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, 10deg)",
            opacity: "1",
          },
          "80%": {
            transform: "perspective(400px) rotate3d(1, 0, 0, -5deg)",
          },
          to: {
            transform: "perspective(400px)",
          },
        },
      },
    },
  },
};
