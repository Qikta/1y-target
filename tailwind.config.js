module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // screens: {
      //   sm: '576px',
      //   md: '960px',
      //   lg: '1024px'
      // }
    }
  },
  plugins: [
    function({addComponents}) {
      addComponents({
        ".container": {
          "@screen sm": {
            maxWidth: "600px",
          },
          "@screen md": {
            maxWidth: "700px",
          },
          "@screen lg": {
            maxWidth: "900px",
          },
          "@screen xl": {
            maxWidth: "1200px",
          },
        }
      })
    },
  ],
}
