import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {};

// to avoid multiple connections on db, it is possible but it can choke db by consuming memory , CPU it will increase the load on the server.
async function dbConnect(): Promise<void> { // promise<void> = it will return nothing
    if (connection.isConnected) {
        console.log("Already connected to database");
        return
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '')
        // console.log(db);
        // console.log(db.connections[0]);

        connection.isConnected = db.connections[0].readyState

        console.log("DB connected successfully");

    } catch (error) {
        console.log("Database connection failed:", error)
        process.exit(1);
    }

}

export default dbConnect;