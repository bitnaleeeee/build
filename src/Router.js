import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import "./styles/reset.scss";
import "./styles/global.scss";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/build" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
