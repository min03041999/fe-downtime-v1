import React from "react";
import { Routes, Route } from "react-router-dom";
import WorkListScreen from "../screens/electric/WorkListScreen";
import UserlistScreen from "../screens/electric/UserListScreen";
import InfoUserScreen from "../screens/electric/InfoUserScreen";
import StatusScreen from "../screens/electric/StatusScreen";

const RoutesElectric = () => {
    return (
        <Routes>
            <Route path="/" element={<WorkListScreen />} />
            <Route path="/list-user" element={<UserlistScreen />} />
            <Route path="/user" element={<InfoUserScreen />} />
            <Route path="/status" element={<StatusScreen />} />
        </Routes>
    );
};

export default RoutesElectric;