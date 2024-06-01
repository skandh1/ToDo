import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

const options = {
    serverApi: {
        version: ServerApiVersion.v1, 
        strict: true,
        deprecationErrors: true, 
    }
}

let client; 

const connectToMongoDb = async () => {
    if (!client) {
        try {
            client = await MongoClient.connect(uri, options);
            console.log("connected to mongodb...")
        } catch (error) {
            console.log(error);
        }
    }
    return client;
}

const getConnectedClient = () => client;

export {getConnectedClient, connectToMongoDb}