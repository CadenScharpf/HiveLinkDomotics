/**
 * Express router paths go here.
 */

import { Immutable } from "@src/other/types";

const Paths = {
  Base: "/api",
  Auth: {
    Base: "/auth",
    Me: "/me",
    Login: "/login",
    Logout: "/logout",
    Register: "/register",
  },
  User: {
    Base: "/user",
    Homes: {
      Base: "/homes",
      Home: {
        Base: "/:homeId",
        Devices: {
          Base: "/devices",
          Device: {
            Base: "/:deviceId",
          },
        },
      },
    },
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
