module.exports = function override(config, env) {
    if (env === 'development') {
        config.devServer = {
            ...config.devServer,
            client: {
                webSocketURL: {
                    hostname: 'farm-farm.store',
                    port: '443', // HTTPS라면 443 포트 사용
                    protocol: 'wss' // 🔥 웹소켓을 보안 연결(wss)로 강제 설정
                }
            }
        };
    }
    return config;
};
