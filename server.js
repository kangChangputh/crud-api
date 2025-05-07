import express from 'express';
import dotenv from 'dotenv';
import connectToDB from './database/db.js';
import { Todo } from './models/todo.model.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 4000

// middleware
app.use(express.json());

connectToDB();

// TODO APIs
// Get all Todos
app.get('/todos', async (req, res) => {
    try {
        const result = await Todo.find();
        res.send({
            success: true,
            meesage: "Todo Lists Retreived Successfullt",
            data: result
        });

    } catch (error) {
        res.send({
            success: false,
            meesage: "Failed to Retreived Successfullt",
            data: result
        });

    }
});

// Create To do list
app.post('/create-todo', async (req, res) => {
    const todoDetails = req.body;
    try {
        const result = await Todo.create(todoDetails);
        res.send({
            success: true,
            message: "To do has been created successfully",
            data: result
        });
    } catch (error) {
        console.log(error)
        res.send({
            success: false,
            message: "Failed to create To do list",
            data: result
        });

    }
});

// Get a single To do
app.get('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const result = await Todo.findById(todoId);
        res.send({
            success: true,
            message: "To do is retrieved",
            data: result
        });

    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            message: "Failed to retrieve To do"
        });

    }
});

// Update Todo
app.patch('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    const updateTodo = req.body;
    try {
        const result = await Todo.findByIdAndUpdate(todoId, updateTodo, {
            new: true,
        });
        if (!todoId) {
            return res.status(404).json({ message: `Todo with id:${todoId} not found` })
        };
        res.send({
            success: true,
            message: "To do is updated successfully!",
            data: result
        });

    } catch (error) {
        res.send({
            success: false,
            message: "Failed to update To do",

        });

    }
});

// Delete Todo
app.delete('/delete/:todoId', async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.todoId);
        const result = await Todo.find();
        res.send({
            success: true,
            message: "Todo is deleted successfully!",
            data: result
        });
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to delete To do"
        });

    }
})


app.get('/', (req, res) => {
    res.send({
        success: true,
        message: "Server is active"

    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
