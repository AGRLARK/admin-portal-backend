const mongoose = require('mongoose');

const connectDB = async (MONGODB_URI) => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            maxPoolSize: 10,
            socketTimeoutMS: 30000,  // Timeout for socket inactivity
            connectTimeoutMS: 30000, // Timeout for establishing a connection
            useUnifiedTopology: true,
            maxPoolSize: 10,
        });
    } catch (error) {
        throw error;
    }
};

module.exports = connectDB;
