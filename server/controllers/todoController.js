const Todo=require("../models/Todo")

const getAllTodo = async (req, res) => {
    const todos = await Todo.find().lean()
    if (!todos) {
        return res.status(400).json({ message: "No todos found" })
    }
    res.json(todos)
}

const createNewTodo = async (req, res) => {
    const { title, tags} = req.body
    if (!title) {
        return res.status(400).json({ message: "title is required" })
    }
    const todo = await Todo.create({ title, tags})
    if (todo) {
        const todos = await Todo.find().lean()
        return res.json(todos)
        // const todos =await getAllTodo()
        // return res.json(todos)
    }
    else {
        return res.status(400).json({ message: "Invalid todo" })
    }
}

const updateTodo = async (req, res) => {
    const { id,title, tags,completed } = req.body
    if (!id || !title) {
        return res.status(400).json({ message: "title and id are required" })
    }
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(400).json({ message: "Todo no found" })
    }
    todo.title = title
    todo.tags=tags
    todo.completed=completed
    const updateTodo = await todo.save()
    // res.json(`"${updateTodo.title}"updated`)
    const todos = await Todo.find().lean()
    return res.json(todos)
}

const deleteTodo = async (req, res) => {
    
    const { id } = req.params
    const todo = await Todo.findById(id).exec()
    if (!todo) {
        return res.status(400).json({ message: "Todo no found" })
    }
    const result = await todo.deleteOne()
    // const reply = `Todo ${todo.title} Id ${todo._id} delete`
    // res.json(reply)
    if(result){
        const todos = await Todo.find().lean()
        return res.json(todos)
    }
    
}
module.exports={
    getAllTodo,
    createNewTodo,
    updateTodo,
    deleteTodo
}