module.exports = (sequelize, DataTypes) => {
    const Issued = sequelize.define("Issued", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        librarianId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dateLoaned: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        fineAmount: {
            type: DataTypes.DECIMAL(18, 2),
            allowNull: false,
        },
        returned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    }, {
        timestamps: false // disable `createdAt` and `updatedAt` timestamps
    })
    return Issued
}