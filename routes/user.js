const router = require("express").Router()
const controller = require("../controllers/user")
const verifyToken = require("../middlewares/token")

router.get("/user/:id", verifyToken, controller.getOne)


router.get("/users", verifyToken, controller.getAll)



router.get("/user", verifyToken, controller.GetOneByMail)

router.put("/user/:id", verifyToken, controller.editOne)

router.delete("/user/:id", verifyToken, controller.delOne)

module.exports = router