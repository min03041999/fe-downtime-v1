import React from 'react';
import { Typography } from '@mui/material';

const titleStyle = {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "10px"
}

const Title = (props) => {
    const { titleText } = props;
    return (
        <Typography sx={titleStyle}>{titleText}</Typography>
    )
}

export default Title;