import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TiHome } from "react-icons/ti";
import { SlMenu } from "react-icons/sl";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import styles from './TabBar.module.css';

const TabBar = ({ Authorization }) => {
    const [activeTab, setActiveTab] = useState(null);
    const navigate = useNavigate();
    const tabLinksRef = useRef([]);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleMyPageClick = () => {
        axios.post('/myPage', {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Authorization
            }
        })
            .then(response => {
                console.log(response.data);
                navigate(`/maPage`);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className={styles.tab}>
            <div className={styles.bar}>
                <button ref={(el) => tabLinksRef.current[0] = el} className={`tab-link ${activeTab === 0 && 'active'}`} onClick={() => handleTabClick(0)}>
                    <TiHome style={{ fontSize: '20px' }}/>
                </button>
                <button ref={(el) => tabLinksRef.current[1] = el} className={`tab-link ${activeTab === 1 && 'active'}`} onClick={() => handleTabClick(1)}>
                    <SlMenu style={{ fontSize: '20px' }}/>
                </button>
                <button ref={(el) => tabLinksRef.current[2] = el} className={`tab-link ${activeTab === 2 && 'active'}`} onClick={() => handleTabClick(2)}>
                    <HiMiniMagnifyingGlass style={{ fontSize: '20px' }}/>
                </button>
                <button ref={(el) => tabLinksRef.current[3] = el} className={`tab-link ${activeTab === 3 && 'active'}`} onClick={() => handleTabClick(3)}>
                    <FaShoppingCart style={{ fontSize: '20px' }}/>
                </button>
                <button ref={(el) => tabLinksRef.current[4] = el} className={`tab-link ${activeTab === 4 && 'active'}`} onClick={handleMyPageClick}>
                    <img src="https://farmfarm-bucket.s3.ap-northeast-2.amazonaws.com/7cc20134-7565-44e3-ba1d-ae6edbc213e5.png" className="user-media" alt="" style={{ borderRadius: '50%', width: '25px', height: '25px' }} />
                </button>
            </div>
        </div>
    );
};

export default TabBar;