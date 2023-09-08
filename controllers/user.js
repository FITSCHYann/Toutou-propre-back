const { Op } = require('sequelize')
const { User } = require('../config/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

const getOne = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (user === null) {
                const message = "L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant."
                return res.status(404).json({ message })
            }
            const message = 'Un utilisateur a bien été trouvé.'
            res.status(200).json({ message, data: user })
        })
        .catch(error => {
            const message = "L'utilisateur' n'a pas pu être recupérée. Réessayez dans quelques instants."
            res.status(500).json({ message, data: error })
        })
}

const GetOneByMail = (req, res) => {
    if (req.query.email) {
        User.findOne({
            where: {
                email: req.query.email
            }
        })
            .then(user => {
                if (user === null) {
                    const message = "L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant."
                    return res.status(404).json({ message })
                }
                const message = 'Un utilisateur a bien été trouvé.'
                res.status(200).json({ message, data: user })
            })
            .catch(error => {
                const message = "L'utilisateur' n'a pas pu être recupérée. Réessayez dans quelques instants."
                res.status(500).json({ message, data: error })
            })

    }

}

const getAll = async (req, res) => {
    if (req.query.lastname) {
        const lastname = req.query.lastname
        if (lastname.length < 2) {
            const message = `Le terme de recheche doit contenir au moins 2 caractères.`
            return res.status(400).json({ message })
        }
        return await User.findAll({
            where: {
                lastname: {
                    [Op.like]: `%${lastname}%`
                }
            },
            order: ["lastname"]
        })
            .then(users => {
                const message = 'La liste des utilisateurs selon la recherche a bien été récupérée.'
                res.status(200).json({ message, data: users })
            })
    } else {
        await User.findAll({ order: ["lastname"] })
            .then(users => {
                const message = 'La liste des utilisateurs a bien été récupérée.'
                res.status(200).json({ message, data: users })
            })
            .catch(error => {
                const message = "La liste des utilisateurs n'a pas pu être recupérée. Réessayez dans quelques instants."
                res.status(500).json({ message, data: error })
            })
    }
}

const editOne = (req, res) => {
    const id = req.params.id
    User.update(req.body, {
        where: { id: id }
    })
        .then(_ => {
            return User.findByPk(id).then(user => {
                if (user === null) {
                    const message = "L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant"
                    return res.status(404).json({ message })
                }
                const message = `L'utilisateur ${user.name} a bien été modifié.`
                res.status(200).json({ message, data: user })
            })
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = "L'utilisateur n'a pas pu être modifié. Réessayez dans quelques instants."
            res.status(500).json({ message, data: error })
        })

}

const delOne = (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (user === null) {
                const message = "L'utilisateur demandé n'existe pas. Réessayez avec un autre identifiant"
                return res.status(404).json({ message })
            }
            const userDeleted = user;
            User.destroy({
                where: { id: user.id }
            })
                .then(_ => {
                    const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`
                    res.status(200).json({ message, data: userDeleted })
                })
                .catch(error => {
                    const message = "L'utilisateur n'a pas pu être supprimé. Réessayez dans quelques instants."
                    res.status(500).json({ message, data: error })
                })
        })
}

module.exports = { getOne, getAll, editOne, delOne, GetOneByMail }