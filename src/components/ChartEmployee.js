import React from 'react';
import { Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
    { name: 'Replacement (Machine Swap)', value: 400 },
    { name: 'Non-critical Fix', value: 300 },
    { name: 'Tempogary Fix', value: 300 },
    { name: 'Water', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const ChartEmployeeStyle = {
    padding: "15px 30px 15px 30px",
    margin: "5px",
    borderRadius: "30px",
    border: "3px solid #ccc"
}

const TitleStyle = {
    textTransform: "uppercase",
    fontSize: "14px",
    fontWeight: "bold",
}

const ContentStyle = {
    display: "flex",
    justifyContent: "center",
}

const ChartEmployee = () => {
    return (
        <Box sx={ChartEmployeeStyle}>
            <Typography sx={TitleStyle} variant="h4" component="div">
                avg fix time by category
            </Typography>
            <Box sx={ContentStyle}>
                <PieChart width={250} height={350}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend
                        layout="vertical"
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                    />
                </PieChart>
            </Box>
        </Box>
    )
}

export default ChartEmployee;