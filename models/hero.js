const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    nickname: String,
    real_name: String,
    origin_description:String,
    superpowers:String,
    catch_phrase:String,
    images:Array
})

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;