import "./styles.css";
import React, { useEffect } from "react";
import UserApiData from "./components/UserApiData";
import { Contextprovider } from "./components/contextProvider";
import UserDirectory from "./components/UserDirectory";
import NavNewUser from "./components/navNewUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProviderCustom } from "./components/themeContext";
import PaginationHome from "./components/pages/PaginationHome";
import InfiniteScroll from "./components/pages/InfiniteCSroll";
export default function App() {
  return (
    <ThemeProviderCustom>
      <Contextprovider>
        <UserApiData />
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PaginationHome />} />
              <Route path="/infinite" element={<InfiniteScroll />} />
            </Routes>
          </BrowserRouter>
        </div>
      </Contextprovider>
    </ThemeProviderCustom>
  );
}
