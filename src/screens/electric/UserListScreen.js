import React from 'react';
import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell } from '@mui/material';
import BreadCrumb from "../../components/BreadCrumb";

const PaperStyle = {
    position: "relative",
    marginTop: "10px",
    padding: "10px",
};

const UserlistScreen = () => {
    return (
        <Box component="div">
            <BreadCrumb breadCrumb={"Danh sách nhân viên"} />
            <Box
                component="div"
                sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
            >
                <Paper sx={PaperStyle} elevation={5}>

                </Paper>
            </Box>
        </Box>
    )
}

export default UserlistScreen;