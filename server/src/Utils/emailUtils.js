import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, htmlContent) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: `"Your Company Name" <${process.env.EMAIL_USER}>`, // sender address
      to, // recipient
      subject, // Subject line
      html: htmlContent, // HTML body content
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);

  } catch (error) {
    console.error('Error sending email:', error);
  }
};
