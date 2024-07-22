import { createContext, useState, useEffect } from "react";
import axios from "axios";
import API from "../config";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [productList, setProductList] = useState([]);
    const [farmList, setFarmList] = useState([]);

    const fetchProductList = () => {
        axios.get(API.ALLPRODUCT, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log(res.data.result);
                setProductList(res.data.result.productList);
            })
            .catch((error) => {
                console.error('Error fetching products: ', error);
            });
    };

    const fetchFarmList = () => {
        axios.get(API.ALLFARM, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                console.log(res.data.result);
                setFarmList(res.data.result.farmList);
            })
            .catch((error) => {
                console.error('Error fetching farms: ', error);
            });
    };

    useEffect(() => {
        fetchProductList();
        fetchFarmList();
    }, []);

    return (
        <DataContext.Provider value={{ productList, farmList, fetchProductList, fetchFarmList }}>
            {children}
        </DataContext.Provider>
    );
};
