import { createContext, useState, useEffect } from "react";
import API from "../config";
import api from "../api/api";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [productList, setProductList] = useState([]);
    const [farmList, setFarmList] = useState([]);
    const [groupProductList, setGroupProductList] = useState([]);
    const [auctionList, setAuctionList] = useState([]);
    const [sortValue, setSortValue] = useState('rating');
    const [loading, setLoading] = useState(true);

    const fetchProductList = async () => {
        try {
            const res = await api.get(API.ALLPRODUCT, {
                params: { sort: sortValue },
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
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
