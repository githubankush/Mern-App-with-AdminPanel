const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");


// update user by Id
const updateUserById = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedDATA = await User.updateOne({_id:id},{
            $set:updatedUserData,
        });

        return res.status(200).json(updatedDATA);

    }
    catch(error)
    {
        next(error);
    }
}

// get single user by Id
const getUserById = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const user = await User.findById({_id:id}, {password:0});
        return res.status(200).json(user);
        
    }
    catch(err){
        next(err);
    }
}


// get users from User Model
const getAllUsers = async (req,res)=>{
    
    try{
        const users = await User.find({},{password:0});
        if(!users || users.length === 0){
            return res.status(404).json({message:"No users found"})
        }
        return res.status(200).json(users);
    }
    catch(err){
        next(err);
    }
}

// get contacts from Contact Model
const getAllContacts = async (req,res)=>{
    try{
        const contacts = await Contact.find();
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message:"No contacts found"})
        }
        return res.status(200).json(contacts);
    }
    catch(err){
        next(err);
    }
}

// get services from Service Model
const getAllServices = async (req,res,next)=>{
    try{
        const services = await Service.find();
        if(!services || services.length === 0){
            return res.status(404).json({message:"No services found"})
        }
        return res.status(200).json(services);
    }
    catch(error)
    {
        next(error);
    }
}

// to delete user by id from User Model (by admin panel)
const deleteUserById = async (req,res,next)=>{
    try{
        const id = req.params.id;
        await User.deleteOne({_id: id});
        return res.status(200).json({message:"User deleted successfully"})
    }
    catch(err){
        next(err);
    }
}
// to delete contact by id from Contact Model (by admin panel)
const deleteContactById = async (req,res,next)=>{
    try{
        const id = req.params.id;
        await Contact.deleteOne({_id: id});
        return res.status(200).json({message:"Contact deleted successfully"})
    }
    catch(err){
        next(err);
    }
}


module.exports = {getAllUsers, getAllContacts, getAllServices,deleteUserById,deleteContactById,getUserById,updateUserById};