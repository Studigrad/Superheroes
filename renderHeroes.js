const Hero = require('./models/hero');
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/superheroes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })

    Hero.insertMany([{
        nickname: 'SuperMan',
    real_name: 'Clark Kent',
    origin_description:'he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton',
    superpowers:'solar energy absorption and healing factor, solar flare and heat vision,solar invulnerability',
    catch_phrase:'Look, up in the sky, its a bird, its a plane, its Superman!',
    images:'https://stoneforest.ru/wp-content/uploads/2017/10/superman-1.jpg'},
    {
    nickname: 'SuperMan2',
    real_name: 'Clark Kent2',
    origin_description:'he was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton2',
    superpowers:'solar energy absorption and healing factor, solar flare and heat vision,solar invulnerability2',
    catch_phrase:'Look, up in the sky, its a bird, its a plane, its Superman!2',
    images:'https://www.peoples.ru/character/movie/superman/superman_2.jpg'
    },

    ],(err,val)=>{if(err){console.log(err)} console.log(val)})