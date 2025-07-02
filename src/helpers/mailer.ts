import nodemailer from 'nodemailer';



export const sendEmail=async({email,emailType,userId}:any)=>{
    try {
        const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});


const mailOptions={
    from: 'roknujjamanrony1234@gmail.com',
    to: email,
    subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
    
    html: "<b>Hello world?</b>", // HTML body
  }
const mailResponse= await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        return mailResponse;

    } catch (error) {
        console.error('Error sending email:', error);
    }
}