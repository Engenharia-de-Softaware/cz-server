exports.health = (req, res, next) => {
  try {

    const { cpf } = req.body;
    
    const userHealth = {
      
      cpf: cpf,
      status: "infected"
      
    }
    
    var msg = Buffer.from(typeof userHealth === 'object'
            ? JSON.stringify(userHealth) : userHealth);

    req.body.msg = msg;
    req.body.queue = "cz_health_in";
    
    console.log(userHealth);
    next();

    } catch (err) {
    res.status(500).send({ errors: err });
  }
};

