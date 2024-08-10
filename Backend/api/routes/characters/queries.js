// Folder to hold various SQL queries
const getCharacters = "SELECT * FROM characters";

const getCharacterById = " SELECT * FROM characters WHERE id = $1 ";

const checkNameExist = " SELECT s from characters s WHERE s.name = $1";

// The $1-4 are holding the 4 parameters that are being passed in
const addNewCharacter =
  " INSERT INTO characters (name, description, affinity, hp, mp) VALUES ($1, $2, $3, $4, $5)";

const deleteCharacter = " DELETE FROM characters WHERE id = $1 ";

const amendCharacter = "UPDATE students SET description = $1 WHERE id = $2 ";

module.exports = {
  getCharacters,
  getCharacterById,
  checkNameExist,
  addNewCharacter,
  amendCharacter,
  deleteCharacter,
};
