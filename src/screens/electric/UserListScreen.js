import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Title from "../../components/Title";
import BreadCrumb from "../../components/BreadCrumb";

function createData(avatar, name, line, status, minute) {
  return { avatar, name, line, status, minute };
}

function statusCurrent(status) {
  switch (status) {
    case "Fixing":
      return <Chip label="Fixing" color="error" />;
    case "Onway":
      return <Chip label="On way" color="primary" />;
    case "Availabel":
      return <Chip label="Availabel" color="success" />;
    default:
      return <Chip label="Task" color="warning" />;
  }
}

const rows = [
  createData("Img Dien", "Điện", "3F-1", "Fixing", "18 phút trước"),
  createData("Img Viet", "Việt", "3F-2", "Onway", "5 phút trước"),
  createData("Img Trong", "Trọng", "3F-3", "Availabel", "20 phút trước"),
  createData("Img Nguyen", "Nguyên", "3F-4", "Task", "1 tiếng trước"),
  createData("Img Tam", "Tâm", "3F-5", "Fixing", "30 phút trước"),
];

const PaperStyle = {
  position: "relative",
  marginTop: "10px",
  padding: "10px",
};

const UserlistScreen = () => {
  return (
    <Box component="div">
      <BreadCrumb breadCrumb={"Danh sách cơ điện"} />
      <Box
        component="div"
        sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
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
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Hình đại diện
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Tên
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Chuyền
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Trạng thái hoạt động
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="center">
                    Lịch sử hoạt động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.avatar}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box width="100%" display="flex" justifyContent="center">
                        <Avatar alt={row.name} src={row.avatar} />
                      </Box>
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.line}</TableCell>
                    <TableCell align="center">
                      {statusCurrent(row.status)}
                    </TableCell>
                    <TableCell align="center">
                      <Box>
                        <AccessTimeIcon style={{ opacity: 0.5 }} />
                      </Box>
                      <Box style={{ opacity: 0.5 }}>{row.minute}</Box>
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
