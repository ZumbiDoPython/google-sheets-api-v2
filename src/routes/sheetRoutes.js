const express = require('express');
const { getSheetData, updateCellData, addNewRow, updateRow } = require('../controllers/sheetController');

const router = express.Router();

router.get('/data', getSheetData);
router.put('/data', updateRow);
router.post('/data', addNewRow);
router.put('/data/row', updateCellData); // Nova rota para atualizar linha completa

module.exports = router;
