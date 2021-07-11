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
          status: {
            type: Sequelize.STRING
          },
          password: {
            type: Sequelize.STRING
          }
    },
    {
      timestamps: true,
      createdAt: "inserted_at",
      updatedAt: "updated_at",
    } 
    
    );
      
        
    return Auth;
  };