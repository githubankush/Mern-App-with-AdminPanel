const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    
})

 
// Hashing password
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        
    } catch (error) {
        next(error);
        
    }


})


// Comparing password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}

// generating token
userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
             userId: this._id.toString(),
             email: this.email,
             isAdmin: this.isAdmin,
            
            },
            process.env.JWT_SECRET_KEY,
            {
             expiresIn: "30d",
            }
        );

    } catch (error) {
        console.error(error);
    }
}

const User = new mongoose.model("User", userSchema);

module.exports = User;