import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';



export const sendEmail=async({email,emailType,userId}:any)=>{
    try {

    const hashedToken = await bcrypt.hash(userId.toString(), 10)

      if(emailType ==='VERIFY'){
        await User.findByIdAndUpdate(userId,{verifyToken:hashedToken,verifyTokenExpiry:Date.now() + 3600000}) // 1 hour expiry
      }else if(emailType === 'RESET'){
        await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken,forgotPasswordTokenExpiry:Date.now() + 3600000}) // 1 hour expiry
      }



  var transport = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "api",
    pass: "61b9a678cc37cb925384359572b97593"
  }
});


const mailOptions={
    from: 'roknujjamanrony1234@gmail.com',
    to: email,
    subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
    
    html: `<p>click <a href="${process.env.NEXTAUTH_URL}/verifyemail?token=${hashedToken}">here</a> to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} or copy and paste the link below in your browser. </br>
    ${process.env.NEXTAUTH_URL}/verifyemail?token=${hashedToken}
    </p>`, // HTML body
  }
const mailResponse= await transport.sendMail(mailOptions);
        console.log('Email sent successfully');
        return mailResponse;

    } catch (error) {
        console.error('Error sending email:', error);
    }
}


