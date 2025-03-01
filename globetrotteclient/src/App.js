import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme();

function App() {
  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game/:inviteCode" element={<Game />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </div>
      </Router>
    // </ThemeProvider>
  );
}

export default App;
