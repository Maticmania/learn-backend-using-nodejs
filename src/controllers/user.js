const User = require("../models/user")

// CRUD

//Function to get all user
const getsAllUsers = async (req, res) =>{
    try {
        const user = await User.find()
        res.json({success: true, message: 'User Retrived Sucessfully', user})

    } catch (err) {
        res.status(500).json({success: false, message: err.message})

    }
}

//function to get one user
const getOneUser = async (req, res) =>{
    try {
        const { userId } = req.params;
        const  user  = await User.findById(userId)
        if(!user){
            return res.status(404).json({success: false,  message: 'User not found'})
        }
        res.json({success: true, message: "user Retrived sucessfully", user})
    } catch (err) {
        res.status(500).json({success: false, message: err.message})
    }
}

//function to update user information
const updateUser = async (req, res) =>{
    try {
        
    } catch (err) {
        
    }
}

//How to delete user
const deleteUser = async (req, res) =>{
    try {
        
    } catch (err) {
        
    }
}


module.exports = {getsAllUsers, getOneUser}