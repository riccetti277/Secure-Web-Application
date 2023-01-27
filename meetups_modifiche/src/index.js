import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak.js"

import './index.css';
import App from './App';
import { FavoritesContextProvider } from './store/favorite-context';




ReactDOM.render(
<ReactKeycloakProvider authClient={keycloak}>
<FavoritesContextProvider>
<BrowserRouter>
<App />
</BrowserRouter>
</FavoritesContextProvider>
</ReactKeycloakProvider>,
document.getElementById('root')
);

