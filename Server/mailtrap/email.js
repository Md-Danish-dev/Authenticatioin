// const  VERIFICATION_EMAIL_TEMPLATE  =require("./emailTemplates");

const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailTemplate");
const { mailtrapClient, sender } = require("./mailtrapConfig");

module.exports.sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });
        console.log("Verification email sent successfully:", response);
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw new Error("Failed to send verification email", error);
    }
}


module.exports.sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];
    try {
        const response=await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "ad5d6ce5-34e4-4144-8b51-b7f9e98d5af1",
            template_variables: {
                company_info_name: "Auth pvt ltd",
            }
        })
        console.log("Welcome email sent successfully:", response);
    } catch (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email", error);
    }
    
}


module.exports.sendpasswordResetEmail=async(email,reseturl)=>{
    const recipient=[{email}];
    try {
        const response=await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Reset your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",reseturl),
            category:"Password reset"
        })
        console.log("Verification email sent successfully:", response);

    } catch (error) {
        console.error("Error sending reset password email:", error);
        throw new Error("Failed to send reset password email", error);
    }
}

module.exports.sendPasswordResetSuccessEmail=async(email)=>{
    const recipient=[{email}];
    try {
        const response=await mailtrapClient.send({
            from:sender,
            to:recipient,
            subject:"Your Password has been reset successfully",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Password reset"
        })
        console.log("Password reset success email sent successfully:", response);
    } catch (error) {
        console.error("Error sending password reset success email:", error);
        throw new Error("Failed to send password reset success email", error);
    }
}