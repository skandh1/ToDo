import express from "express";
import dotenv from "dotenv"
import { router } from "./routes.js";
import cors  from "cors"
import {connectToMongoDb} from "./database.js"
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json())
app.use("/api", router);

app.get("/hello", (req, res) => {
    res.status(200).json({message: "hello"})
})

const port = process.env.PORT || 5000;  

async function startServer() {
    await connectToMongoDb();
    app.listen(port, () => {
        console.log(`Server is listening of port  http://localhost:${port}`)
    })
}
startServer(); 
