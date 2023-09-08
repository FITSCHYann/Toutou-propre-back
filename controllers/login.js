const { User } = require('../config/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require("../config/private_key")

const signIn = (req, res) => {

    User.findOne({ where: { email: req.body.email } }).then(user => {

        if (!user) {
            const message = `L'utilisateur demandé n'existe pas.`
            return res.status(404).json({ message })
        }
        bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
            if (!isPasswordValid) {
                const message = `Le mot de passe est incorrect.`;
                return res.status(401).json({ message })
            }

            const token = jwt.sign({ userId: user.id }, privateKey, { expiresIn: '1h' })

            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token })
        })
    })
        .catch(error => {
            const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants.`;
            return res.json({ message, data: error })
        })
}

const signUp = async (req, res) => {
    try {
        const {
            email,
            password,
            dogname,
            dogtype,
            lastname,
            firstname,
            phone
        } = req.body

        const existingUser = await User.findOne({ where: { email: email } })

        if (existingUser) {
            const message = `L'email existe deja.`
            return res.status(404).json({ message })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            email: email,
            password: hashedPassword,
            dogname: dogname,
            dogtype: dogtype,
            lastname: lastname,
            firstname: firstname,
            phone: phone,
        })

        const message = `L'utilisateur a été créé.`;
        return res.status(200).json({ message })

    } catch (err) {
        console.error("Erreur lors de la création de l'utilisateur :", err);
        res.status(500).json({ error: "Une erreur s'est produite lors de la création de l'utilisateur." })
    }
}

module.exports = { signIn, signUp }