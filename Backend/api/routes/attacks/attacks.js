const { Router } = require("express");
const controller = require("./controller");

const router = Router();

//Route to get attacks
// Grabbing the getAttack function from the controllers file. This is a cleaner option.
router.get("/", controller.getAttacks);

// Grabbing the getAttackById function from the controllers file.
router.get("/:id", controller.getAttackById);

// Posting new Attack to database.
router.post("/", controller.addNewAttack);

// Ammending Attack rows
router.put("/:id", controller.amendAttack);

// Deleting Attack from database.
router.delete("/:id", controller.deleteAttack);

module.exports = router;
