import exp from 'express'
import {connect} from 'mongoose'
import {config} from 'dotenv'
config()

const app = exp()
app.use(exp.json())

const connectDB = async() => {
    try{
        await connect(process.env.DB)
        console.log("database connected")
        const port = process.env.PORT
        app.listen(port, () => console.log(`server running on ${port}`))
    }
    catch(err){
        console.log(err)
    }
}
connectDB()