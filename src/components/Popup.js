import React from 'react';
import { Box, Avatar, Typography } from "@mui/material";
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const Popup = (props) => {
    const { statusPopup } = props;

    return (
        <Box component="div"
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#00860d",
                marginTop: "25px"
            }}>
            {
                statusPopup ? (
                    <PopupSuccess />
                ) : (
                    <PopupFail />
                )
            }
        </Box>
    )
}

export default Popup;

const avatarStyle = {
    backgroundColor: "transparent",
    boxShadow: "none",
    width: "60px",
    height: "60px",
};

const contentStyle = {
    color: "#aeaeae",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 400,
    boxSizing: "border-box",
    padding: "0 75px"
}


const PopupSuccess = () => {
    return (
        <>
            <Avatar sx={avatarStyle}> <CheckCircleOutlineRoundedIcon sx={{ color: "#00860d", fontSize: "80px" }} /></Avatar>
            <Typography variant="h6">Hoàn thành</Typography>
            <Typography variant="div" style={contentStyle}>Bạn đã hoàn tất đơn đề nghị thông báo máy hư!</Typography>
        </>
    )
}

const PopupFail = () => {
    return (
        <>
            <Avatar sx={avatarStyle}> <CancelOutlinedIcon sx={{ color: "#d32f2f", fontSize: "80px" }} /></Avatar>
            <Typography variant="h6" sx={{ color: "#d32f2f" }}>Lỗi dữ liệu</Typography>
            <Typography variant="div" style={contentStyle}>Vui lòng làm lại đơn đề nghị hệ thông báo máy hư!</Typography>
        </>
    )
}