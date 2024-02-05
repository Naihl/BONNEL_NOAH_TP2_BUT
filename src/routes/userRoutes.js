const express = require('express');
const router = express.Router();
const {addUser, getUser, getAllUsers, updateUser} = require('../controllers/users.js');

router.post('/add', addUser);
router.get('/get/:id', getUser);
router.get('/getAll', getAllUsers);
router.put('/update/:id', updateUser);

module.exports = router;