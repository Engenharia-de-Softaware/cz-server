const { auth } = require("../../models");
const Auth = auth;

exports.getMarkers = (req, res) => {
  try {
    let infected_users = [];
    let markers = [];
    const query = { status: "infected" };

    const users = await Auth.findAll(query);

    users.forEach((user) => {
      const { id } = user;
      markers.push(Mark.findAll({ user_id: id }));
    });

    console.log(user);

    res.status(200).send(markers);
  } catch (err) {
    res.status(500).send({ errors: err });
  }
};
