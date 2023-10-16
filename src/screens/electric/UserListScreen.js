import React, { useState, useEffect, useRef } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from "@mui/material";
import Title from "../../components/Title";
import BreadCrumb from "../../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import { get_list_status_mechanic } from "../../redux/features/electric";

import socketIOClient from "socket.io-client";
import { BASE_URL } from "../../utils/env";

function statusCurrent(status) {
  switch (status) {
    case 1:
      return <Chip label="Availabel" color="success" sx={{ backgroundColor: "#11a52c" }} />;
    case 2:
      return <Chip label="Task" color="warning" />;
    case 3:
      return <Chip label="Fixing" color="error" />;
    default:
      return "";
  }
}

const PaperStyle = {
  position: "relative",
  marginTop: "10px",
  padding: "10px",
};

const host = BASE_URL;

const UserlistScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { getListStatusMechanic } = useSelector((state) => state.electric);

  const [socket, setSocket] = useState("");
  const socketRef = useRef();



  useEffect(() => {
    const fetchData = async () => {
      const { position, factory, floor, lean } = user;
      await dispatch(get_list_status_mechanic({ position, factory, floor, lean }));
    }
    fetchData();

    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("message", (data) => {
      console.log(data);
    });

    socketRef.current.on(`${user.user_name}`, (data) => {
      setSocket(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [dispatch, user, socket]);


  return (
    <Box component="div">
      <BreadCrumb breadCrumb={"Danh sách cơ điện"} />
      <Box
        component="div"
        sx={{ display: "block", margin: "0 auto" }}
      >
        <Paper sx={PaperStyle} elevation={5}>
          <Title titleText={"Danh sách cơ điện"} />
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="sticky table"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold", whiteSpace: "nowrap", backgroundColor: "#1976d2", color: "#fff" }} align="center">
                    Họ và tên
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", whiteSpace: "nowrap", backgroundColor: "#1976d2", color: "#fff" }} align="center">
                    Đơn vị
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", whiteSpace: "nowrap", backgroundColor: "#1976d2", color: "#fff" }} align="center">
                    Tầng
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold", whiteSpace: "nowrap", backgroundColor: "#1976d2", color: "#fff" }} align="center">
                    Trạng thái hoạt động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getListStatusMechanic?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      {row.user_name} - {row.name}
                    </TableCell>
                    <TableCell align="center">
                      {row.lean}
                    </TableCell>
                    <TableCell align="center">
                      {row.floor} - {row.floors}
                    </TableCell>
                    <TableCell align="center">
                      {statusCurrent(row.STS)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default UserlistScreen;
