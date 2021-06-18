
exports.env = {
  port: process.env.SERVER_PORT || 8050,
  jwtSecret: 'myS33!!creeeT', // CF6319D321CCE33BDD372F29CC2DAB0CBDD39A56748C5BCCE389FBCD4DB02421
  jwtOptions: {
    expiresIn: '15m',
  },
  permissions: {
    NORMAL_USER: 1,
    MAINTAINER: 1024,
    ADMIN: 2048,
  },
};
