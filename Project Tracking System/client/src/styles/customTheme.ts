import { createMuiTheme } from "@material-ui/core/styles";

const customTheme = () =>
  createMuiTheme({
    palette: {
      type: "light",
      primary: {
        main: "#357a38",
        light: "#f4faf4",
      },
      secondary: {
        main: "#357a38",
      },
    },
    overrides: {
      MuiTypography: {
        root: {
          wordBreak: "break-word",
        },
      },
    },
  });

export default customTheme;
