const pool = require("../db");
const queries = require("./queries");

const getAttacks = (req, res) => {
  // leveraging our postgres database to retrieve information
  // *** Important to note that queries are being held in a separate file ***
  pool.query(queries.getAttacks, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });

  //   res.send("using NEW api route for weapons ");
};

// Controller for retrieving a single character
const getAttackById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getAttackById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Controller for adding a new character
const addNewAttack = (req, res) => {
  // Setting the template for the request object body
  // These are the destructured key values
  const { name, affinity, mp, lvl, description, damage } = req.body;
  // Checking to see if name exist
  pool.query(queries.checkAttackExist, [name], (error, results) => {
    if (results.rows.length) {
      res.send("This attack already exists");
    }
    // Adding new character after the name check function has run
    pool.query(
      queries.addNewAttack,
      [name, affinity, mp, lvl, description, damage],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Attack creation successful");
        console.log("Attack creation successful");
      }
    );
  });
};

// Controller for amending a character row
const amendAttack = (req, res) => {
  const id = parseInt(req.params.id);
  const { description, affinity, hp, mp } = req.body;

  pool.query(queries.getAttackById, [id], (error, results) => {
    const noCharacterFound = !results.rows.length;
    if (noCharacterFound) {
      res.send("Attack does not exist");
    }
    pool.query(
      queries.amendAttack,
      [description, affinity, hp, mp],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Attack updated successfully");
      }
    );
  });
};

// Controller for deleting a character
const deleteAttack = (req, res) => {
  const id = parseInt(req.params.id);
  // Checking to see if character exist
  pool.query(queries.getAttackById, [id], (error, results) => {
    const noAttackFound = !results.rows.length;
    if (noAttackFound) {
      res.send("Attack does not exist");
    }
  });
  // Deleting character
  pool.query(queries.deleteAttack, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Attack removed");
  });
};

module.exports = {
  getAttacks,
  getAttackById,
  addNewAttack,
  amendAttack,
  deleteAttack,
};
