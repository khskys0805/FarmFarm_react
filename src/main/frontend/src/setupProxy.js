const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware(["/user", "/product", "/events", "/farm", "/order", "/pay", "/enquiry", "/review", "/mypage"], {
            // target: "http://52.79.161.101:9000",
            // target: "http://localhost:9000",
            target: "https://back.farm-farm.store",
            changeOrigin: true,
        })
    );
};
