import React, { useState } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

const TaskEmployeeStyle = {
  padding: "15px 30px 15px 30px",
  margin: "5px",
  borderRadius: "30px",
  border: "3px solid #ccc",
};

const TitleStyle = {
  fontSize: "14px",
  textTransform: "uppercase",
  fontWeight: "bold",
};

const TaskEmployee = ({ arrResult }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [selectedRow, setSelectedRow] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns = [
    { id: "date_user_request", label: "Ngày", minWidth: 110 },
    { id: "id_machine", label: "Mã Máy", minWidth: 100 },
    { id: "skill_cfm", label: "Phương pháp sửa", minWidth: 100 },
    { id: "avgTime", label: "Thời gian sửa", minWidth: 100 },
  ];

  return (
    <Box component="div" sx={TaskEmployeeStyle}>
      <Typography sx={TitleStyle} variant="h4" component="div">
        Công việc đã hoàn thành
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, whiteSpace: "nowrap" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>

          </TableHead>
          <TableBody>
            {arrResult
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {row.date_user_request.split("T")[0]}
                    </TableCell>
                    <TableCell>
                      {row.id_machine}
                    </TableCell>
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {row.skill_cfm_vn.join(", ")}
                    </TableCell>
                    <TableCell>
                      {row.avgTime}
                    </TableCell>
                  </TableRow>
                );
              })}

          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={arrResult?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default TaskEmployee;
