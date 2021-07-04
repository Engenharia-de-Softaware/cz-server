module.exports = (sequelize, Sequelize) => {
    const CheckPoint = sequelize.define("check_in", {
          user_id: {
            type: Sequelize.STRING
          },
          latitude: {
            type: Sequelize.STRING
          },
          longitude: {
            type: Sequelize.STRING
          },
    }); 
    return CheckPoint;
};