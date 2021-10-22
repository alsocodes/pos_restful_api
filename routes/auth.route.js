const auth = require("../controllers/auth");
// const { authRefreshToken } = require("../middlewares/authToken.middleware");
// const router = require("express").Router();

const test = () => {
    return {
        test: "oke"
    }
}
module.exports = (app) => {
    app.post("/auth/login", auth.login);
    // app.get("/auth/get", test);
    //   router.get("/refresh-token", authRefreshToken, auth.refreshToken);
    //   router.post("/forgot-password", auth.forgotPassword);
    //   router.post("/reset-password", auth.resetPassword);
    //   app.use("/api/v1/auth", router);  
};
