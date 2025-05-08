import React from 'react';
import { Box, Button } from '@mui/material';

const OperationsBar = ({ onEdit, onAdd }) => {
    return (
        <Box display="flex" justifyContent="flex-end" gap={2} mb={2}>
            <Button variant="contained" onClick={onAdd} sx={{
                    color: '#eeeff2',
                    borderColor: '#1e2c55',
                    backgroundColor: '#1e2c55',
                    '&:hover': {
                        backgroundColor: '#2f4072',
                        color: '#fff',
                        borderColor: '#000'
                    }
                }}>
                Add New
            </Button>
            <Button variant="contained" color="primary" onClick={onEdit} sx={{
                    color: '#eeeff2',
                    borderColor: '#1e2c55',
                    backgroundColor: '#1e2c55',
                    '&:hover': {
                        backgroundColor: '#2f4072',
                        color: '#fff',
                        borderColor: '#000'
                    }
                }}>
                Edit Selected
            </Button>
        </Box>
    );
};

export default OperationsBar;
