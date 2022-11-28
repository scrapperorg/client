import React from 'react';
import {Box, Button, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import PATHS from "constants/paths";

export default function MonitorContent() {
    const navigate = useNavigate()
    return (
        <Box>
            <Typography>Monitor screen content</Typography>
            <Button onClick={() => navigate(PATHS.TEST)}></Button>
        </Box>
    );
}
