import React, { useEffect, useState } from "react";

const DeviceTypeDetector = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();
        const mobileDevices = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/;
        setIsMobile(mobileDevices.test(userAgent));
    }, []);

    return (
        <div>
            {isMobile ? <p>모바일 기기입니다.</p> : <p>PC 또는 태블릿입니다.</p>}
        </div>
    );
};

export default DeviceTypeDetector;