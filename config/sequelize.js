const { Sequelize, DataTypes } = require('sequelize')
const users = require("../datas/users")
const appointments = require("../datas/appointments")
const AppointmentModel = require("../models/appointment")
const UserModel = require('../models/user')

const bcrypt = require("bcrypt")
const moment = require('moment/moment')

const sequelize = new Sequelize('Toutou-propre', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: false
})

const User = UserModel(sequelize, DataTypes)
const Appointment = AppointmentModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({ force: true }).then(_ => {

        users.map(async (user) => {
            User.create({
                email: user.email,
                password: await bcrypt.hash(user.password, 10),
                lastname: user.lastname,
                firstname: user.firstname,
                phone: user.phone,
                birthday: user.birthday,
                adress: user.adress,
                zipcode: user.zipcode,
                city: user.city,
                country: user.country,
                dogname: user.dogname,
                dogtype: user.dogtype,
                role: user.role,

            }).then(user => console.log(user.toJSON()))
        })

        appointments.map(async (appointment) => {
            Appointment.create({
                date: appointment.date,
                timeslot: appointment.timeslot,
                clientId: appointment.clientId,

            }).then(user => console.log(user.toJSON()))
        })

        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, User, Appointment
}