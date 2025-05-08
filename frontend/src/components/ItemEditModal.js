import React, { useState, useEffect } from 'react';
import {
    Modal,
    Box,
    TextField,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateItem, addItem } from '../utils/api';

const ItemEditModal = ({ open, onClose, item, onItemUpdated, isAddMode }) => {
    const [formData, setFormData] = useState({
        companyName: '',
        hrContact: '',
        role: '',
        status: '',
        applicationLink: '',
        applied: false
    });

    useEffect(() => {
        if (item && !isAddMode) {
            setFormData(item);
        } else if (isAddMode) {
            setFormData({
                companyName: '',
                hrContact: '',
                role: '',
                status: '',
                applicationLink: '',
                applied: false
            });
        }
    }, [item, isAddMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        try {
            let result;
            if (isAddMode) {
                result = await addItem(formData);
            } else {
                result = await updateItem(item._id, formData);
            }
            onItemUpdated(result);
            onClose?.();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={(event, reason) => {
                if (reason !== 'backdropClick') {
                    onClose?.();
                }
            }}
        >
            <Box sx={modalStyle}>
                {/* Header with title and close button */}
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6">
                        {isAddMode ? 'Add New Job Application' : 'Edit Job Application'}
                    </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <TextField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="HR Contact"
                    name="hrContact"
                    value={formData.hrContact || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Role"
                    name="role"
                    value={formData.role || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Hiring Status"
                    name="status"
                    value={formData.status || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Application Link"
                    name="applicationLink"
                    value={formData.applicationLink || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="applied"
                            checked={formData.applied}
                            onChange={handleChange}
                        />
                    }
                    label="Applied"
                />
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {isAddMode ? 'Add Item' : 'Save Changes'}
                </Button>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: 24,
    width: 400,
    maxHeight: '90vh',
    overflowY: 'auto',
};

export default ItemEditModal;
