import React, { useState } from "react";
import LoginScreen from "../LoginScreen";
import SideBar from "../../components/SideBar";
import RoutesProdution from "../../config/RoutesProdution";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const ProductionScreen = () => {
    const [login, setLogin] = useState(false);
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
            {login === false ? (
                <LoginScreen setLogin={setLogin} />
            ) : (
                <SideBar sideBarMenu={sideBarMenu}>
                    <RoutesProdution />
                </SideBar>
            )}
        </React.Fragment>
    )
}

export default ProductionScreen;