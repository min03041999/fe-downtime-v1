import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";

import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "A", value: 300 },
  { name: "B", value: 200 },
  { name: "C", value: 100 },
  { name: "D", value: 400 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function InfoUserScreen() {
  return (
    <Box marginTop={1}>
      <Box
        margin="5px"
        borderRadius="30px"
        display="flex"
        justifyContent="space-between"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          padding="10px 0"
          borderRadius="25px"
          border="3px solid #ccc"
          width="49%"
        >
          <Box>
            <Typography
              variant="h6"
              component="h6"
              color="black"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Today's Fixes
            </Typography>
          </Box>
          <Box
            width="80%"
            height="70px"
            bgcolor="primary.dark"
            borderRadius="25px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h3" component="h3" color="white">
              6
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          padding="10px 0"
          borderRadius="25px"
          border="3px solid #ccc"
          width="49%"
        >
          <Box>
            <Typography
              variant="h6"
              component="h6"
              color="black"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Avg Fix Time
            </Typography>
          </Box>
          <Box
            width="80%"
            height="70px"
            bgcolor="primary.dark"
            borderRadius="25px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h3" component="h3" color="white">
              15:15
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        padding="30px 30px 15px 30px"
        margin="5px"
        borderRadius="30px"
        border="3px solid #ccc"
      >
        <Typography
          style={{ textTransform: "uppercase" }}
          fontSize={14}
          fontWeight="bold"
          variant="h4"
          component="div"
        >
          Passed machine tests
        </Typography>

        <Grid container spacing={2} style={{ fontSize: 14 }}>
          <Grid item xs={6}>
            <List style={{ fontSize: 14 }}>
              <ListItem style={{ padding: "0 0 0 16px" }}>
                <ListItemText>
                  <Typography sx={{ fontSize: "14px" }}>
                    Sm. Computer
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem style={{ padding: "0 0 0 16px" }}>
                <ListItemText>
                  <Typography sx={{ fontSize: "14px" }}>
                    Med. Computer
                  </Typography>
                </ListItemText>
              </ListItem>
              <ListItem style={{ padding: "0 0 0 16px" }}>
                <ListItemText>
                  <Typography sx={{ fontSize: "14px" }}>SN Post</Typography>
                </ListItemText>
              </ListItem>
              <ListItem style={{ padding: "0 0 0 16px" }}>
                <ListItemText>
                  <Typography sx={{ fontSize: "14px" }}>DN Post</Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={6}>
            <List>
              <ListItem style={{ padding: "0 0 0 16px" }}>
                <ListItemText>
                  <Typography sx={{ fontSize: "14px" }}>Zag Zag</Typography>
                </ListItemText>
              </ListItem>
              <ListItem style={{ padding: "0 0 0 16px" }}>
                <ListItemText>
                  <Typography sx={{ fontSize: "14px" }}>Hammer</Typography>
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Box>

      <Box
        padding="30px 30px 15px 30px"
        margin="5px"
        borderRadius="30px"
        border="3px solid #ccc"
      >
        <Typography
          style={{ textTransform: "uppercase" }}
          fontSize={14}
          fontWeight="bold"
          variant="h4"
          component="div"
        >
          avg fix time by category
        </Typography>
        <Box display="flex" justifyContent="center">
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              align="center"
              layout="horizontal"
              iconType="circle"
            />
          </PieChart>
        </Box>
      </Box>
    </Box>
  );
}
