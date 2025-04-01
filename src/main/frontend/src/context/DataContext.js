import { createContext, useState, useEffect, useCallback } from "react";
import API from "../config";
import api from "../api/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [jwt, setJwt] = useState(localStorage.getItem('jwt'));

    const defaultSortValue = 'rating'; // 기본 값
    const [sortValue, setSortValue] = useState(defaultSortValue); // 상태에서만 관리

    const [productList, setProductList] = useState([]);
    const [farmList, setFarmList] = useState([]);
    const [groupProductList, setGroupProductList] = useState([]);
    const [auctionList, setAuctionList] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetchProductList를 useCallback으로 감싸서 메모이제이션
    const fetchProductList = useCallback(async () => {
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
    }, [sortValue]); // sortValue가 변경되면 새로 정의되도록 의존성 추가

    // fetchFarmList를 useCallback으로 감싸서 메모이제이션
    const fetchFarmList = useCallback(async () => {
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
    }, [sortValue]); // sortValue가 변경되면 새로 정의되도록 의존성 추가

    const fetchGroupProductList = useCallback(async () => {
        try {
            const res = await api.get(API.ALLGROUPPRODUCT, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            });
            setGroupProductList(res.data.result.productList);
        } catch (error) {
            console.error('Error fetching groupProduct: ', error);
        }
    }, []);

    const fetchAuctionList = useCallback(async () => {
        try {
            const res = await api.get(API.ALLAUCTION, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
                withCredentials: true
            });
            setAuctionList(res.data.result.productList);
            console.log(res.data.result.productList);
        } catch (error) {
            console.error('Error fetching auction list: ', error);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setJwt(token);
        }
    }, []);

    useEffect(() => {
        if (jwt) {
            fetchProductList();
            fetchFarmList();
            fetchGroupProductList();
            fetchAuctionList();
        } else {
            console.warn('JWT token is missing or invalid.');
        }
        setLoading(false);
    }, [jwt, fetchProductList, fetchFarmList, fetchGroupProductList, fetchAuctionList]);

    useEffect(() => {
        fetchFarmList();
        fetchProductList();
    }, [sortValue, fetchFarmList, fetchProductList]);

    useEffect(() => {
        // 페이지 이동 시 sortValue를 기본값으로 설정
        setSortValue(defaultSortValue);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('jwt');
            setJwt(token);  // ✅ localStorage 변경 감지 후 jwt 업데이트
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DataContext.Provider
            value={{
                productList,
                farmList,
                groupProductList,
                auctionList,
                fetchProductList,
                fetchFarmList,
                setSortValue,
                fetchGroupProductList,
                fetchAuctionList
            }}>
            {children}
        </DataContext.Provider>
    );
};
