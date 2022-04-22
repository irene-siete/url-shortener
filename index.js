const mongoose=require('mongoose')
const express=require('express')
const ShortUrl= require('./models/schema')
require('dotenv').config()
const app=express()

const PORT=process.env.PORT
const MONGODB=process.env.MONGODB_URI

app.set('view engine', 'ejs');

mongoose.connect(MONGODB,{
    useNewUrlParser: true, useUnifiedTopology:true
})

app.use(express.urlencoded({extended: false}))

app.get('/',  async (req, res)=>{
    const shortUrls= await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})

app.post('/shortUrls', async (req,res)=>{
    const {full, short, clicks}= req.body
    await ShortUrl.create({full})
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res)=>{
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortUrl==null){
        return res.sendStatus(404)
    }
    shortUrl.clicks++
    shortUrl.save()
    res.redirect(shortUrl.full)
})

app.listen(PORT,()=>{
    console.log("abierto")

})