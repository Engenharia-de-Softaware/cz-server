module.exports = (sequelize, Sequelize) => {
    const CheckPoint = sequelize.define("user_check_in", {
          user_id: {
            type: Sequelize.STRING
          },
          latitude: {
            type: Sequelize.STRING
          },
          longitude: {
            type: Sequelize.STRING
          },
          
    },{
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }); 
    return CheckPoint;
};