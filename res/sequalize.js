const Sequelize = require('sequelize');
const methodModel = require('./../models/method');
const alphaModel = require('./../models/alpha');
const intentionModel = require('./../models/intention');

const sequelize = new Sequelize('essence_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Method = methodModel(sequelize, Sequelize);
const Alpha = alphaModel(sequelize, Sequelize);
const Intention = intentionModel(sequelize, Sequelize);
const MethodIntention = sequelize.define('method_intention', {});

Method.belongsToMany(Intention, { through: MethodIntention, unique: false });
Intention.belongsToMany(Method, { through: MethodIntention, unique: false });

sequelize.sync({ force: true })
    .then(() => {
        console.log(`Database & tables created!`)
    });

module.exports = {
    Method,
    Alpha,
    Intention
};
