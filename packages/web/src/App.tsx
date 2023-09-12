import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useAuth } from "./hooks/auth";
import NavBar from "./components/NavBar";
import { Box } from "@mui/material";

import Paths, { getPathRoutes } from "./pages/common/constants/Paths";

const layoutParams = {
  navHeight: 64,
};

const App: React.FC = () => {
  const auth = useAuth();
  return (
    <>
      <Box sx={{ height: layoutParams.navHeight }} component="nav">
        <NavBar />
      </Box>
      <Box
        sx={{ height: `calc(100vh - ${layoutParams.navHeight}px)` }}
        component="section"
      >
        <Routes>
          <Route index element={Paths.Component} />
          {Paths.Subpaths.map((path) => getPathRoutes(path, '/', true))}     
        </Routes>
      </Box>
    </>
  );
};

export default App;
