const express = require("express")
const bodyParser = require("body-parser")
const sequelize = require("./config/sequelize")
const cors = require("cors")

const app = express()
const port = process.env.PORT || 3002

const setupRoutes = require("./routes")

app.use(bodyParser.json())
app.use(cors())

setupRoutes(app)

sequelize.initDb()

app.use(({ res }) => {
    const message = "Impossible de trouvé la ressource demandée ! Vous pouvez essayer un autre URL."
    res.status(404).json({ message })
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))