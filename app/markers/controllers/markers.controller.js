const { marker, auth, Sequelize } = require("../../models");
const Mark = marker;
const Auth = auth;
const Op = Sequelize.Op;


exports.getMarkers = async (req, res) => {
  try {

    let markers_list = [];
    const query = { status: "infected"};
  
    const users = await Auth.findAll({where:query});

    const user_points = await filter_points(users);

    for(let marked_point in user_points){

      let aux = marked_point.split(',');
      markers_list.push({latitude: aux[0], longitude: aux[1], quantidade: user_points[marked_point]});

    }
  
    res.status(200).send(marked_point);

  } catch (err) {
    res.status(500).send({ errors: err });
  }
};

async function filter_points(users){

  try {

    let user_points = {};

    for(let user of users){

      const { id } = user.dataValues;
      const users_markers = await Mark.findAll({where: {user_id: `${id}`}}); 

      for(let points of users_markers){

        const { latitude, longitude } = points.dataValues;
        const key = `${latitude},${longitude}`;
        
        user_points[key] = user_points[key] ? user_points[key] += 1 : 1;
        console.log(user_points[key]);
      
      }
    }
  
    return user_points;
    
  } catch (error) {
    console.log(error);
    
  }



}
