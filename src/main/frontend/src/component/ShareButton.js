import React from "react";
import { FiShare2 } from "react-icons/fi";
import { toast } from "react-hot-toast"; // 알림 메시지 표시 (선택 사항)

const ShareButton = () => {
    const handleCopyLink = async () => {
        try {
            const currentUrl = window.location.href; // 현재 페이지의 URL 가져오기
            await navigator.clipboard.writeText(currentUrl); // URL 복사
            toast.success("링크가 복사되었습니다!"); // 성공 메시지 표시
        } catch (error) {
            toast.error("링크 복사에 실패했습니다. 다시 시도해주세요."); // 에러 메시지 표시
        }
    };

    return (
        <FiShare2
            size="30"
            style={{ cursor: "pointer" }}
            onClick={handleCopyLink}
        />
    );
};

export default ShareButton;