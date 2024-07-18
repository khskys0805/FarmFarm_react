import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API from '../config';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [farms, setFarms] = useState([]);

    useEffect(() => {
        axios.get(API.ALLPRODUCT, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                setProducts(res.data.result.productList);
            })
            .catch((error) => {
                console.error('제품을 가져오는 중 오류 발생: ', error);
            });

        axios.get(API.ALLFARM, {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` },
        })
            .then((res) => {
                setFarms(res.data.result.farmList);
            })
            .catch((error) => {
                console.error('농장을 가져오는 중 오류 발생: ', error);
            });
    }, []);

    return (
        <DataContext.Provider value={{ products, farms }}>
            {children}
        </DataContext.Provider>
    );
};
