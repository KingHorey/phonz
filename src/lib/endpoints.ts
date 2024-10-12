const endpoints = Object.freeze({
  shop: {
    allProduct: "api/products/all-products/",
    oneProduct: `api/products/get-product/`,
  },
  user: {
    login: "api/token/",
    refresh: "api/token/refresh/",
    register: "api/user/auth/register/",
    logout: "api/auth/logout/",
    me: "api/auth/me/",
    profile: "api/user/account/",
  },
});

export default endpoints;
