module.exports = (sequelize, Sequelize) => {
  const Jobs = sequelize.define("jobs", {
  	userId: {
 		type: Sequelize.INTEGER
  	},
    title: {
      type: Sequelize.STRING
    },
	  description: {
      type: Sequelize.STRING
    },
    date: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    street: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
    state: {
      type: Sequelize.STRING
    },
    country: {
      type: Sequelize.STRING
    }
    
  });

  return Jobs;
};
