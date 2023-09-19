import React from 'react';
import { Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import BreadCrumb from '../../components/BreadCrumb';
import Title from '../../components/Title';

const PaperStyle = {
    position: "relative",
    marginTop: "10px",
    padding: "10px",
};

const WorkListScreen = () => {

    const rows = [
        { id: 1, machine: 'May-1', content: 'đứt dây điện', user: "Nguyen Van A" },
        { id: 2, machine: 'May-2', content: 'máy lỗi, không hoạt động được', user: "Nguyen Van B" },
        { id: 3, machine: 'May-3', content: 'máy không mở được', user: "Nguyen Van C" },
    ];

    return (
        <Box component="div">
            <BreadCrumb breadCrumb={"Danh sách công việc"} />
            <Box
                component="div"
                sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
            >
                <Paper sx={PaperStyle} elevation={5}>
                    <Title titleText={"Danh sách công việc"} />
                    <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold", minWidth: "170px" }}>
                                        Mã Máy
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", minWidth: "170px" }}>
                                        Nội dung
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", minWidth: "170px" }}>
                                        Người yêu cầu
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                    >
                                        <TableCell component="th" scope="row">
                                            {row.machine}
                                        </TableCell>
                                        <TableCell >
                                            {row.content}
                                        </TableCell>
                                        <TableCell >
                                            {row.user}
                                        </TableCell>
                                        <TableCell >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                Giao phó
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </Box>
    )
}

export default WorkListScreen;