module.exports = function override(config, env) {
    if (env === 'development') {
        // 필요 없다면 devServer 관련 설정을 완전히 제거
        delete config.devServer;
    }

    return config;
};
