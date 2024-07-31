import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-family: 'Inter, sans-serif';
        }
      `,
    },
  },
});

export default theme;
