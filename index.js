let express = require('express')

let multer = require('multer')

let xlsx = require('xlsx')

const fs = require('fs')

const path = require('path')

const upload = multer({
    dest: "uploads/"
})

let app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/exceltojson',upload.single('file'), (req,res)=>{
    console.log(req.file.path)
})

app.listen(5000,() =>{
    console.log("App is listening at the 5000")
})