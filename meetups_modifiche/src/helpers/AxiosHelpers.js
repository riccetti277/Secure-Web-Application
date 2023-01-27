import axios from "axios";

import React, { useEffect } from "react";
import keycloak from '../keycloak';

var axiosInstance = axios.create();



function KeycloakToken(){

        if(keycloak.authenticated){
            const tok = keycloak.token;
            return tok;  
        }
        else{
            return null;
        }
  
}

axiosInstance.interceptors.request.use(

    config => {

        const token = KeycloakToken();
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },

    error => {
        Promise.reject(error)
    });

axiosInstance.interceptors.response.use((response) => {
    return response
}, function(error){
    return Promise.reject(error);
});

export default axiosInstance;