import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import HiveIcon from "@mui/icons-material/Hive";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import GradeIcon from "@mui/icons-material/Grade";

import BetterBuisnessIcon from "./bbb.png";
import HomeAdvisorIcon from "./HomeAdvisor.png";
import { IRouteProps } from "../../common/types/IRouteProps";
import NavBar from "../../../components/nav/NavBar";
import SideBar from "../../../components/nav/SideBar";


function Landing(props: IRouteProps) {
  const { path } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false); // State to control the sidebar

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  
  return (
    <>
    <SideBar open={isSideBarOpen} onClose={toggleSideBar} />
    <NavBar toggleSideBar={toggleSideBar} />
    {location.pathname === props.path? (
    <Box sx={{ width: "100%", height: "100%" }}>
      {path}
      {location.pathname}
      <Box
        component="section"
        sx={{ width: "100%", height: "100vh", overflow: "scroll" }}
      >
        <Box
          sx={{
            ...styles.section1Header,
            height: `calc(100% - ${config.section1.footerHeightPercentage}%)`,
          }}
        >
          <Box sx={{ ...styles.videoScrim }}>
            <HiveIcon sx={{ fontSize: "3rem" }} />
            <Typography variant="h4"> Home Automation </Typography>
            <Typography variant="h5">The Easy Way</Typography>
            <Typography variant="caption" sx={{color: '#E9AB17', marginTop: 4}}>
              Envision a world of luxury with effortless control of lights,
              music, security, video, shades and more.{" "}
            </Typography>
          </Box>
          <video muted autoPlay id="landing-clip" style={{ height: '100%'}}>
            <source
              src="/landing_clip.mp4"
              type="video/mp4"
            />
          </video>
        </Box>
        <Box
          sx={{
            height: `${config.section1.footerHeightPercentage}%`,
            background: "#0000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Stack
            direction="row"
            spacing={0.25}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="text" sx={{}}>
              {config.section1.links[0].title}
            </Button>
            {config.section1.links.slice(1).map((link: any) => {
              return (
                <React.Fragment key={"landingS1LinkFragmentTo::" + link.path}>
                  <HiveIcon
                    key={"landingS1LinkSpacerTo::" + link.path}
                    sx={{ height: ".8rem", color: "#E9AB17" }}
                  />
                  <Button
                    key={"landingS1LinkTo::" + link.path}
                    variant="text"
                    sx={{}}
                    onClick={() => navigate(link.path)}
                  >
                    {link.title}
                  </Button>
                </React.Fragment>
              );
            })}
          </Stack>
         
        </Box>
      </Box>
      <Box component={"section"} sx={{ height: "100vh", width: "100%", display: 'none'}}>
         <Stack direction="row" spacing={5}>
            <img
              alt="Better Buisness"
              style={{ height: "75px" }}
              src={BetterBuisnessIcon}
            />
            <img
              alt="Home Advisor"
              style={{ height: "75px" }}
              src={HomeAdvisorIcon}
            />
          </Stack>
      </Box>
    </Box>
  ) : (<Outlet />)}
    </>

  )
}

const config = {
  section1: {
    footerHeightPercentage: 5,
    links: [
      { title: "Smart Home", path: "/solutions/smart-home" },
      { title: "Business Automation", path: "/solutions/business" },
      { title: "Security", path: "/solutions/security" },
      { title: "LED Lighting", path: "/solutions/led-lighting" },
    ],
  },
};

const styles: Record<string, any> = {
  section1Header: {
    width: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    background: "black",
    position: "relative",
  },
  videoScrim: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "25%",
    borderRadius: "25px 25px 0 0",
/*     background: "rgba(31, 31, 31, .5)", */
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    fontWeight: "bold",
    overflow: "hidden",
  },
};

export default Landing;
