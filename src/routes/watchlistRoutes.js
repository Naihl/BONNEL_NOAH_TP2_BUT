const express = require('express');
const router = express.Router();
const {addWatchList, getWatchList, addItemToWatchList, updatestatus, getAllWatchList, deleteItemFromWatchList, deleteWatchList} = require('../controllers/watchList.js');

router.post('/add', addWatchList);
router.get('/get/:id', getWatchList);
router.post('/:id/addItem', addItemToWatchList);
router.post('/:id/updateStatus', updatestatus);
router.get('/getAll', getAllWatchList);
router.delete('/:id/deleteItem/:itemId', deleteItemFromWatchList);
router.delete('/:id/delete', deleteWatchList);

module.exports = router;