// Folder to hold various SQL queries
const getWeapons = " SELECT * FROM weapons";

const getWeaponById = " SELECT * FROM weapons WHERE id = $1 ";

const checkWeaponExist = " SELECT s from weapons s WHERE s.name = $1";

// The $1-4 are holding the 4 parameters that are being passed in
const addNewWeapon =
  " INSERT INTO weapons (name, affinity, lvl, description, damage) VALUES ($1, $2, $3, $4, $5)";

const deleteWeapon = " DELETE FROM weapons WHERE id = $1 ";

const amendWeapon = "UPDATE weapons SET description = $1 WHERE id = $2 ";

module.exports = {
  getWeapons,
  getWeaponById,
  checkWeaponExist,
  addNewWeapon,
  amendWeapon,
  deleteWeapon,
};
