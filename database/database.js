const { db_name, db_user, db_pass} = require("../config.json")
const { Sequelize } = require("sequelize")

module.exports = new Sequelize(db_name, db_user, db_pass, {
    host: '51.81.28.100',
    dialect: 'mysql'
})