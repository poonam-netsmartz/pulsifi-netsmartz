module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "pulsifi",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// module.exports = {
//   HOST: "pulsifi.cdrxk7ymstij.us-east-2.rds.amazonaws.com",
//   USER: "pulsifi",
//   PASSWORD: "Pulsifi123$",
//   DB: "pulsifi",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
