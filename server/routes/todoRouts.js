const express= require("express")
const router= express.Router()
const verifyJWT = require("../middleware/verifyJWT")

const todoController=require("../controllers/todoController")
router.get("/",todoController.getAllTodo)
router.post("/", todoController.createNewTodo)
router.put("/", todoController.updateTodo)
router.delete("/:id", todoController.deleteTodo)
module.exports=router
