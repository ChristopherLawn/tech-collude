const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Post model
class Post extends Model { }

Post.init(
    {

        post_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false
        },

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;