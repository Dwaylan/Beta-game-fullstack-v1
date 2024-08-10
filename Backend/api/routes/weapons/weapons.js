const { Router } = require("express");
const controller = require("./controller");

const router = Router();

//Route to get characters
// Grabbing the getCharacters function from the controllers file. This is a cleaner option.
router.get("/", controller.getWeapons);

// Grabbing the getCharactersById function from the controllers file.
router.get("/:id", controller.getWeaponById);

// Posting new Character to database.
router.post("/", controller.addNewWeapon);

// Ammending character rows
router.put("/:id", controller.amendWeapon);

// Deleting character from database.
router.delete("/:id", controller.deleteWeapon);

module.exports = router;
