import React from "react";
import { Box, Typography } from "@mui/material";

const Banner = () => {
    return (
        <React.Fragment>
            <Box
                sx={{
                    position: "absolute",
                    top: "-70px",
                    width: "100%",
                    minHeight: 180,
                    backgroundColor: "primary.dark",
                    borderRadius: "10px",
                    color: "#fff",
                    zIndex: 0,
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
            />
            <Box sx={{ position: "relative", height: 90, margin: "0 10px" }}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "80%",
                        width: "100%",
                        minHeight: 50,
                        backgroundColor: "#fff",
                        borderRadius: "10px",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        padding: "15px",
                        fontSize: "14px",
                    }}
                >
                    <Typography variant="div" fontWeight={600} sx={{ fontSize: "14px" }}>
                        Họ & tên: &nbsp;
                    </Typography>
                    <Typography variant="div" fontWeight={400} sx={{ fontSize: "14px" }}>
                        AMin Mohamad
                    </Typography>
                    <br />
                    <Typography variant="div" fontWeight={600} sx={{ fontSize: "14px" }}>
                        Đơn vị: &nbsp;
                    </Typography>
                    <Typography variant="div" fontWeight={400} sx={{ fontSize: "14px" }}>
                        IT - Software
                    </Typography>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default Banner;
