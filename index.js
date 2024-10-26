let express = require('express')

let app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index')
})

app.listen(5000,() =>{
    console.log("App is listening at the 5000")
})