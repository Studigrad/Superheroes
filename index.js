const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')
const Hero = require('./models/hero');
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost:27017/superheroes', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })
  
    app.set('view engine','ejs');
    app.use(express.static('public'))
    app.set('views',path.join(__dirname,'/views'))
    app.use(express.static(path.join(__dirname,'public')))
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    app.use(methodOverride('_method'))

app.get('/',async(req,res)=>{
    const foundHeros = await Hero.find()
    res.render('home',{foundHeros})
})
app.get('/new',(req,res)=>{
    res.render('new')
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
   
    await newHero.save()

    console.log(newHero)
    res.redirect('/')
  
})

app.get('/:id',async(req,res)=>{
     const foundHero = await Hero.findOne({_id:req.params.id})
       console.log(foundHero)
    res.render('editPage',{foundHero})
})

app.get('/:id/edit',async(req,res)=>{
    const foundHero = await Hero.findOne({_id:req.params.id})
    res.render('edit',{foundHero})
})

app.patch('/:id/edit',async(req,res)=>{
    const { nickname,
        real_name,
        origin_description,
        superpowers,
        catch_phrase,
        images} = req.body
        let arr = []
    const foundHero = await Hero.findOne({_id:req.params.id})
    foundHero.nickname = nickname
    foundHero.real_name = real_name
    foundHero.origin_description = origin_description
    foundHero.superpowers = superpowers
    foundHero.catch_phrase = catch_phrase
    arr = foundHero.images
    arr.push(images)
    foundHero.images = arr
    await foundHero.save()
    res.redirect(`/${foundHero._id}`)
})

app.get('/:id/:img',async(req,res)=>{
    const {id,img} = req.params
    const foundHero = await Hero.findById(id)
    foundHero.images.splice(img,1)
    await foundHero.save()
    res.redirect(`/${foundHero._id}`)
})

app.delete('/:id',async (req,res)=>{
         console.log(req.params.id)
        const result = await Hero.findByIdAndDelete(req.params.id)
        res.redirect('/')
})


app.listen(8080,()=>{
    console.log('On port 8080')
})