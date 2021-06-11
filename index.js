const cors = require('cors')

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const http = require('http');
const express = require('express');
const app = express();

const blacklist = [];
app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  const index = blacklist.findIndex(item => item == token);
  if(index != -1) return res.status(401).end();

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });

    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

//
// POST - SIGNIN
//
app.post('/signin', (req, res, next) => {
  //esse teste abaixo deve ser feito no seu banco de dados
  console.log(req.body);
  if (req.body.email === 'joison' && req.body.senha === 'netflix') {
    //auth ok
    const userId = 1; //esse id viria do banco de dados
    const token = jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: 300 // expires in 5min
    });
    return res.json({ id: userId, token: token });
  }

  res.status(401).json({ message: 'Login inválido!' });
})
//
// FIM POST - SIGNIN
//

//
// POST - SIGNUP
//

app.post('/signup', (req, res, next) => {
  
  // Fazer cadastro no banco de dados 

  const { user, name, email, cpf, senha } = req.body;

  // Mudar quando realizar o cadastro no banco
  userId = 0;

  return res.json({ id: userId, name, email });

})

//
// FIM POST - SIGNUP
//

//
// POST - SIGNOUT
//

app.post('/logout', verifyJWT, function (req, res) {
  blacklist.push(req.headers['x-access-token']);
  res.json({ token: null });
})

//
// FIM POST - SIGNOUT
//

//
// GET - GetMarkers
//

app.get('/getmarkers', verifyJWT, (req, res, next) => {
  
  // lista de marcadores que veio do banco de dados
  marcadores = {};

  res.json(marcadores);
})

//
// FIM GET - GetMarkers
//

//
// POST - CHECKIN
//

app.post('/checkin', verifyJWT, (req, res, next) => {

  const { latitude, longitude } = req.body;

  // cadastra latitude e longitude no banco

  res.json({ boolean: true });
})

//
// FIM POST - CHECKIN
//

const server = http.createServer(app);
server.listen(3000);
console.log("Servidor escutando na porta 3000...")
