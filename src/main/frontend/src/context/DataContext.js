import { createContext, useState, useEffect } from "react";
import axios from "axios";
import API from "../config";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [productList, setProductList] = useState([]);
    const [farmList, setFarmList] = useState([]);
    const [groupProductList, setGroupProductList] = useState([]);
    const [auctionList, setAuctionList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProductList = async () => {
        try {
            const res = await axios.get(API.ALLPRODUCT, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            });
            console.log(res.data.result.productList);

            const filteredProductList = res.data.result.productList.filter(product => product.productType === 0 || product.productType === 1);
            setProductList(filteredProductList);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };

    const fetchFarmList = async () => {
        try {
            const res = await axios.get(API.ALLFARM, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            });
            setFarmList(res.data.result.farmList);
        } catch (error) {
            console.error('Error fetching farms: ', error);
        }
    };

    const fetchGroupProductList = async () => {
        try {
            const res = await axios.get(API.ALLGROUPPRODUCT, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            });
            setGroupProductList(res.data.result.productList);
        } catch (error) {
            console.error('Error fetching groupProduct: ', error);
        }
    }

    const fetchAuctionList = async () => {
        try {
            const res = await axios.get(API.ALLAUCTION, {
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DataContext.Provider value={{ productList, farmList, groupProductList, auctionList, fetchProductList, fetchFarmList, fetchGroupProductList, fetchAuctionList }}>
            {children}
        </DataContext.Provider>
    );
};
