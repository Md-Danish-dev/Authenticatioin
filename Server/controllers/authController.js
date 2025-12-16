const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const crypto =require('crypto');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendWelcomeEmail, sendpasswordResetEmail, sendPasswordResetSuccessEmail } = require("../mailtrap/email");

const generateAccessToken = (res, user) => {
    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    return token;
}



module.exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All field are required' })
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exist' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationToken = (111111).toString();
        // save to DB
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 1 day
        });

        const generateTokenAndSetCookie = generateAccessToken(res, newUser);

        await sendVerificationEmail(newUser.email, verificationToken);
        res.status(201).json({
            success: true,
            message: "registration successful",
            newUser: {
                ...newUser._doc,
                password: undefined,

            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error in user register", error: error.message })
        console.log("error in register controller: ", error.message);
    }

}



module.exports.verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" })
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);
        return res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        console.log("error in verifyEmail", error.message);
        return res.status(500).json({ success: false, message: 'error in vericaion email', error: error.message })
    }
}


module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "invalid credential" })
        }
        generateAccessToken(res, user);
        user.lastLogin = Date.now();
        await user.save();
        res.status(200).json({
            success: true,
            message: "login successfull!",
            user: {
                ...user._doc,
                password: undefined,
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "error in login functionality", error: error.message })
        console.log('error in login function', error.message)
    }
}


module.exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found with this email" })
        }
        const resetToken = crypto.randomBytes(20).toString();
        const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetPasswordExpiresAt;
        await user.save();

        await sendpasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({
            success: true,
            message: 'Password reset mail sent successfully'
        })
    } catch (error) {
        console.log("error while forgot password", error.message);
        res.status(500).json({ success: false, message: "error in forgot password", error: error.message })
    }
}


module.exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();
        await sendPasswordResetSuccessEmail(user.email);
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.log("error in reset password: ", error.message);
        res.status(500).json({ success: false, message: "error in reset password", error: error.message })
    }
}


module.exports.logout = async (req, res) => {
    res.clearCookie("token");
    return res.json({ message: "logged out successfully" });
}


module.exports.checkAuth=async(req,res)=>{
    try {
        const user=await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(404).json({success:false,message:"User not found"});
        }
        res.status(200).json({success:true,user});
    } catch (error) {
        console.log("error in checkAuth: ", error);
        res.status(500).json({success:false,message:"Internal server error",error:error.message});
    }
}

