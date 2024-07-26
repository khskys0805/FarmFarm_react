import { createContext, useState, useEffect } from "react";
import axios from "axios";
import API from "../config";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [productList, setProductList] = useState([]);
    const [farmList, setFarmList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProductList = async () => {
        try {
            const res = await axios.get(API.ALLPRODUCT, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
            });
            setProductList(res.data.result.productList);
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

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            fetchProductList();
            fetchFarmList();
        } else {
            console.warn('JWT token is missing or invalid.');
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <DataContext.Provider value={{ productList, farmList, fetchProductList, fetchFarmList }}>
            {children}
        </DataContext.Provider>
    );
};
