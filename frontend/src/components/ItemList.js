import React, { useEffect, useState } from 'react';
import { getItems, updateItem, addItem, deleteItem } from '../utils/api';
import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    CircularProgress,
    Button,
    TextField,
    Paper,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ItemEditModal from './ItemEditModal';
import OperationsBar from './OperationsBar';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editingCell, setEditingCell] = useState({ id: null, field: null });
    const [modalOpen, setModalOpen] = useState(false);
    const [addMode, setAddMode] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getItems(page);
                setItems(response.items || []);
                setTotalPages(response.totalPages || 1);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
                setLoading(false);
            }
        };

        fetchItems();
    }, [page]);

    const handleRowSelect = (item) => {
        setSelectedItem(item._id === selectedItem?._id ? null : item);
    };

    const handleCellEdit = (id, field, value) => {
        const updatedItems = items.map(item =>
            item._id === id ? { ...item, [field]: value } : item
        );
        setItems(updatedItems);
    };

    const saveCellEdit = async (id, field, value) => {
        try {
            const itemToUpdate = items.find(item => item._id === id);
            const updatedItem = { ...itemToUpdate, [field]: value };
            await updateItem(id, updatedItem);
            setEditingCell({ id: null, field: null });
        } catch (error) {
            console.error("Error saving cell edit:", error);
        }
    };

    const handleEditClick = () => {
        if (selectedItem) {
            setAddMode(false);
            setModalOpen(true);
        }
    };

    const handleAddClick = () => {
        setSelectedItem(null);
        setAddMode(true);
        setModalOpen(true);
    };

    const handleItemUpdated = (item) => {
        if (addMode) {
            setItems(prev => [item, ...prev]);
        } else {
            const updatedItems = items.map(it =>
                it._id === item._id ? item : it
            );
            setItems(updatedItems);
        }
        setModalOpen(false);
        setSelectedItem(null);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                await deleteItem(id);
                setItems(prev => prev.filter(item => item._id !== id));
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <OperationsBar onEdit={handleEditClick} onAdd={handleAddClick} />

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Company Name</TableCell>
                                    <TableCell>HR Contact</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Hiring Status</TableCell>
                                    <TableCell sx={{ minWidth: 200 }}>Application Link</TableCell>
                                    <TableCell>Applied</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.map((item, index) => (
                                    <TableRow
                                        key={item._id}
                                        hover
                                        onClick={() => handleRowSelect(item)}
                                        selected={selectedItem?._id === item._id}
                                        sx={{
                                            backgroundColor: selectedItem?._id === item._id ? '#e3f2fd' : 'inherit',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s'
                                        }}
                                    >
                                        <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                                        {["companyName", "hrContact", "role", "status", "applicationLink", "applied"].map(field => (
                                            <TableCell
                                                key={field}
                                                sx={{
                                                    whiteSpace: field === "applicationLink" ? 'normal' : 'nowrap',
                                                    wordBreak: field === "applicationLink" ? 'break-word' : 'normal'
                                                }}
                                                onDoubleClick={() => setEditingCell({ id: item._id, field })}
                                            >
                                                {editingCell.id === item._id && editingCell.field === field ? (
                                                    <TextField
                                                        value={String(item[field])}
                                                        onChange={(e) => handleCellEdit(item._id, field, e.target.value)}
                                                        onBlur={() => saveCellEdit(item._id, field, item[field])}
                                                        autoFocus
                                                        fullWidth
                                                    />
                                                ) : (
                                                    field === "applied"
                                                        ? item[field] ? "Yes" : "No"
                                                        : item[field]
                                                )}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <IconButton onClick={() => handleDelete(item._id)} color="error">
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button
                            variant="outlined"
                            disabled={page === 1}
                            onClick={() => setPage(prev => prev - 1)}
                            sx={{ mr: 2,
                                color: '#1e2c55',
                                borderColor: '#1e2c55',
                                '&:hover': {
                                  backgroundColor: '#1e2c55',
                                  color: '#fff',
                                  borderColor: '#000'
                                } }}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outlined"
                            disabled={page === totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                            sx={{
                                color: '#1e2c55',
                                borderColor: '#1e2c55',
                                '&:hover': {
                                  backgroundColor: '#1e2c55',
                                  color: '#fff',
                                  borderColor: '#000'
                                }
                              }}
                        >
                            Next
                        </Button>
                    </Box>
                </>
            )}

            {modalOpen && (
                <ItemEditModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    item={selectedItem}
                    onItemUpdated={handleItemUpdated}
                    isAddMode={addMode}
                />
            )}
        </Container>
    );
};

export default ItemList;
