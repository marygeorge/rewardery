module.exports = function (sequelize, DataTypes) {
    var Parent = sequelize.define("Parent", {
        ParentFirstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ParentLastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ParentEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        ParentUsername: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ParentPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });

    return Parent;
};