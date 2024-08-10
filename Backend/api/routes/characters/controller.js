const pool = require("../db");
const queries = require("./queries");

const getCharaters = (req, res) => {
  // leveraging our postgres database to retrieve information
  // *** Important to note that queries are being held in a separate file ***
  pool.query(queries.getCharacters, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Controller for retrieving a single character
const getCharacterById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getCharacterById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

// Controller for adding a new character
const addNewCharacter = (req, res) => {
  // Setting the template for the request object body
  // These are the destructured key values
  const { name, description, affinity, hp, mp } = req.body;
  // Checking to see if name exist
  pool.query(queries.checkNameExist, [name], (error, results) => {
    if (results.rows.length) {
      res.send("This character already exists");
    }
    // Adding new character after the name check function has run
    pool.query(
      queries.addNewCharacter,
      [name, description, affinity, hp, mp],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Character creation successful");
        console.log("Character creation successful");
      }
    );
  });
};

// Controller for amending a character row
const amendCharacter = (req, res) => {
  const id = parseInt(req.params.id);
  const { description, affinity, hp, mp } = req.body;

  pool.query(queries.getCharacterById, [id], (error, results) => {
    const noCharacterFound = !results.rows.length;
    if (noCharacterFound) {
      res.send("Character does not exist");
    }
    pool.query(
      queries.amendCharacter,
      [description, affinity, hp, mp],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Character updated successfully");
      }
    );
  });
};

// Controller for deleting a character
const deleteCharacter = (req, res) => {
  const id = parseInt(req.params.id);
  // Checking to see if character exist
  pool.query(queries.getCharacterById, [id], (error, results) => {
    const noCharacterFound = !results.rows.length;
    if (noCharacterFound) {
      res.send("Character does not exist");
    }
  });
  // Deleting character
  pool.query(queries.deleteCharacter, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Character removed");
  });
};

module.exports = {
  getCharaters,
  getCharacterById,
  addNewCharacter,
  amendCharacter,
  deleteCharacter,
};
