module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("Book", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isbn: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        publicationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        available: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false // disable `createdAt` and `updatedAt` timestamps
    })
    return Book
}