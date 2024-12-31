const userModel = require("../models/user-model")
const bcrypt = require("bcrypt");

//HOME
const home = async (req, res) => {
    try {
        res.status(200).send("Homie"); 
    } catch (error) {
        console.log(error);
    }
}


//Register
const register = async (req, res) => {
    try {
        const { username, email, phone , password, isAdmin } = req.body;
        console.log(req.body);
        const userExist = await userModel.findOne({ email});
        if (userExist) {
            res.status(400).json({message: "User already exist"});
        }
        
       const userCreated =  await userModel.create({ username, email, phone , password, isAdmin });

        res.status(201).json(
            {
                message: "Registration Successful",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
           });
    } catch (error) {
        console.log("Error: ",error);
        res.status(500).json({message: "Internal server error"});
    }
}

//Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await userModel.findOne({ email});
        if (!userExist) {
            res.status(400).json({message: "User not found"});
        }

        // const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
        const isPasswordCorrect = await userExist.comparePassword(password);
        if (isPasswordCorrect) {
            res.status(200).json(
                {
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            })
        }
        else{
            res.status(400).json({message: "Invalid email or password"});

        }
}
    catch (error) {
        console.log("Error: ",error);
        res.status(500).json({message: "Internal server error"});
    }
}

//user for userdata
const user = async (req, res) => {
    try {
       const userData = req.user;
       console.log("User data: ",userData);
    res.status(200).json({userData});
    } catch (error) {
        console.log("Error from the user route: ",error);
}
}

module.exports = { home, register,login,user };