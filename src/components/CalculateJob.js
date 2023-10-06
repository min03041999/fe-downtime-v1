import { Box, Typography } from '@mui/material';
import React from 'react';

const CalculateJobStyle = {
    margin: "5px",
    borderRadius: "30px",
    display: "flex",
    justifyContent: "space-between"
}

const CalculateJobsStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px 0",
    borderRadius: "25px",
    border: "3px solid #ccc",
    width: "49%"
}

const TitleStyle = {
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: "19px",
    textAlign: "center",
}

const ContentStyle = {
    width: "80%",
    height: "70px",
    bgcolor: "primary.dark",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const CalculateJob = ({ totalFix, avgTime }) => {

    return (
        <Box component="div" sx={CalculateJobStyle}>
            <Box sx={CalculateJobsStyle}>
                <Typography variant="h6" component="h6" sx={TitleStyle}>
                    Tổng số <br /> phiếu  đã sửa
                </Typography>
                <Box sx={ContentStyle}>
                    <Typography variant="h3" component="h3" color="white">
                        {totalFix}
                    </Typography>
                </Box>
            </Box>
            <Box sx={CalculateJobsStyle}>
                <Typography variant="h6" component="h6" sx={TitleStyle}>
                    Thời gian <br /> sửa trung bình
                </Typography>
                <Box sx={ContentStyle}>
                    <Typography variant="h3" component="h3" color="white">
                        {avgTime}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default CalculateJob;