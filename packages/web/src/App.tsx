import React, { createContext, useState } from "react";
import {
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useAuth } from "./common/hooks/auth";
import NavBar from "./common/components/nav/NavBar";
import { Box, IconButton } from "@mui/material";

import pathConfig, { getPathRoutes } from "./pages/common/constants/Paths";

const layoutParams = {
  appBarHeight: 50,
  crumbsHeight: 0,
  spacing: 5
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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/"  element={<pathConfig.Component path="/" />} loader={({ params }) => pathConfig.Loader(params)} handle={{crumb: pathConfig.Crumb}} >
        {pathConfig.Subpaths.map((path) => getPathRoutes(path, "/", true))}
      </Route>
    )
  );

  return (
<LayoutContext.Provider value={layoutParams}>
      <Box sx={styles.appBody} component="main" id="appBody">
        <RouterProvider router={router} />
      </Box>
    </LayoutContext.Provider>
  );
};

const styles: Record<string, any> = {
  appBody: {
    display: "flex",
    justifyContent: "center",
    marginTop: `${layoutParams.appBarHeight+layoutParams.crumbsHeight}px`,
    height: `calc(100vh - ${layoutParams.appBarHeight+layoutParams.crumbsHeight}px)`,
    width: "100%",
/*     background: 'rgba(176, 176, 176, 0.8)' */
  },
};
export default App;
