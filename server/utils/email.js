import transporter from "../config/nodemailer.js";

const sendResetPasswordEmail = async (to, url) => {
    try {
      await transporter.sendMail({
        from: 'abhishekkumargupta18008@gmail.com',
        to,
        subject: 'Password Reset',
        html: `<p>Click the following link to reset your password: <a href="${url}">Reset Password</a></p>`,
      });
  
      console.log(`Reset password email sent to: ${to}`);
    } catch (error) {
      console.error('Error sending reset password email:', error);
      throw new Error('Failed to send reset password email.');
    }
  };

  export default sendResetPasswordEmail;