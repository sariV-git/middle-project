
const User = require("../models/User")

const createNewUser = async (req, res) => {
    const { name, username, email, address, phone } = req.body
    if (!name) {
        return res.status(400).json({ message: "name is required" })
    }
    const user = await User.create({ name, username, email, address, phone })
    if (user) {
        // return res.json({ message: "New user created", user: user })
        const users = await User.find().lean()
        if (!users) {
            return res.status(400).json({ message: "No users found" })
        }
        res.json(users)
    }
    else {
        return res.status(400).json({ message: "Invalid user" })
    }
}


const getAllUsers = async (req, res) => {
    const users = await User.find().lean()
    if (!users) {
        return res.status(400).json({ message: "No users found" })
    }
    res.json(users)
}

const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).lean()
    if (!user) {
        return res.status(400).json({ message: "No user found" })
    }
    res.json(user)
}

const updateUser = async (req, res) => {
    const { _id, name, username, email, address, phone } = req.body
    if (!_id || !name) {
        return res.status(400).json({ message: "name and id are required" })
    }
    const user = await User.findById(_id).exec()
    if (!user) {
        return res.status(400).json({ message: "User no found" })
    }
    user.name = name
    user.username = username
    user.email = email
    user.address = address
    user.phone = phone
    const updateUser = await user.save()
    // res.json(`"${updateUser.name}"updated`)
    const users = await User.find().lean()
    if (!users) {
        return res.status(400).json({ message: "No users found" })
    }
    res.json(users)

}

const deleteUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: "User no found" })
    }
    const result = await user.deleteOne()
    // res.json(result)
    const users = await User.find().lean()
    if (!users) {
        return res.status(400).json({ message: "No users found" })
    }
    res.json(users)
}

module.exports = {
    createNewUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}