const userModel = require("../models/user-model")
const bcrypt = require("bcrypt");

//HOME
const home = async (req, res) => {
    try {
        res.status(200).send("Home Page"); 
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

        //  Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        //  Find user in the database
        const userExist = await userModel.findOne({ email });

        // If user does not exist, stop execution
        if (!userExist) {
            return res.status(400).json({ message: "User not found" });
        }

        //  Compare password securely
        const isPasswordCorrect = await userExist.comparePassword(password);

        //  If password is incorrect, stop execution
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        //  Generate JWT Token
        const token = await userExist.generateToken();

        // Send successful response
        return res.status(200).json({
            message: "Login Successful",
            token,
            userId: userExist._id.toString(),
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


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