const express = require('express');
const router = express.Router();
const {addItem, getItem, getAllItems} = require('../controllers/items.js');

router.post('/add', addItem);
router.get('/get/:id', getItem);
router.get('/getAll', getAllItems);

module.exports = router;