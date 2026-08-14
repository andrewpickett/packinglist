import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './index.scss';
import App from './App.tsx';
import axios from 'axios';
import {check_token} from "./utils/auth.tsx";

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.baseURL = "http://localhost:8000";
axios.interceptors.request.use(function (config) {
   const token = check_token();
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
}, function (error) {
   return Promise.reject(error);
});

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <BrowserRouter>
         <App/>
      </BrowserRouter>
   </StrictMode>
);
