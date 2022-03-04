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
      },
      keyframes: {
        pulse: {
          "0%, 100%": { transform: "scale3d(1, 1, 1)" },
          "50%": { transform: "scale3d(1.02, 1.02, 1.02)" },
        },
      },
    },
  },
};
