const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// GET - Paginated items
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const totalItems = await Item.countDocuments();
        const items = await Item.find().skip(skip).limit(limit);

        res.json({
            items,
            totalItems,
            currentPage: page,
            totalPages: Math.ceil(totalItems / limit)
        });
    } catch (err) {
        console.error('Fetch Error:', err);
        res.status(500).json({ message: 'Error fetching items' });
    }
});

// PUT - Update item
router.put('/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        console.error('Update Error:', err);
        res.status(500).json({ message: 'Error updating item' });
    }
});

module.exports = router;
