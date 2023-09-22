import React from "react";
import LoginScreen from "../LoginScreen";
import SideBar from "../../components/SideBar";
import RoutesElectric from "../../config/RoutesElectric";
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import RecentActorsOutlinedIcon from '@mui/icons-material/RecentActorsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useSelector } from "react-redux";

const ElectricScreen = () => {
    const auth = useSelector((state) => state.auth);

    const sideBarMenu = [
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
    return (
        <React.Fragment>
            {auth.user === null ? (
                <LoginScreen />
            ) : (
                <SideBar sideBarMenu={sideBarMenu}>
                    <RoutesElectric />
                </SideBar>
            )}
        </React.Fragment>
    )
}

export default ElectricScreen;