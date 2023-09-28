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
      New: "/new",
      Home: {
        Base: "/:userHomeId",
        Rooms: {
          Base: "/rooms",
          Room: {
            Base: "/:userRoomId",
            Devices: {
              Base: "/devices",
              New: "/new",
              Device: {
                Base: "/:userDeviceId",
              },
            },
          },
        }
      },
    },
    Addresses: {
      Base: "/addresses",
      Address: {
        Base: "/:addressId",
      },
    },
    Orders: {
      Base: "/orders",
      Order: {
        Base: "/:orderId",
      },
    },
    Payments: {
      Base: "/payments",
      Payment: {
        Base: "/:paymentId",
      },
    },
    Cart: {
      Base: "/cart",
    },
  },
  Products: {
    Base: "/products",
    Product: {
      Base: "/:productId",
    },
    Categories: {
      Base: "/categories",
      Category: {
        Base: "/:categoryId",
      },
    },
    Discounts: {
      Base: "/discounts",
      Discount: {
        Base: "/:discountId",
      },
    },
    Inventories: {
      Base: "/inventories",
      Inventory: {
        Base: "/:inventoryId",
      },
    },
  },
  Devices: {
    Base: "/devices",
    Device: {
      Base: "/:deviceId",
    },
  },
};

// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
