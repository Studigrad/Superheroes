<form action="">
<div class="container mb-3">
<div class="row align-items-start">
<div class="col">
    <div class="card ">
        <div class="card-header fs-1 " >
                <cite   title="Source Title"> <%= hero.nickname %> / </cite>
                <p class="text-end d-inline"><cite  class="text-end" title="Source Title"> <%= hero.real_name %> </cite></p>
            </div>
            <div class="card-body"> 

                <p class="text-end"><button type="button" class="btn btn-primary">EDIT</button></p>
                
                <p class="centered ">Superpowers</p>
                <ul class="list-group list-group-flush" >
                    <% for(let list of hero.superpowers.split(',')) {%> 
                    <li class="list-group-item centered"><%= list %> </li>
                    <% } %> 
                </ul>
            <blockquote class="blockquote mb-0">
                <p><%= hero.origin_description %> </p>
                <footer class="blockquote-footer"><%= hero.catch_phrase %> </footer>
            </blockquote>
            </div>
            <img src=<%= hero.images[0] %> class="card-img-bottom" alt="...">
        </div>
    </div>
</div> 
</div>
</form>









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

    app.use(methodOverride('_method'))
    app.set('view engine','ejs');
    app.set('views',path.join(__dirname,'/views'))
    app.use(express.static(path.join(__dirname,'public')))
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())

app.get('/',async(req,res)=>{
    const foundHeros = await Hero.find()
   // console.log(foundHeros)
    res.render('home',{foundHeros})
})
app.get('/new',(req,res)=>{
    res.render('new')
})
app.post('/new',async(req,res)=>{
    const {nickname,real_name,origin_description,superpowers,catch_phrase,images} = req.body
       // console.log(typeof images)
       
        let arr = []
        if(typeof images == 'object'){
            for(let img of images){
            arr.push(img)
            }
        }
        else{
            arr.push(images)
        }
        
    const newHero = await new Hero({
        nickname:nickname,
        real_name:real_name,
        origin_description:origin_description,
        superpowers:superpowers,
        catch_phrase:catch_phrase,
        images:arr
    })
        
        //const newHero = await Hero(req.body)
    await newHero.save()

    console.log(newHero)
    res.redirect('/')
  
})
app.delete('/home/:id',async (req,res)=>{
         console.log(req.params.id)
        const result = await Hero.findByIdAndDelete(req.params.id)
        res.redirect('/')
})
app.get('/edit/:id',async(req,res)=>{
    try{
        const {id} = req.params
        console.log('id: ' + id + ' type: ' + typeof id);
        const foundHero = await Hero.findById(req.params.id)
        //console.log(foundHero)
        res.render('editPage',{foundHero})
    }catch(e){
        console.log(e)
    }
   
})

app.listen(8080,()=>{
    console.log('On port 8080')
})