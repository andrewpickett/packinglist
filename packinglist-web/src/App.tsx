import {useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import Login from "./components/login/Login.tsx";
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";
import AccountCreate from "./components/account/AccountCreate.tsx";
import ListDetail from "./components/account/ListDetail.tsx";
import ListCreate from "./components/account/ListCreate.tsx";
import Account from "./components/account/Account.tsx";
import Home from "./components/home/Home.tsx";
import MyHome from "./components/account/MyHome.tsx";

import {check_token} from "./utils/auth.tsx";

import './App.scss';
import ListEdit from "./components/account/ListEdit.tsx";

const ProtectedRoute = ({children}: { children: any }): any => {
   const isAuthenticated = check_token() !== null;

   if (!isAuthenticated) {
      sessionStorage.setItem("redirect_url", window.location.pathname);
      return <Navigate to={"/login"} replace />;
   }
   return children;
};

function App() {
   const [loggedIn, setLoggedIn] = useState<boolean>(check_token() !== null);

   const loginFunc = (): void => {
      setLoggedIn(true);
      let redir_url: string = sessionStorage.getItem("redirect_url") === null ? "/home" : "" + sessionStorage.getItem("redirect_url");
      sessionStorage.removeItem("redirect_url");
      window.location.href = redir_url;
   };

   return (
      <div className={"container"}>
         <Header loggedIn={loggedIn} />
         <main className={"flex-shrink-0 py-5 my-5"}>
            <div className={"container"}>
               <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/login" element={<Login login={loginFunc} />} />
                  <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>} />
                  <Route path="/account/create" element={<AccountCreate login={loginFunc} />} />

                  <Route path="/home" element={<ProtectedRoute><MyHome/></ProtectedRoute>}/>
                  <Route path="/list/create" element={<ProtectedRoute><ListCreate /></ProtectedRoute>} />
                  <Route path="/list/:listId" element={<ProtectedRoute><ListDetail /></ProtectedRoute>} />
                  <Route path="/list/:listId/edit" element={<ProtectedRoute><ListEdit /></ProtectedRoute>} />
               </Routes>
            </div>
         </main>
         <Footer />
      </div>
   );
}

export default App;
