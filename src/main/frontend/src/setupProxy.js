const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware(["/user", "/product"], {
            target: "http://52.79.161.101:9000",
            changeOrigin: true,
        })
    );
};
