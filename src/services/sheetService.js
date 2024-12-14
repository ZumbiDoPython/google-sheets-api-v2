const { auth, sheets } = require('../config/googleAuth');

const fetchSheetData = async (spreadsheetId, sheetName) => {
  const client = await auth.getClient();
  const range = `${sheetName}`;
  const response = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range,
  });
  return response.data.values;
};

const updateSheetData = async (spreadsheetId, sheetName, updates) => {
  const client = await auth.getClient();

  const range = `${sheetName}!A${updates.line}:Z${updates.line}`;
  const values = [[updates.Cod]];

  const request = {
    auth: client,
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: { values },
  };

  await sheets.spreadsheets.values.update(request);

  return { message: 'Célula atualizada com sucesso!' };
};

const appendSheetData = async (spreadsheetId, sheetName, newData) => {
  const client = await auth.getClient();

  const headersRange = `${sheetName}!A1:Z1`;
  const headersResponse = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range: headersRange,
  });

  const headers = headersResponse.data.values[0];
  const newRow = headers.map(header => newData[header] || '');

  const request = {
    auth: client,
    spreadsheetId,
    range: sheetName,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [newRow],
    },
  };

  await sheets.spreadsheets.values.append(request);

  return { message: 'Nova linha adicionada com sucesso!' };
};

const updateRowData = async (spreadsheetId, sheetName, updates) => {
  const client = await auth.getClient();

  // Buscar os cabeçalhos da planilha
  const headersRange = `${sheetName}!A1:Z1`;
  const headersResponse = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range: headersRange,
  });

  const headers = headersResponse.data.values[0]; // Primeira linha como cabeçalhos

  // Buscar os valores atuais da linha
  const lineRange = `${sheetName}!A${updates.line}:Z${updates.line}`;
  const lineResponse = await sheets.spreadsheets.values.get({
    auth: client,
    spreadsheetId,
    range: lineRange,
  });

  const currentValues = lineResponse.data.values ? lineResponse.data.values[0] : [];
  const line = updates.line;
  delete updates.line; // Remover o campo `line` para processar os dados

  // Mesclar os valores existentes com os novos valores
  const newRow = headers.map((header, index) => {
    return updates[header] !== undefined ? updates[header] : (currentValues[index] || '');
  });

  // Atualizar a linha especificada
  const range = `${sheetName}!A${line}:Z${line}`;
  const request = {
    auth: client,
    spreadsheetId,
    range,
    valueInputOption: 'USER_ENTERED',
    resource: { values: [newRow] },
  };

  await sheets.spreadsheets.values.update(request);

  return { message: `Linha ${line} atualizada com sucesso!` };
};

module.exports = { fetchSheetData, updateSheetData, appendSheetData, updateRowData };
