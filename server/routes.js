import express from "express"
import { getConnectedClient } from "./database.js";
import { ObjectId } from "mongodb";

const getCollection = () => {
    const client = getConnectedClient();
    const collection = client.db("todosdb").collection("todos");
    return collection;

}

const router = express.Router();

router.get('/todos', async (req, res) => {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos)
});

router.post("/todos", async (req, res) => {
    const collection = getCollection();
    let {todo} = req.body

    if (!todo) {
        return res.status(404).json({message: "no data found"})
    }

    const newTodo = await collection.insertOne({todo, status: false})
    console.log(req.body)
    res.status(201).json({todo, status: false, _id: newTodo.insertedId})
});

router.delete("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const deleteTodo = await collection.deleteOne({ _id });
    res.status(200).json(deleteTodo)
});

router.put("/todos/:id", async (req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status } = req.body;

    const updateTodo = collection.updateOne({ _id }, { $set: { status: !status } })

    res.status(200).json(updateTodo)
});

export { router };