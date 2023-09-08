module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(180),
            allowNull: false,
            unique: {
                msg: "Cette e-mail est déja pris."
            },
            validation: {
                notEmpty: { msg: "L'email ne peut pas être vide." },
                notNull: { msg: "L'email est une propriété requise." }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validation: {
                notEmpty: { msg: "Le mot de passe ne peut pas être vide." },
                notNull: { msg: "Le mot de passe est une propriété requise." }
            }
        },
        lastname: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: {
                msg: "Ce nom est déja pris."
            }
        },
        firstname: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
            validation: {
                max: {
                    args: [10],
                    msg: "Le numéro de téléphone ne doit pas être supérieur à 10 chiffres."
                }
            }
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        adress: {
            type: DataTypes.STRING(180),
            allowNull: true,
        },
        zipcode: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        city: {
            type: DataTypes.STRING(180),
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING(180),
            allowNull: true,
        },
        dogname: {
            type: DataTypes.STRING(180),
            allowNull: false,
        },
        dogtype: {
            type: DataTypes.STRING(180),
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
    })
}