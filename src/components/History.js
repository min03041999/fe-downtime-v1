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

const steps = [
  {
    label: "Sản xuất",
    description: `Quét mã và gửi yêu cầu cho cơ điện.`,
  },
  {
    label: "Cơ điện",
    description: "Tiếp nhận yêu cầu từ sản xuất.",
  },
  {
    label: "Cơ điện",
    description: `Sửa chữa và ghi chú máy bị hư.`,
  },
];

export default function History({ historyListReport }) {
  const [historyList, setHistoryList] = useState(historyListReport || []);

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
                        <Step key={index}>
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
          </List>
        ))}
    </Stack>
  );
}
