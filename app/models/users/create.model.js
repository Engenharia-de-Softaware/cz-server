

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    cpf: {
      type: Sequelize.STRING,
      unique: true
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "Good"
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

  return User;
};
