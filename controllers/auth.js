import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Register User
// we are setting viewedProfile and impressions as random numbers for now
export const register = async (req, res) => { 
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        const salt = await bcrypt.genSalt();
        console.log(password)
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json({error: err.message });
    }
};

/* Login */
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        console.log(req);
        const user = await User.findOne({email: email});
        if(!user) return res.status(400).json({msg: "User does not exist. ", email: email});
        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials "});
        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({token, user});
    } catch {
        res.status(500).json({error: err.message });
    }
}