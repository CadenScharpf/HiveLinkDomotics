import React, { useImperativeHandle } from "react";
import Login from "../../public/Login";
import Profile from "../../user/Profile";
import Landing from "../../public/Landing";
import Register from "../../public/Register";
import UserLayout from "../../user/UserLayout";
import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/route/ProtectedRoute";
import Products from "../../public/Products";
import DevicesLayout from "../../user/devices/DevicesLayout";
import AddDevice, {
  AddLightDevice,
  AddPlugDevice,
  AddSwitchDevice,
} from "../../user/devices/AddDevice";
import Routines from "../../user/routines/Routines";
import Plugs from "../../user/devices/SmartPlug/Plugs";
import Switches from "../../user/devices/SmartSwitch/Switches";
import Lights from "../../user/devices/SmartLight/Lights";
import { user } from "hive-link-common";
import HomesLayout from "../../user/homes/HomesLayout";
import HomeLayout from "../../user/homes/home/HomeLayout";
import NewHome from "../../user/homes/home/NewHome";
/* Roles: 
- -1: public
-  0: user
-  1: admin 
*/

export interface IPath {
  Base: string;
  Title?: string;
  Roles: number[];
  Component: React.ReactElement;
  Subpaths: IPath[];
}

const Paths: IPath = {
  Base: "/",
  Roles: [],
  Component: <Landing />, // should redirect to user dashboard if logged in
  Subpaths: [
    {
      Base: "login",
      Roles: [],
      Component: <Login />,
      Subpaths: [],
    },
    {
      Base: "register",
      Roles: [],
      Component: <Register />,
      Subpaths: [],
    },
    {
      Base: "user",
      Title: "Hive-Link App",
      Roles: [0, 1],
      Component: <UserLayout path="" />,
      Subpaths: [
        {
          Base: "profile",
          Roles: [0, 1],
          Component: <Profile />,
          Subpaths: [],
        },
        {
          Base: "homes",
          Title: "My Homes",
          Roles: [0, 1],
          Component: <HomesLayout path="" />,
          Subpaths: [
            {
              Base: ":homeId",
              Title: "Home Dashboard",
              Roles: [0, 1],
              Component: <HomeLayout path="" />,
              Subpaths: [
                {
                  Base: "devices",
                  Title: "Devices",
                  Roles: [0, 1],
                  Component: <DevicesLayout path="" />,
                  Subpaths: [
                    {
                      Base: "new",
                      Roles: [0, 1],
                      Component: <AddDevice path="" />,
                      Subpaths: [
                        {
                          Base: "plug",
                          Roles: [0, 1],
                          Component: <AddPlugDevice path="" />,
                          Subpaths: [],
                        },
                        {
                          Base: "switch",
                          Roles: [0, 1],
                          Component: <AddSwitchDevice path="" />,
                          Subpaths: [],
                        },
                        {
                          Base: "light",
                          Roles: [0, 1],
                          Component: <AddLightDevice path="" />,
                          Subpaths: [],
                        },
                      ],
                    },
                    {
                      Base: "plugs",
                      Roles: [0, 1],
                      Component: <Plugs path="" />,
                      Subpaths: [],
                    },
                    {
                      Base: "switches",
                      Roles: [0, 1],
                      Component: <Switches path="" />,
                      Subpaths: [],
                    },
                    {
                      Base: "lights",
                      Roles: [0, 1],
                      Component: <Lights path="" />,
                      Subpaths: [],
                    }
                  ],
                },
                {
                  Base: "routines",
                  Title: "Routines",
                  Roles: [0, 1],
                  Component: <Routines path=""></Routines>,
                  Subpaths: [],
                }],
            },
            {
              Base: "new",
              Roles: [0, 1],
              Component: <NewHome path="" />,
              Subpaths: [],
            }
          ]
        }
      ],
    },
    {
      Base: "products",
      Roles: [],
      Component: <Products path="" />,
      Subpaths: [],
    },
  ],
};
export function getAbsPath(base: string): string {
  const path = getPathObject(base);
  return path? path.Base : "";
}
export function getPathObject(base: string): IPath | null {
  return getPathObjectAcc(base, Paths);
}
function getPathObjectAcc(base: string, path: IPath): IPath | null {
  if (path.Base === base) {
    return path;
  }

  for (const subpath of path.Subpaths) {
    const res = getPathObjectAcc(base, subpath);
    if (res) {
      return res; 
    }
  }
  return null; // Return null if the path is not found
}

/*
* Returns the subpaths of a path that are accessible to a user with a given role
* @param base: the base path to get the subpaths of
* @param role: the role of the user
* @param exclude: the paths to exclude from the returned list
*/
export function getFilteredSubpaths(base: string, role: user["role"], exclude: string[]): IPath[] {
  const path = getPathObject(base);
  if (!path) {
    return [];
  }
  return path.Subpaths.filter((path: IPath) => {
    return ( path.Roles.length===0 || path.Roles.includes(role)) && !exclude.includes(path.Base);
  });
}
export const getPathRoutes = (
  path: IPath,
  parentRoute: string,
  protect?: boolean
): React.ReactElement => {
  const absPath = parentRoute + path.Base;
  return (
    <Route
      path={path.Base}
      key={absPath + " route"}
      element={
         (
          <ProtectedRoute key={absPath + " component"} roles={path.Roles}>
            {React.cloneElement(path.Component, { path: absPath })}
          </ProtectedRoute>
        )
      }
    >
      {path.Subpaths.map((subpath) => getPathRoutes(subpath, absPath + "/"))}
    </Route>
  );
};

export function templatePath(path: string, params: Record<string, string>): string {
  let newPath = path;
  for (const [key, value] of Object.entries(params)) {
    newPath = newPath.replace(`:${key}`, value);
  }
  return newPath;
}

export default Paths;
