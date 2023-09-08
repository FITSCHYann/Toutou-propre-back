const router = require("express").Router()
const controller = require("../controllers/appointment")

router.get("/appointments", controller.getAll)
router.get("/appointment/:id", controller.getAllById)
router.get("/appointments/:month", controller.getByMonth)

router.put("/appointment/:id", controller.editOne)

router.post("/appointment", controller.createOne)

router.delete("/appointment/:id", controller.delOne)

module.exports = router    