module.exports = function (sequelize, DataTypes) {
    var Tasks = sequelize.define("Tasks", {
        // ParentID: {
        //     type: DataTypes.INGEGER,
        // },
        // ChildID: {
        //     type: DataTypes.INTEGER,
        // },
        TaskName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        TaskDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        TaskPoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        StartDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        EndDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        TaskType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Mandatory: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        TaskStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Tasks.associate = function (models) {
        Tasks.belongsTo(models.Parent,
            {
                foreignKey:
                { allowNull: false }
            });
            
        Tasks.belongsTo(models.Child,
            {
                foreignKey:
                { allowNull: false }
            });
    };
   

    return Tasks;
};