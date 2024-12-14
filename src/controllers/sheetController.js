const { fetchSheetData, updateSheetData, appendSheetData, updateRowData } = require('../services/sheetService');
const { applyFilter } = require('../utils/filterUtils');

const getSheetData = async (req, res) => {
  try {
    const spreadsheetId = req.headers['spreadsheet-id'];
    const sheetName = req.headers['sheet-name'];
    const filterQuery = req.query.filter;

    if (!spreadsheetId || !sheetName) {
      return res.status(400).json({
        error: 'Headers "spreadsheet-id" e "sheet-name" são obrigatórios.',
      });
    }

    const rows = await fetchSheetData(spreadsheetId, sheetName);
    const headers = rows[0];
    let data = rows.slice(1).map((row, rowIndex) => {
      const obj = headers.reduce((acc, header, colIndex) => {
        acc[header] = row[colIndex] || '';
        return acc;
      }, {});
      obj.line = `${rowIndex + 2}`;
      return obj;
    });

    if (filterQuery) {
      data = applyFilter(data, filterQuery);
    }

    res.json({ results: data });
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
    res.status(500).json({ error: 'Erro ao acessar a planilha.' });
  }
};

const updateCellData = async (req, res) => {
  try {
    const spreadsheetId = req.headers['spreadsheet-id'];
    const sheetName = req.headers['sheet-name'];
    const updates = req.body;

    if (!spreadsheetId || !sheetName || !updates || !updates.Cod || !updates.line) {
      return res.status(400).json({
        error: 'Headers "spreadsheet-id", "sheet-name" e body com "Cod" e "line" são obrigatórios.',
      });
    }

    const result = await updateSheetData(spreadsheetId, sheetName, updates);

    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar dados:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar a planilha.' });
  }
};

const addNewRow = async (req, res) => {
  try {
    const spreadsheetId = req.headers['spreadsheet-id'];
    const sheetName = req.headers['sheet-name'];
    const newData = req.body;

    if (!spreadsheetId || !sheetName || !newData) {
      return res.status(400).json({
        error: 'Headers "spreadsheet-id", "sheet-name" e body com os dados são obrigatórios.',
      });
    }

    const result = await appendSheetData(spreadsheetId, sheetName, newData);

    res.status(201).json(result);
  } catch (error) {
    console.error('Erro ao adicionar nova linha:', error.message);
    res.status(500).json({ error: 'Erro ao adicionar nova linha na planilha.' });
  }
};

const updateRow = async (req, res) => {
  try {
    const spreadsheetId = req.headers['spreadsheet-id'];
    const sheetName = req.headers['sheet-name'];
    const updates = req.body;

    if (!spreadsheetId || !sheetName || !updates || !updates.line) {
      return res.status(400).json({
        error: 'Headers "spreadsheet-id", "sheet-name" e body com os dados incluindo "line" são obrigatórios.',
      });
    }

    const result = await updateRowData(spreadsheetId, sheetName, updates);

    res.status(200).json(result);
  } catch (error) {
    console.error('Erro ao atualizar linha:', error.message);
    res.status(500).json({ error: 'Erro ao atualizar a linha na planilha.' });
  }
};

module.exports = { getSheetData, updateCellData, addNewRow, updateRow };
