const mongoose = require('mongoose')
const Hero = require('./models/hero');
const databaseName = 'superheroes'
const express = require('express')
const app = express()
const axios = require('axios');
jest.setTimeout('20000')
beforeAll(async () => {
  mongoose.connect('mongodb://localhost:27017/superheroes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })
})
afterAll(async () => {
  await Hero.deleteMany()
})
app.post('/new',async(req,res)=>{
    const {nickname,real_name,origin_description,superpowers,catch_phrase,images} = req.body
    const newHero = await new Hero({
        nickname:nickname,
        real_name:real_name,
        origin_description:origin_description,
        superpowers:superpowers,
        catch_phrase:catch_phrase,
        images:images
    })

   const result = await newHero.save()
    console.log(newHero)
    res.json(result)
  
})

app.delete('/:id',async (req,res)=>{
  console.log(req.params.id)
 const result = await Hero.findByIdAndDelete(req.params.id)
    return res
})

test('Should save hero to database', ()  => {
    const url = '01.jpg'
    let data = {
      nickname:'Spider-Man',
      real_name:'Peter-Parker',
      origin_description:'From NY',
      superpowers:'Webs',
      catch_phrase:'I am spider-man',
      images:url
    }
    return axios.post('http://localhost:8080/new',data).then(async(data)=>{
      const newHero = await Hero.findOne({nickname:'Spider-Man'})
      expect(newHero.nickname).toBeTruthy()
      expect(newHero.real_name).toBeTruthy()
      expect(newHero.origin_description).toBeTruthy()
      expect(newHero.superpowers).toBeTruthy()
      expect(newHero.catch_phrase).toBeTruthy()
      expect(newHero.images).toBeTruthy()
      return(data)
    }).catch((e)=>{
      console.log(e)
      return(e)
    })
  })
  test('Should delete hero from database', async()  => {
    const newHero = await Hero.findOne({nickname:'Spider-Man'})
    console.log(newHero._id)
    return await axios.delete(`http://localhost:8080/${newHero._id}`).then((data)=>{
      expect(data).toBeTruthy()
      return data
    }).catch((e)=>{
      console.log(e)
      return e
    })  
  })