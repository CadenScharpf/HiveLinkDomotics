import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useAuth } from './hooks/auth';
import NavBar from './components/nav/NavBar';
import { Box, IconButton } from '@mui/material';
import SideBar from './components/nav/SideBar';


import Paths, { getPathRoutes } from './pages/common/constants/Paths';

const layoutParams = {
  navHeight: 64,
};

const layout = {
  color1: 'tomato',
  color2: 'white',
};

const App: React.FC = () => {
  const auth = useAuth();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false); // State to control the sidebar

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <Box sx={{}}>
      <Box sx={{ height: layoutParams.navHeight }} component="nav">
        <NavBar toggleSideBar={toggleSideBar}/>
      </Box>
      <Box
        style={{
          display: 'flex',
          height: `calc(100vh - ${layoutParams.navHeight}px)`,
          width: '100%',
        }}
      >
        {/* Pass the open state and onClose callback to the SideBar */}
        <SideBar open={isSideBarOpen} onClose={toggleSideBar} />

        <Box sx={{ height: '100%', width: "100%" }} component="section">
          <Routes>
            <Route index element={Paths.Component} />
            {Paths.Subpaths.map((path) => getPathRoutes(path, '/', true))}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
