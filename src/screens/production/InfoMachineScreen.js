import React, { useState } from "react";
import { Box, Paper, Stack, Button } from "@mui/material";
import BreadCrumb from "../../components/BreadCrumb";
import Scanner from "../../components/Scanner";
import ScannerInfo from "../../components/ScannerInfo";
import Form from "../../components/Form";

const PaperStyle = {
    position: "relative",
    marginTop: "10px",
    padding: "10px",
};

const InfoMachineScreen = () => {
    const [scannerResult, setScannerResult] = useState("");
    const [statusSubmit, setStatusSubmit] = useState(false);

    const onReScanner = () => {
        setScannerResult("");
    };

    const onSubmit = () => {
        setStatusSubmit(true);
    }

    return (
        <Box component="div">
            <BreadCrumb breadCrumb={"Thông báo máy hư"} />
            <Box
                component="div"
                sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
            >
                <Paper sx={PaperStyle} elevation={5}>
                    {scannerResult !== "" ? statusSubmit ? (
                        <Form
                            formText="Đơn đề nghị thông báo máy hư"
                            setStatusSubmit={setStatusSubmit}
                            scannerResult={scannerResult}
                            setScannerResult={setScannerResult}
                        />
                    ) : (
                        <Box component="div">
                            <ScannerInfo
                                scanner="Quét mã Bar/QR Code:"
                                scannerResult={scannerResult}
                            />
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ marginTop: "10px", justifyContent: "center" }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={onSubmit}>
                                    Xác nhận
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={onReScanner}
                                >
                                    Quét lại
                                </Button>
                            </Stack>
                        </Box>
                    ) : (
                        <Scanner
                            scanner="Quét mã Bar/QR Code:"
                            scannerResult={scannerResult}
                            setScannerResult={setScannerResult}
                        />
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default InfoMachineScreen;
