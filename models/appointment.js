module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Appointment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            primaryKey: true,
        },

        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        timeslot: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        clientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    })
}