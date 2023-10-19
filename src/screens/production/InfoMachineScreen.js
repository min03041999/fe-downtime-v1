import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import BreadCrumb from "../../components/BreadCrumb";
import Scanner from "../../components/Scanner";
import Form from "../../components/Form";
import { useSelector } from "react-redux";

const PaperStyle = {
    position: "relative",
    marginTop: "10px",
    padding: "10px",
};

const InfoMachineScreen = () => {
    const auth = useSelector((state) => state.auth);
    const [scannerResult, setScannerResult] = useState("T");

    return (
        <Box component="div">
            <BreadCrumb breadCrumb={"Thông báo máy hư"} />
            <Box
                component="div"
                sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
            >
                <Paper sx={PaperStyle} elevation={5}>
                    {scannerResult !== "" ? (
                        <Form
                            formText="Đơn đề nghị thông báo máy hư"
                            scannerResult={scannerResult}
                            setScannerResult={setScannerResult}
                            user={auth.user}
                        />
                    ) : (
                        <Scanner
                            scanner="Quét mã Bar/QR Code:"
                            scannerResult={scannerResult}
                            setScannerResult={setScannerResult}
                            idMachine={"scanner-product"}
                        />
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default InfoMachineScreen;
