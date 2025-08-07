const mongoose = require("mongoose")

const  connectDB = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('connect to db')
        })
    } catch (error) {
        console.log("error while connecting db")
    }
}

module.exports = connectDB;