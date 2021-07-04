const { marker } = require("../../models");
const Mark = marker;

exports.getMarkers = (req, res) => {
  try {

    let markers_list = [];
    let user_points = {};
    const query = { status: "infected"};
  
    const users = await Auth.findAll(query);

    users.forEach(user => {

      const { id } = user;
      const users_markers = Mark.findAll({user_id: id}); 

      users_markers.forEach(points => {;

        const { latitude, longitude } = points;
        const key = `${latitude},${longitude}`;

        user_points[key] += user_points[key] ? user_points[key] += 1 : 1;

      });

    });

    for(let marked_point in user_points){

      let aux = marked_point.split(',');
      markers_list.push({latitude: aux[0], longitude: aux[1], quantidade: user_points[marked_point]});

    }
  
    res.status(200).send(markers_list);

  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
