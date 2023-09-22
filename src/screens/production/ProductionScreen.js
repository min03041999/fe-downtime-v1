import React from "react";
import LoginScreen from "../LoginScreen";
import SideBar from "../../components/SideBar";
import RoutesProdution from "../../config/RoutesProdution";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useSelector } from "react-redux";

const ProductionScreen = () => {
    const auth = useSelector((state) => state.auth);
    const sideBarMenu = [
        {
            icon: <NotificationsNoneIcon />,
            text: "Thông báo máy hư",
            path: "/product",
        },
        {
            icon: <AutorenewIcon />,
            text: "Trạng thái xử lý",
            path: "/product/status",
        },
    ];

    return (
        <React.Fragment>
            {auth.user !== null && auth.user?.permission === 3 ? (
                <SideBar sideBarMenu={sideBarMenu}>
                    <RoutesProdution />
                </SideBar>
            ) : (
                <LoginScreen />
            )}
        </React.Fragment>
    );
};

export default ProductionScreen;
