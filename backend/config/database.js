const mongoose = require("mongoose");


const connectDB = () => {
        mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        }).then((data)=>{
            console.log("db is connected...")
        })

    
}

module.exports = connectDB;