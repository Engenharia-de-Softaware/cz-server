

exports.getMarkers = (req, res) => {
  try {
    
    res.status(200).send(data);

    } catch (err) {
    res.status(500).send({ errors: err });
  }
};
