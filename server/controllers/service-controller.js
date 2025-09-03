const Service = require("../models/service-model")
const services = async (req,res) =>{
    try{
        const response = await Service.find();

        if(!response){
            return res.status(404).json({message:"No services found"})
        }
        res.status(200).json({msg : response})
        return;
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
}
module.exports = services