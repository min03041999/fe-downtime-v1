import React from "react";
import AlertDialog from "./AlertDialog";
import { Box, Stack, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { scanner_fix_mechanic } from "../redux/features/electric";

const ConfirmModal = ({ isCheck, open, setOpen, idMachine, user }) => {
  const dispatch = useDispatch();


  const onSubmit = () => {
    const { user_name, factory, lean } = user;
    const id_machine = idMachine;
    const id_user_mechanic = user_name;
    const status = 2;

    dispatch(scanner_fix_mechanic({ id_user_mechanic, id_machine, factory, lean, status }));
    setOpen(false);
  };

  const onCancel = () => {
    const { user_name, factory, lean } = user;
    const id_machine = idMachine;
    const id_user_mechanic = user_name;
    const status = 5;

    dispatch(scanner_fix_mechanic({ id_user_mechanic, id_machine, factory, lean, status }));
    setOpen(false);
  };

  return (
    <>
      {isCheck && (
        <AlertDialog
          open={open}
          setOpen={setOpen}
          headerModal={"Xác nhận yêu cầu được gửi từ sản xuất."}
        >
          <Box
            component="div"
            sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
          >
            <Box component="div" sx={{ marginTop: "10px" }}>
              <Typography variant="h6" textAlign="center" >
                Xác nhận
              </Typography>
              <Typography textAlign="center" sx={{ fontSize: "14px", color: "#aeaeae" }}>
                Bạn có muốn tiếp nhận yêu cầu này không?
              </Typography>
            </Box>
            <Box component="div">

              <Stack
                direction="row"
                spacing={2}
                sx={{ marginTop: "25px", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={onSubmit}
                >
                  Đồng ý
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={onCancel}
                >
                  Từ chối
                </Button>
              </Stack>
            </Box>
          </Box>
        </AlertDialog>
      )}
    </>
  );
};

export default ConfirmModal;
