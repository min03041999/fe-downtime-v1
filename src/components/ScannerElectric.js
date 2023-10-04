import React, { useEffect } from 'react';
import Scanner from "./Scanner";
import AlertDialog from "./AlertDialog";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { scanner_fix_mechanic, setErrorCode } from "../redux/features/electric";

const ScannerElectric = (props) => {
    const dispatch = useDispatch();
    const { isCheck, idMachine, open, setOpen, scannerResult, setScannerResult, user } =
        props;

    useEffect(() => {
        const id_machine = idMachine;
        const { user_name, factory, lean } = user;
        const id_user_mechanic = user_name;
        const status = 3;

        if (id_machine === scannerResult) {
            dispatch(
                scanner_fix_mechanic({ id_user_mechanic, id_machine, factory, lean, status })
            );

            setScannerResult("");
            setOpen(false);
        }

        if (scannerResult !== "" && id_machine !== scannerResult) {
            dispatch(setErrorCode(10001, "Mã QRCode/BarCode không trùng khớp!"));
            setScannerResult("");
        }

    }, [idMachine, dispatch, setScannerResult, scannerResult, setOpen, user])



    return (
        <>
            {
                isCheck && scannerResult === "" &&
                <AlertDialog
                    open={open}
                    setOpen={setOpen}
                    headerModal={"Thợ sửa - Tiếp nhận từ yêu cầu sản xuất"}
                >
                    <Box
                        component="div"
                        sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
                    >
                        <Scanner
                            idMachine={idMachine}
                            scanner="Quét mã Bar/QR Code:"
                            scannerResult={scannerResult}
                            setScannerResult={setScannerResult}
                        />
                    </Box>
                </AlertDialog>
            }
        </>

    );
}

export default ScannerElectric;