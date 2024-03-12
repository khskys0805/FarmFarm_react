import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

import API from "../../config";

export default function Token() {
    const [serchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(API.LOGINTOKEN(serchParams.get("code")))
            .then((res) => {
                localStorage.setItem("jwt", res.headers.authorization);
                navigate("/home");
            })
            .catch((err) => {
                console.log("로그인을 다시 시도해주세요");
                navigate("/");
            });
    }, []);
}
