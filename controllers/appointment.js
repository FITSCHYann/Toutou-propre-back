const { Op, Sequelize } = require('sequelize')
const { Appointment } = require('../config/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')

const getAllById = (req, res) => {
    const clientId = req.query.id

    Appointment.findAll({
        where: {
            clientId: {
                [Op.like]: `%${clientId}%`
            }
        },
        order: ["clientId"]
    })
        .then(appointment => {
            if (appointment === null) {
                const message = "Il n'y a pas de rendez-vous avec cette identifiant."
                return res.status(404).json({ message })
            }
            const message = 'Un ou plusieurs rendez-vous ont été trouvé.'
            res.status(200).json({ message, data: appointment })
        })
        .catch(error => {
            const message = "Les rendes-vous n'ont pas pu être recupérée. Réessayez dans quelques instants."
            res.status(500).json({ message, data: error })
        })
}

const getAll = (req, res) => {

    Appointment.findAll({ order: [["date", "ASC"], ["timeslot", "ASC"]] })
        .then(appointment => {
            const message = 'La liste des rendez-vous a bien été récupérée.'
            res.status(200).json({ message, data: appointment })
        })
        .catch(error => {
            const message = "La liste des rendez-vous n'a pas pu être recupérée. Réessayez dans quelques instants."
            res.status(500).json({ message, data: error })
        })
}


const editOne = (req, res) => {

}

const createOne = (req, res) => {
    try {
        const {
            date,
            timeslot,
            clientId
        } = req.body

        const appointment = Appointment.create({
            date: date,
            timeslot: timeslot,
            clientId: clientId,
        })

        const message = `Le rendez vous a été créé.`;
        res.status(200).json({ message })

    } catch (err) {
        console.error("Erreur lors de la création du rendez-vous :", err);
        res.status(500).json({ error: "Une erreur s'est produite lors de la création du rendez-vous." })
    }
}

const delOne = (req, res) => {

    Appointment.findByPk(req.query.id)
        .then(appointment => {
            if (appointment === null) {
                const message = "Le rendez-vous demandé n'existe pas. Réessayez avec un autre identifiant"
                return res.status(404).json({ message })
            }
            const appointmentDeleted = appointment;
            Appointment.destroy({
                where: { id: appointment.id }
            })
                .then(_ => {
                    const message = `Le rendez-vous avec l'identifiant n°${appointmentDeleted.id} a bien été supprimé.`
                    res.status(200).json({ message, data: appointmentDeleted })
                })
                .catch(error => {
                    const message = "Le rendez-vous n'a pas pu être supprimé. Réessayez dans quelques instants."
                    res.status(500).json({ message, data: error })
                })
        })
}

const getByMonth = async (req, res) => {
    if (req.query.date) {
        const date = req.query.date

        const [year, month] = date.split('-').map(Number);

        return await Appointment.findAll({
            where: {
                date: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('date')), year),
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('date')), month),
                    ]
                }
            },
            order: ["date"]
        })
            .then(appointments => {
                const message = 'La liste des rendez-vous selon la recherche a bien été récupérée.'
                res.status(200).json({ message, data: appointments })
            })
    } else {
        await Appointment.findAll({ order: ["date"] })
            .then(appointments => {
                const message = 'La liste des rendez-vous a bien été récupérée.'
                res.status(200).json({ message, data: appointments })
            })
            .catch(error => {
                const message = "La liste des utilisateurs n'a pas pu être recupérée. Réessayez dans quelques instants."
                res.status(500).json({ message, data: error })
            })
    }
}

module.exports = { getAll, getAllById, editOne, createOne, delOne, getByMonth }