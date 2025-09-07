export function otpTemplate(otpCode) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>MediSafe OTP Verification</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        border-radius: 8px;
        padding: 20px;
        border: 1px solid #e0e0e0;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eeeeee;
      }
      .header h2 {
        margin: 0;
        color: #2b6777;
      }
      .content {
        text-align: center;
        padding: 20px 0;
      }
      .otp {
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
        color: #ffffff;
        background: #2b6777;
        padding: 12px 24px;
        border-radius: 6px;
        letter-spacing: 4px;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #888888;
        border-top: 1px solid #eeeeee;
        padding-top: 15px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>MediSafe Verification</h2>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>Use the following One-Time Password (OTP) to log in to your MediSafe account:</p>
        <div class="otp">${otpCode}</div>
        <p>This code is valid for <strong>10 minutes</strong>. Please do not share it with anyone.</p>
      </div>
      <div class="footer">
        <p>© 2025 MediSafe. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
