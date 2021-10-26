const auth = require("../controllers/auth");
// const { authRefreshToken } = require("../middlewares/authToken.middleware");
// const router = require("express").Router();

const test = () => {
    return {
        test: "oke"
    }
}
module.exports = (app) => {
    app.post("/login", auth.login);
    app.post("/forgot-password", auth.forgotPassword);
    // app.get("/auth/get", test);
    //   router.get("/refresh-token", authRefreshToken, auth.refreshToken);
    //   router.post("/reset-password", auth.resetPassword);
    //   app.use("/api/v1/auth", router);  
};
