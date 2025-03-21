import { createContext, useState, useEffect } from "react";
import API from "../config";
import api from "../api/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const defaultSortValue = 'rating'; // 기본 값
    const [sortValue, setSortValue] = useState(defaultSortValue); // 상태에서만 관리

    const [productList, setProductList] = useState([]);
    const [farmList, setFarmList] = useState([]);
    const [groupProductList, setGroupProductList] = useState([]);
    const [auctionList, setAuctionList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProductList = async () => {
        try {
            const res = await api.get(API.ALLPRODUCT, {
                params: { sort: sortValue },
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            });
            console.log(res.data.result.productList);

            const filteredProductList = res.data.result.productList
                .filter(product => product.productType === 0 || product.productType === 1);
            setProductList(filteredProductList);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };

    const fetchFarmList = async () => {
        try {
            const res = await api.get(API.ALLFARM, {
                params: { sort: sortValue },
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            });
            setFarmList(res.data.result.farmList);
            console.log(res.data.result.farmList);
        } catch (error) {
            console.error('Error fetching farms: ', error);
        }
    };

    const fetchGroupProductList = async () => {
        try {
            const res = await api.get(API.ALLGROUPPRODUCT, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            });
            setGroupProductList(res.data.result.productList);
        } catch (error) {
            console.error('Error fetching groupProduct: ', error);
        }
    }

    const fetchAuctionList = async () => {
        try {
            const res = await api.get(API.ALLAUCTION, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            });
            setAuctionList(res.data.result.productList);
            console.log(res.data.result.productList);
        } catch (error) {
            console.error('Error fetching groupProduct: ', error);
        }
    }

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            fetchProductList();
            fetchFarmList();
            fetchGroupProductList();
            fetchAuctionList();
        } else {
            console.warn('JWT token is missing or invalid.');
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchFarmList();
        fetchProductList();
    }, [sortValue]); // sortValue가 변경될 때마다 실행

    useEffect(() => {
        // 페이지 이동 시 sortValue를 기본값으로 설정
        setSortValue(defaultSortValue);
    }, []); // 빈 배열을 넣어서 페이지가 처음 로드될 때만 실행

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DataContext.Provider
            value={{ productList, farmList, groupProductList, auctionList,
                fetchProductList, fetchFarmList, setSortValue,
                fetchGroupProductList, fetchAuctionList }}>
            {children}
        </DataContext.Provider>
    );
};
