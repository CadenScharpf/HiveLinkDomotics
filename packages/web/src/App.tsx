import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useAuth } from "./hooks/auth";
import NavBar from "./components/nav/NavBar";
import { Box, IconButton } from "@mui/material";
import SideBar from "./components/nav/SideBar";

import pathConfig, { getPathRoutes } from "./pages/common/constants/Paths";

const layoutParams = {
  navHeight: 80,
};
export const LayoutContext = createContext({ ...layoutParams });

const layout = {
  color1: "tomato",
  color2: "white",
};

const App: React.FC = () => {
  const auth = useAuth();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false); // State to control the sidebar

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <LayoutContext.Provider value={layoutParams}>
      <SideBar open={isSideBarOpen} onClose={toggleSideBar} />
      <NavBar toggleSideBar={toggleSideBar} />
      <Box sx={styles.appBody} component="main" id="appBody">
        <Routes>
          <Route index element={<pathConfig.Component path="/" />} />{" "}
          {pathConfig.Subpaths.map((path) => getPathRoutes(path, "/", true))}
        </Routes>
      </Box>
    </LayoutContext.Provider>
  );
};

const styles: Record<string, any> = {
  appBody: {
    display: "flex",
    justifyContent: "center",
    
    height: `calc(100vh - ${layoutParams.navHeight}px)`,
    width: "100%",
  },
};
export default App;
