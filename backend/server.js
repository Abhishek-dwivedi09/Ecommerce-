const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require("./config/database")

// Handling Uncaught Excepton
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to Uncaught Excepton`)
    process.exit(1)
})



//config
dotenv.config({path:'backend/config/config.env'})

// connection to database
connectDB()

const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running on http://locahost:${process.env.PORT}`)
})


// unhandeled Promise Rejection
 process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log(`shutting down the server due to unhandeled promise Rejection`)
   server.close(()=>{
    process.exit(1)
   })
})