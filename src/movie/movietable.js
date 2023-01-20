const {DataTypes} = require("sequelize");
const {sequelize} = require("../db/connection");

const Movie = sequelize.define("Movie", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    director: {
        type: DataTypes.STRING,
        defaultValue: "Not known",
        allowNull: true,
        unique: true
    },
    addedby: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Not known"
    }
});

module.exports = Movie;