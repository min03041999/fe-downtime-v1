import React, { useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Box, Typography } from "@mui/material";

const Scanner = (props) => {
  const { idMachine, scanner, scannerResult, setScannerResult } = props;
  const scannerRef = useRef(null);

  useEffect(() => {
    const scannerInstance = new Html5QrcodeScanner(scannerRef.current, {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    });
    scannerInstance.render(success, error);

    function success(result) {
      scannerInstance.clear();
      setScannerResult(result);
    }

    function error(err) {
      console.log(err);
    }

    // Clean up function
    return () => {
      scannerInstance.clear();
    };
  }, [scannerResult, setScannerResult, idMachine]);

  return (
    <>
      <Typography
        sx={{ fontSize: "14px", fontWeight: "500", marginBottom: "10px" }}
      >
        {scanner}
      </Typography>
      <Box component="div">
        {scannerResult ? (
          <></>
        ) : (
          <Box component="div" ref={scannerRef}></Box>
        )}
      </Box>
    </>
  );
};

export default Scanner;
