import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Stack,
  Card,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Chip
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import ColorlibStepIcon from "./ColorlibStepIcon";

import DetailInfo from "./DetailInfo";

export default function History({ historyListReport, user }) {
  const [historyList, setHistoryList] = useState(historyListReport || []);
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [idMachine, setIdMachine] = useState("");

  const steps = [
    {
      label: "Sản xuất",
      description: `Quét mã và gửi yêu cầu cho cơ điện.`,
      performAction: function (status, lean, id_machine) {
        setActiveModal("detailInfo");
        setIdMachine(id_machine);
        setOpen(true);
      },
    },
    {
      label: "Thợ sửa",
      description: "Xác nhận yêu cầu được gửi từ sản xuất.",
      performAction: function (status, lean, id_machine) {
        return "";
      }
    },
    {
      label: "Cơ điện",
      description: "Tiếp nhận yêu cầu từ sản xuất.",
      performAction: function (status, lean, id_machine) {
        return "";
      }
    },
    {
      label: "Cơ điện",
      description: `Sửa chữa và ghi chú máy bị hư.`,
      performAction: function (status, lean, id_machine) {
        return "";
      }
    },
  ];

  const handleClick = (index) => {
    const isOpen = historyList.includes(index);
    if (isOpen) {
      setHistoryList(historyList.filter((item) => item !== index));
    } else {
      setHistoryList([...historyList, index]);
    }
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {historyListReport === null
        ? []
        : historyListReport.map((item, index) => (
          <List
            sx={{
              width: "100%",
              bgcolor: "primary.dark",
              borderRadius: "5px",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            key={index}
          >
            <ListItemButton onClick={() => handleClick(index)}>
              <ListItemText>
                <Typography
                  variant="body"
                  style={{
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <Chip
                    label={item["date_user_request"].split("T")[0]}
                    color="primary"
                  />{" "}
                  - <Chip label={item["id_machine"]} color="primary" />
                </Typography>
              </ListItemText>
              {historyList.includes(index) ? (
                <ExpandLess style={{ color: "white" }} />
              ) : (
                <ExpandMore style={{ color: "white" }} />
              )}
            </ListItemButton>
            <Collapse in={historyList.includes(index)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <Card
                    variant="outlined"
                    sx={{ width: "100%", padding: "0 15px" }}
                  >
                    <Stepper activeStep={item["status"] - 1} orientation="vertical">
                      {steps.map((step, index) => (
                        <Step key={index}
                          onClick={() =>
                            step.performAction(
                              item.status,
                              user.lean,
                              item.id_machine
                            )
                          }
                        >
                          <StepLabel StepIconComponent={ColorlibStepIcon}>
                            {step.label} - {step.description}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Card>
                </ListItem>
              </List>
            </Collapse>

            {/* Trạng thái 1: Xem thông tin yêu cầu */}
            {activeModal === "detailInfo" && (
              <DetailInfo
                isCheck={idMachine === item.id_machine}
                machine={item}
                open={open}
                setOpen={setOpen}
                user={user}
              />
            )}
          </List>
        ))}
    </Stack>
  );
}
