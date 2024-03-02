export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  USER: {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    PRODUCT_LIST: "/products",
    PRODUCT_DETAIL: "/products/:id",
    CART: "/cart",
    CHECKOUT: "/checkout",
    PAYMENTSUCCESS: "/paymentsuccess",
    TO_DO_LIST: "/to-do-list",
    // profile
    PROFILE: "/profile",
    USER_INFO: "/profile/user-info",
    ORDER_HISTORY: "/profile/order-history",
    FAVORITE_PRODUCTS: "/profile/favorite-products",
    CHANGE_PASSWORD: "/profile/change-password",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCT_MANAGE: "/admin/products",
    CREATE_PRODUCT: "/admin/products/create",
    UPDATE_PRODUCT: "/admin/products/:id/update",
    USER_MANAGE: "/admin/users",
  },
};
