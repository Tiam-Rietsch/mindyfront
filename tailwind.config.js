/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        thickViolet: "#4D0DA8",
        lightViolet: "#DDC6FD",
        regularViolet: "#8A46EA",
        thickGray: "#777777",
        lightGray: "#F7F7F7",
        regularGray: "#CECECE",

        // skill cards colors
        skillViolet: "#4A249D",
        lightSkillViolet: "#8264c4",
        skillBlue: "#009FBD",
        lightSkillBlue: "#96ddeb",
        skillYellow: "#daa636",
        lightSkillYellow: "#f1d8a1"
      },
      fontFamily: {
        dBold : 'D-DIN-Bold',
        dItalic: 'D-DIN-Italic',
        dRegular: 'D-DIN'
      }
    },
  },
  plugins: [],
}

