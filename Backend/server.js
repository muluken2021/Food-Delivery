import express from 'express'
import cors from 'cors'
import { connectDB } from './config/Db.js'
import FoodRouter from './routes/FoodRouter.js'

// config

const app = express()
const port = 4000

// middleware

app.use(express.json())
app.use(cors())


// db connection 
connectDB()

// api end pointes
app.use('/api/food', FoodRouter)
app.use('/images', express.static('uploades'))

app.get('/' , (req,res)=>{
    res.send("API is working....")
})

app.listen(port, ()=>{
    console.log(`Server Listening at port ${port}`)
})