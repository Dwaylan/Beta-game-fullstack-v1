// Folder to hold various SQL queries
const getAttacks = " SELECT * FROM attacks";

const getAttackById = " SELECT * FROM attacks WHERE id = $1 ";

const checkAttackExist = " SELECT s from attacks s WHERE s.name = $1";

// The $1-4 are holding the 4 parameters that are being passed in
const addNewAttack =
  " INSERT INTO attacks (name, affinity, mp, lvl, description, damage) VALUES ($1, $2, $3, $4, $5, $6)";

const deleteAttack = " DELETE FROM attacks WHERE id = $1 ";

const amendAttack = "UPDATE attack SET description = $1 WHERE id = $2 ";

module.exports = {
  getAttacks,
  getAttackById,
  checkAttackExist,
  addNewAttack,
  amendAttack,
  deleteAttack,
};
