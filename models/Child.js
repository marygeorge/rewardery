module.exports = function (sequelize, DataTypes) {
    var Child = sequelize.define("Child", {
        // ParentID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        ChildName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ChildUsername: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ChildPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ChildPointsEarned: {
            type: DataTypes.INTEGER,
        },
        
    });
    Child.associate = function (models) {
        Child.belongsTo(models.Parent,
            {
                foreignKey:
                { allowNull: false }
            });
        
    };

    return Child;
};