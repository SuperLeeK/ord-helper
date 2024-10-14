import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "../pages/index";
import CountTranscendence from "../pages/CountTranscendence";
import OtherPage from "../pages/OtherPage";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ord-helper" element={<CountTranscendence />} />
        <Route path="/about" element={<OtherPage />} />
      </Routes>
    </Router>
  );
};

export default Routers;
