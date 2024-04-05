import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TiHome } from "react-icons/ti";
import { SlMenu } from "react-icons/sl";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import styles from './TabBar.module.css';

const TabBar = ({ Authorization }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 위치에 따라 활성 탭 설정
    const [activeTab, setActiveTab] = useState(getActiveTab(location.pathname));

    // 경로에 따라 활성 탭을 반환하는 함수
    function getActiveTab(pathname) {
        if (pathname === '/home') return 'home';
        if (pathname === '/menu') return 'menu';
        if (pathname === '/search') return 'search';
        if (pathname === '/cart') return 'cart';
        if (pathname === '/myPage') return 'myPage';
        return '';
    }

    // 탭 클릭 시 해당 탭으로 이동 및 활성 탭 설정
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
        navigate(`/${tabName}`);
    };

    return (
        <div className={styles.tab}>
            <div className={styles.bar}>
                <button onClick={() => handleTabClick('home')}>
                    <TiHome style={{ fontSize: '20px', color: activeTab === 'home' ? '#000' : '#d9d9d9' }}/>
                </button>
                <button onClick={() => handleTabClick('menu')}>
                    <SlMenu style={{ fontSize: '20px', color: activeTab === 'menu' ? '#000' : '#d9d9d9' }}/>
                </button>
                <button onClick={() => handleTabClick('search')}>
                    <HiMiniMagnifyingGlass style={{ fontSize: '20px', color: activeTab === 'search' ? '#000' : '#d9d9d9' }}/>
                </button>
                <button onClick={() => handleTabClick('cart')}>
                    <FaShoppingCart style={{ fontSize: '20px', color: activeTab === 'cart' ? '#000' : '#d9d9d9' }}/>
                </button>
                <button onClick={() => handleTabClick('myPage')}>
                    <img src="https://farmfarm-bucket.s3.ap-northeast-2.amazonaws.com/7cc20134-7565-44e3-ba1d-ae6edbc213e5.png" alt="" style={{ borderRadius: '50%', width: '25px', height: '25px'}} />
                </button>
            </div>
        </div>
    );
};

export default TabBar;
