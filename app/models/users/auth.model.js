module.exports = (sequelize, Sequelize) => {
    const Auth = sequelize.define("user", {
        name: {
            type: Sequelize.STRING
          },
          email: {
            type: Sequelize.STRING
          },
          cpf: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          }
    });
      
        
    return Auth;
  };