const express = require('express');
const router = express.Router();
const Author = require('../models/author');

// Route hiển thị trang quản lý tác giả
router.get('/manage-authors', async (req, res) => {
    try {
        const authors = await Author.find();  
        res.render('manage-authors', { authors });  
    } catch (error) {
        res.status(500).send("Lỗi khi lấy danh sách tác giả.");
    }
});

// Thêm tác giả
router.post('/add-author', async (req, res) => {
    try {
        const newAuthor = new Author({ name: req.body.name });
        await newAuthor.save();
        res.redirect('/manage-authors');
    } catch (error) {
        res.status(500).send("Lỗi thêm tác giả.");
    }
});

// Xóa tác giả
router.get('/delete-author/:id', async (req, res) => {
    try {
        await Author.findByIdAndDelete(req.params.id);
        res.redirect('/manage-authors');
    } catch (error) {
        res.status(500).send("Lỗi xóa tác giả.");
    }
});

// Cập nhật tác giả
router.post('/edit-author/:id', async (req, res) => {
    try {
        await Author.findByIdAndUpdate(req.params.id, { name: req.body.name });
        res.redirect('/manage-authors');
    } catch (error) {
        res.status(500).send("Lỗi cập nhật tác giả.");
    }
});

module.exports = router;
