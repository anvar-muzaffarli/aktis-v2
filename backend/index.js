const express = require("express")
require("dotenv").config()
// Marshrutlarin yerleshdirilmesi
const userRoutes = require("./routes/userRoutes.js")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()


const PORT_NOMRESI = process.env.PORT || 3500

// Middleware - ara katman proqramlari

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


// Middleware 
app.use('/api',userRoutes)


app.listen(PORT_NOMRESI, ()=> {
    console.log(`Serverimiz ${PORT_NOMRESI} da calisir :)`)
})
