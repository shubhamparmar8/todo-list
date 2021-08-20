import ReactDOM from "react-dom";
import App from "./App";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import "./index.css";

const customTheme = createTheme({
  typography: {
    fontFamily: "Quicksand",
  },
});

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
