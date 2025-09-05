import validator from 'validator';
import bycrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';


//API for adding doctor
const addDoctor = async (req,res) => {
    console.log("hii");
    
    try {
        const {name, email, password, speciality, degree, experience, about, fees, address} = req.body
        const imageFile = req.file

        // console.log(name, email, password, speciality, degree, experience, about, fees, address, imageFile);
        
        //checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile){
            return res.json({success: false,message: "Missing Details"})
        }

        //validating email format 
        if (validator.isEmail(email) === false) {
            return res.json({ success: false, message: "Invalid Email" })
            
        }   {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        //hashing password 
         const salt = await bycrypt.genSalt(10);
         const hashedPassword = await bycrypt.hash(password, salt);

         //uploading image to cloudinary
         const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
         const imageUrl = imageUpload.secure_url

         const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            data: Date.now() 
         }

         const newDoctor = new doctorModel(doctorData)
            await newDoctor.save()

            res.json({success: true, message: "Doctor Added "})

    } catch (error) {
        console.log(error);
        res.json({success: false, message:message.message})
    }
}

// API For admin login
const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET, {expiresIn: '1d'})
            res.json({success: true, message: "Login Success", token})
        }
        else {
            res.json({success: false, message: "Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message:error.message})
    }
}

export {addDoctor, loginAdmin}