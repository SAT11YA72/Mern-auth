import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp =  async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: "User created suuccessfully" });
  } 
  catch (error) {
    next(error);
  }
}

export const signIn = async (req, res, next) => {
  const {email, password} = await req.body;
  
  try {
    const validUser = await User.findOne({ email });
    if(!validUser){
      return res.status(404).json("User not found");
      };
    const validPassword= bcrypt.compareSync(password,validUser.password);
    if(!validPassword){
      return res.status(400).json("Invalid credentials");
    }  
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    
    const expiry = new Date( Date.now() + 3600000);
    
    res.cookie("access_token",token,{httpOnly:true, expires:expiry})
        .status(200).json({validUser});

  } catch (error) {
    next(error);
  }
}

