import React from 'react';
import { Typography, Box } from '@mui/material';

const Header = () => {
    return (
        <Box sx={{
            backgroundColor: '#1e2c55',
            color: '#b4c0e2',
            py: 3,
            textAlign: 'center',
            mb: 4,
            boxShadow: 2
        }}>
            <Typography variant="h4" fontWeight="bold">
                Job Application Tracker
            </Typography>
        </Box>
    );
};

export default Header;
