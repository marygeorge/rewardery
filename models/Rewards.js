module.exports = function (sequelize, DataTypes) {
    var Rewards = sequelize.define("Rewards", {
        // ParentID: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        RewardName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        RewardsDescription: {
            type: DataTypes.STRING,
        },
        RewardPoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
    });
    Rewards.associate = function (models) {
        Rewards.belongsTo(models.Parent,
            {
                foreignKey:
                { allowNull: false }
            });
        
    };

    return Rewards;
};