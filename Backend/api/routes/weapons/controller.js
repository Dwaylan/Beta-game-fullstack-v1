const pool = require("../db");
const queries = require("./queries");

const getWeapons = (req, res) => {
  // leveraging our postgres database to retrieve information
  // *** Important to note that queries are being held in a separate file ***
  pool.query(queries.getWeapons, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Controller for retrieving a single weapon
const getWeaponById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getWeaponById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Controller for adding a new weapon
const addNewWeapon = (req, res) => {
  // Setting the template for the request object body
  // These are the destructured key values
  const { name, affinity, lvl, description, damage } = req.body;
  // Checking to see if name exist
  pool.query(queries.checkWeaponExist, [name], (error, results) => {
    if (results.rows.length) {
      res.send("This weapon already exists");
    }
    // Adding new character after the name check function has run
    pool.query(
      queries.addNewWeapon,
      [name, affinity, lvl, description, damage],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Weapon creation successful");
        console.log("Weapon creation successful");
      }
    );
  });
};

// Controller for amending a character row
const amendWeapon = (req, res) => {
  const id = parseInt(req.params.id);
  const { description, affinity, hp, mp } = req.body;

  pool.query(queries.getWeaponById, [id], (error, results) => {
    const noWeaponFound = !results.rows.length;
    if (noWeaponFound) {
      res.send("Weapon does not exist");
    }
    pool.query(
      queries.amendCharacter,
      [description, affinity, hp, mp],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Weapon updated successfully");
      }
    );
  });
};

// Controller for deleting a weapon
const deleteWeapon = (req, res) => {
  const id = parseInt(req.params.id);
  // Checking to see if weapon exist
  pool.query(queries.getWeaponById, [id], (error, results) => {
    const noWeaponFound = !results.rows.length;
    if (noWeaponFound) {
      res.send("Weapon does not exist");
    }
  });
  // Deleting weapon
  pool.query(queries.deleteWeapon, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Weapon removed");
  });
};

module.exports = {
  getWeapons,
  getWeaponById,
  addNewWeapon,
  amendWeapon,
  deleteWeapon,
};
