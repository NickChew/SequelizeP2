const {DataTypes} = require("sequelize");
const {sequelize} = require("../db/connection");

const Actor = sequelize.define("Actor", {
    name: {
        type: DataTypes.STRING,
        defaultValue: "Not specified",
        allowNull: false,
        unique: true
    },
    info: {
        type: DataTypes.STRING,
        defaultValue: "Not specified",
        unique: true
    }
});

module.exports = Actor;