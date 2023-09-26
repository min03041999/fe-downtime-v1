import React, { useState, useEffect } from "react";
import {
    Box,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import BreadCrumb from "../../components/BreadCrumb";
import Title from "../../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { get_task_damage } from "../../redux/features/electric";
import AlertDialog from "../../components/AlertDialog";

const PaperStyle = {
    position: "relative",
    marginTop: "10px",
    padding: "10px",
};

const TableList = (props) => {
    const columns = [
        {
            field: 'first',
            // headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 140,
        },
        {
            field: 'last',
            // headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            width: 140,
        },
    ];

    const rows = [
        {
            id: 1,
            first: 'Jane',
            last: 'Carter',
        },
        {
            id: 2,
            first: 'Jack',
            last: 'Smith',
        },
        {
            id: 3,
            first: 'Gill',
            last: 'Martin',
        },
    ];
    return (
        <Box
            sx={{
                height: 300,
                width: '100%',
                '& .super-app-theme--header': {
                    backgroundColor: '#1565c0', color: "#fff"
                },
            }}
        >
            <DataGrid rows={rows} columns={columns} checkboxSelection />
        </Box>
    )
}

const WorkListScreen = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const { factory, floor } = useSelector((state) => state.auth.user);
    const listTask = useSelector(
        (state) => state.electric.dataTaskReportDamageList
    );

    useEffect(() => {
        dispatch(get_task_damage({ factory, floor }));
    }, [factory, floor]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <Box component="div">
            <BreadCrumb breadCrumb={"Danh sách công việc"} />
            <Box
                component="div"
                sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
            >
                <Paper sx={PaperStyle} elevation={5}>
                    <Title titleText={"Danh sách công việc"} />
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold", minWidth: "120px", backgroundColor: "#1976d2", color: "#fff" }}>
                                        Mã Máy
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", minWidth: "120px", backgroundColor: "#1976d2", color: "#fff" }}>
                                        Nội dung
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", minWidth: "150px", backgroundColor: "#1976d2", color: "#fff" }}>
                                        Người gửi yêu cầu
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", minWidth: "120px", backgroundColor: "#1976d2", color: "#fff" }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listTask.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.id_machine}
                                        </TableCell>
                                        <TableCell>{row.remark}</TableCell>
                                        <TableCell>
                                            {row.name} - {row.id_user_request}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                    whiteSpace: "nowrap",
                                                }}
                                                onClick={handleClickOpen}
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

            <AlertDialog open={open} setOpen={setOpen}>
                <TableList />
            </AlertDialog>
        </Box>
    );
};

export default WorkListScreen;
