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
    Stack,
} from "@mui/material";
// import { DataGrid } from '@mui/x-data-grid';
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

const TableList = () => {

    return (
        <Box sx={{ maxHeight: "400px", width: "100%" }}>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bold", whiteSpace: "nowrap", backgroundColor: "#1976d2", color: "#fff" }}>
                                Họ và tên
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold", whiteSpace: "nowrap", backgroundColor: "#1976d2", color: "#fff" }}>
                                Số điện thoại
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold", whiteSpace: "nowrap", backgroundColor: "#1976d2", color: "#fff" }}>
                                Đơn vị
                            </TableCell>
                            <TableCell style={{ fontWeight: "bold", whiteSpace: "nowrap", backgroundColor: "#1976d2", color: "#fff" }}>
                                Tầng
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                fdsfds
                            </TableCell>
                            <TableCell>
                                fdsfds
                            </TableCell>
                            <TableCell>
                                fdsfds
                            </TableCell>
                            <TableCell>
                                fdsfds
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </TableContainer>


            <Stack direction="row"
                spacing={2}
                sx={{
                    marginTop: "10px",
                    justifyContent: "center",
                }}>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Giao việc
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    color="error"
                    size="small"
                >
                    Đóng
                </Button>
            </Stack>
        </Box>
    )
}

const WorkListScreen = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const { factory, floor, user_name } = useSelector((state) => state.auth.user);
    const listTask = useSelector(
        (state) => state.electric.dataTaskReportDamageList
    );

    console.log(listTask);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(get_task_damage({ factory, floor, user_name }));
        }

        fetchData();
    }, [factory, floor, user_name, dispatch]);

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

            <AlertDialog open={open} setOpen={setOpen} headerModal={"Danh sách nhân viên"}>
                <TableList />
            </AlertDialog>
        </Box>
    );
};

export default WorkListScreen;
