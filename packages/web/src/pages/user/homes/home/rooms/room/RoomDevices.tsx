import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  SxProps,
  Tooltip,
  Typography,
} from "@mui/material";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import _, { set } from "lodash";
import { user_device } from "hive-link-common";
import { IRouteProps } from "../../../../../common/types/IRouteProps";



function RoomDevices(props: IRouteProps ) {
  const navigate = useNavigate();
  const devices = useLoaderData() as user_device[];
  console.log(devices)

  return <>room devices</>
}

// Devices Component Styles
const styles: Record<string, SxProps> = {
  container: {
    width: "100%",
    height: "100%",
    background: "#71797E",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nav: {
    width: "100%",
    background: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};

export default RoomDevices;
