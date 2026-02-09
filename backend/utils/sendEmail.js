const nodemailer = require('nodemailer');

/**
 * sendEmail: Professional mailing utility for BP Electricals
 * @param {Object} options - Contains email, subject, and otp
 */
const sendEmail = async (options) => {
  try {
    // 1. Create a transporter using Gmail service and App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // klubnikabytes@gmail.com
        pass: process.env.EMAIL_PASS, // bdbawryokpevmxkh
      },
    });

    // 2. Define mail contents
    const mailOptions = {
      from: `"Bishnupriya Electricals" <${process.env.EMAIL_USER}>`, //
      to: options.email, //
      subject: options.subject, //
      text: `Your BP Electricals verification code is: ${options.otp}. Valid for 10 minutes.`, // Plain text fallback
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background-color: #f9fafb;">
          <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
            <div style="text-align: center; margin-bottom: 30px;">
              <div style="display: inline-block; width: 50px; height: 50px; background: #0f172a; color: #ffffff; line-height: 50px; border-radius: 12px; font-weight: 900; font-size: 20px;">BE</div>
              <h2 style="color: #111827; margin-top: 20px; text-transform: uppercase; letter-spacing: -0.025em; font-style: italic;">Identity Check</h2>
            </div>
            
            <p style="color: #4b5563; font-size: 14px; line-height: 1.5; text-align: center;">
              Hello Partner,<br />
              Use the code below to securely access your BP Business Dashboard.
            </p>

            <div style="margin: 30px 0; background: #f3f4f6; padding: 24px; text-align: center; border-radius: 16px; border: 2px dashed #d1d5db;">
              <span style="font-size: 36px; font-weight: 900; letter-spacing: 12px; color: #059669; font-family: monospace;">${options.otp}</span>
            </div>

            <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 30px; text-transform: uppercase; letter-spacing: 0.1em;">
              This code expires in 10 minutes.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f3f4f6; text-align: center;">
              <p style="font-size: 10px; color: #9ca3af; margin: 0;">&copy; 2026 Bishnupriya Electricals Distribution Hub</p>
            </div>
          </div>
        </div>
      `, //
    };

    // 3. Dispatch the email
    const info = await transporter.sendMail(mailOptions);
    console.log("✉️ Email sent: %s", info.messageId);
    return info;

  } catch (error) {
    // 4. Critical: Log error instead of crashing server
    console.error("❌ NODEMAILER ERROR:", error.message);
    throw new Error("Mailing service failed to dispatch OTP.");
  }
};

module.exports = sendEmail; 