// config-overrides.js
module.exports = function override(config, env) {
    if (env === 'development') {
        config.devServer = {
            ...config.devServer,
            client: {
                webSocketURL: 'wss://farm-farm.store/ws',
            },
        };
    }
    return config;
};
