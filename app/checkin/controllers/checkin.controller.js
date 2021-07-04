const queue = require('../../queues/publisherQueue');

exports.checkIn = (req, res, next) => {
  try {

    console.log("OIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    
    
    const { user_id, latitude, longitude } = req.body;
    
    const userCheckin = {
      
      user_id: user_id,
      latitude: latitude,
      longitude: longitude
      
    }
    
    var msg = Buffer.from(typeof userCheckin === 'object'
            ? JSON.stringify(userCheckin) : userCheckin);

    req.body.msg = msg;

    console.log(msg);
    console.log("OIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    // await queue(msg);
    
    
    next();

    } catch (err) {
    // console.log("kkkkkkkkkkkkk");
    res.status(500).send({ errors: err });
  }
};

// exports.publisher = async (req, res) => {
//   try {

//     console.log("OIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    
    
//     const { user_id, latitude, longitude } = req.body;
    
//     const userCheckin = {
      
//       user_id: user_id,
//       latitude: latitude,
//       longitude: longitude
      
//     }
    
//     var msg = Buffer.from(typeof userCheckin === 'object'
//             ? JSON.stringify(userCheckin) : userCheckin);

//     req.body.msg = msg;

//     // console.log(msg);
//     // console.log("OIEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
//     // await queue(msg);
    
    
//     res.status(200).send();

//     } catch (err) {
//     // console.log("kkkkkkkkkkkkk");
//     res.status(500).send({ errors: err });
//   }
// };
