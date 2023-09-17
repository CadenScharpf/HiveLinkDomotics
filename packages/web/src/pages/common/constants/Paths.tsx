import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "../../../components/route/ProtectedRoute";
import { user } from "hive-link-common";
import Landing from "../../public/Landing";
import Login from "../../public/Login";
import Register from "../../public/Register";
import UserLayout from "../../user/UserLayout";
import Profile from "../../user/Profile";
import HomesLayout from "../../user/homes/HomesLayout";
import HomeLayout from "../../user/homes/home/HomeLayout";
import NewHome from "../../user/homes/NewHome";
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
import Products from "../../public/Products";

export interface IPathConfig {
  Base: string;
  Title?: string;
  Roles: number[];
  Component: React.ComponentType<{ path: string }>;
  Subpaths: IPathConfig[];
}

export interface IPath extends IPathConfig {
  Location: string;
  Subpaths: IPath[];
}

const pathConfig: IPathConfig = {
  Base: "/",
  Roles: [],
  Component: Landing, // Use the component type, not an instance
  Subpaths: [
    {
      Base: "login",
      Roles: [],
      Component: Login, // Use the component type, not an instance
      Subpaths: [],
    },
    {
      Base: "register",
      Roles: [],
      Component: Register, // Use the component type, not an instance
      Subpaths: [],
    },
    {
      Base: "user",
      Title: "Hive-Link App",
      Roles: [0, 1],
      Component: UserLayout,
      Subpaths: [
        {
          Base: "profile",
          Roles: [0, 1],
          Component: Profile,
          Subpaths: [],
        },
        {
          Base: "homes",
          Title: "My Homes",
          Roles: [0, 1],
          Component: HomesLayout,
          Subpaths: [
            {
              Base: ":userHomeId",
              Title: "Home Dashboard",
              Roles: [0, 1],
              Component: HomeLayout,
              Subpaths: [
                {
                  Base: "devices",
                  Title: "Devices",
                  Roles: [0, 1],
                  Component: DevicesLayout,
                  Subpaths: [
                    {
                      Base: "new",
                      Roles: [0, 1],
                      Component: AddDevice,
                      Subpaths: [
                        {
                          Base: "plug",
                          Roles: [0, 1],
                          Component: AddPlugDevice,
                          Subpaths: [],
                        },
                        {
                          Base: "switch",
                          Roles: [0, 1],
                          Component: AddSwitchDevice,
                          Subpaths: [],
                        },
                        {
                          Base: "light",
                          Roles: [0, 1],
                          Component: AddLightDevice,
                          Subpaths: [],
                        },
                      ],
                    },
                    {
                      Base: "plugs",
                      Roles: [0, 1],
                      Component: Plugs,
                      Subpaths: [],
                    },
                    {
                      Base: "switches",
                      Roles: [0, 1],
                      Component: Switches,
                      Subpaths: [],
                    },
                    {
                      Base: "lights",
                      Roles: [0, 1],
                      Component: Lights,
                      Subpaths: [],
                    },
                  ],
                },
                {
                  Base: "routines",
                  Title: "Routines",
                  Roles: [0, 1],
                  Component: Routines,
                  Subpaths: [],
                },
              ],
            },
            {
              Base: "new",
              Roles: [0, 1],
              Component: NewHome,
              Subpaths: [],
            },
          ],
        },
      ],
    },
    {
      Base: "products",
      Roles: [],
      Component: Products,
      Subpaths: [],
    },
  ],
};

const Paths = exportPaths(pathConfig, "");

//Utility Functions

function exportPaths(pathConfig: IPathConfig, parentLoc: string): IPath {
  const path: IPath = {
    Base: pathConfig.Base,
    Location: parentLoc + pathConfig.Base,
    Roles: pathConfig.Roles,
    Component: pathConfig.Component,
    Subpaths: []
  }
  path.Subpaths = pathConfig.Subpaths.map((subPath) => {
    return exportPaths(subPath,path.Location)
  })
  return path;
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
  const Component = path.Component; // Get the component type
  return (
    <Route
      path={path.Base}
      key={absPath + " route"}
      element={
        <ProtectedRoute key={absPath + " component"} roles={path.Roles}>
          {/* Instantiate the component here */}
          <Component path={absPath} />
        </ProtectedRoute>
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

export default Paths as IPath;
