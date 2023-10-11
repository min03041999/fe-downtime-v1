import React from "react";
import LoginScreen from "../LoginScreen";
import SideBar from "../../components/SideBar";
import RoutesElectric from "../../config/RoutesElectric";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useSelector } from "react-redux";
import Notification from "../../firebaseNotifications/Notification";

const ElectricScreen = () => {
    const auth = useSelector((state) => state.auth);

    let sideBarMenu = [];
    if (auth.user?.permission === 1) {
        sideBarMenu = [
            {
                icon: <WorkOutlineOutlinedIcon />,
                text: "Danh sách công việc",
                path: "/electric",
            },
            {
                icon: <RecentActorsOutlinedIcon />,
                text: "Danh sách nhân viên",
                path: "/electric/list-user",
            },
            {
                icon: <BadgeOutlinedIcon />,
                text: "Thông tin cá nhân",
                path: "/electric/user",
            },
            {
                icon: <AutorenewIcon />,
                text: "Trạng thái xử lý",
                path: "/electric/status",
            },
        ];
    } else {
        sideBarMenu = [
            {
                icon: <BadgeOutlinedIcon />,
                text: "Thông tin cá nhân",
                path: "/electric/user",
            },
            {
                icon: <AutorenewIcon />,
                text: "Trạng thái xử lý",
                path: "/electric/status",
            },
        ];
    }



    return (
        <React.Fragment>
            {auth.user !== null &&
                (auth.user?.permission === 1 || auth.user?.permission === 2) ? (
                <SideBar sideBarMenu={sideBarMenu} user={auth.user} >
                    <RoutesElectric />
                </SideBar>
            ) : (
                <LoginScreen />
            )}
            <Notification />
        </React.Fragment>
    );
};

export default ElectricScreen;
