module.exports = {
    devServer: {
        client: {
            webSocketURL: null, // 웹소켓 연결 끊기
        },
        hot: false, // 핫 리로딩 비활성화
        liveReload: false, // 라이브 리로딩 비활성화
    },
};
