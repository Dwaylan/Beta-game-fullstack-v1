const { Router } = require("express");
const controller = require("./controller");

const router = Router();

//Route to get characters
// Grabbing the getCharacters function from the controllers file. This is a cleaner option.
router.get("/", controller.getCharaters);

// Grabbing the getCharactersById function from the controllers file.
router.get("/:id", controller.getCharacterById);

// Posting new Character to database.
router.post("/", controller.addNewCharacter);

// Ammending character rows
router.put("/:id", controller.amendCharacter);

// Deleting character from database.
router.delete("/:id", controller.deleteCharacter);

module.exports = router;
