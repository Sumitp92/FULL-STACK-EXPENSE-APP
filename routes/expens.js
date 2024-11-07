const express = require('express');
const { getExp, addExp, delExp, editExp } = require('../controllers/expense');
const router = express.Router();

router.get('/', getExp);

router.post('/', addExp);

router.delete('/:id', delExp);

router.put('/:id', editExp); 

module.exports = router;
