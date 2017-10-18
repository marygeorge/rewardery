module.exports = function (sequelize, DataTypes) {
    var Rewardsredeemed = sequelize.define("Rewardsredeemed", {
        // RewardsID: {
        //     type: DataTypes.Integer,
        //     allowNull: false,
        // },
        // ChildID: {
        //     type: DataTypes.INTEGER,
        // },
        
        RedeemDate: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        RedeemStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });

    Rewardsredeemed.associate = function (models) {
        Rewardsredeemed.belongsTo(models.Rewards,
            {
                foreignKey:
                { allowNull: false }
            });
        Rewardsredeemed.belongsTo(models.Child,
            {
                foreignKey:
                { allowNull: false }
            });
    };
   

    return Rewardsredeemed;
};