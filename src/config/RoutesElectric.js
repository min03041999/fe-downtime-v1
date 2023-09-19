import React from "react";
import { Routes, Route } from "react-router-dom";
import InfoUserScreen from "../screens/electric/InfoUserScreen";

const RoutesElectric = () => {
    return (
        <Routes>
            <Route path="/" element={<InfoUserScreen />} />
        </Routes>
    );
};

export default RoutesElectric;