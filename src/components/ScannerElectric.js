import React from 'react';
import Scanner from "./Scanner";
import ScannerInfo from "./ScannerInfo";
import AlertDialog from "./AlertDialog";
import {
    Box,
    Button,
    Stack,
} from "@mui/material";

import { useDispatch } from "react-redux";
import {
    scanner_fix_mechanic,
    get_work_list_report_employee,
    setErrorCode,
} from "../redux/features/electric";

const ScannerElectric = (props) => {
    const dispatch = useDispatch();
    const { isCheck, idMachine, open, setOpen, scannerResult, setScannerResult, user } =
        props;

    const onReScanner = () => {
        setScannerResult("");
    };

    const onSubmit = async () => {
        const id_machine = idMachine;
        const { user_name, factory, lean } = user;
        const id_user_mechanic = user_name;

        if (id_machine === scannerResult) {
            await dispatch(
                scanner_fix_mechanic({ id_user_mechanic, id_machine, factory, lean })
            );
            await dispatch(
                get_work_list_report_employee({ id_user_mechanic, factory })
            );
            setScannerResult("");
            setOpen(false);
        } else {
            dispatch(setErrorCode(10001, "Mã QRCode/BarCode không trùng khớp!"));
        }
    };



    return (
        <>
            {
                isCheck &&
                <AlertDialog
                    open={open}
                    setOpen={setOpen}
                    headerModal={"Thợ sửa - Tiếp nhận từ yêu cầu sản xuất"}
                >
                    <Box
                        component="div"
                        sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
                    >
                        {scannerResult !== "" ? (
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
                                        onClick={onSubmit}
                                    >
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
                                idMachine={idMachine}
                                scanner="Quét mã Bar/QR Code:"
                                scannerResult={scannerResult}
                                setScannerResult={setScannerResult}
                            />
                        )}
                    </Box>
                </AlertDialog>
            }</>

    );
}

export default ScannerElectric;