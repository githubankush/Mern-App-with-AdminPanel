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
        console.log("Services: ", err)
    }
}
module.exports = services