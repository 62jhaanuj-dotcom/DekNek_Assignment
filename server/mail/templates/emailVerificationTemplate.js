exports.emailVerification = (name, otp) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
  <style>
    body {
      background-color: #ffffff;
      font-family: Arial, sans-serif;
      font-size: 16px;
      line-height: 1.4;
      color: #333333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
    }

    .header {
      background-color: #0f172a;
      padding: 15px;
      color: #ffffff;
      font-size: 20px;
      font-weight: bold;
    }

    .content {
      margin-top: 20px;
    }

    .otp {
      font-size: 28px;
      font-weight: bold;
      letter-spacing: 5px;
      margin: 20px 0;
      color: #111827;
    }

    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888888;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #facc15;
      color: #000;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      margin-top: 20px;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      skillAssignment
    </div>

    <div class="content">
      <h2>Email Verification</h2>

      <p>Hello ${name},</p>

      <p>Thank you for registering. Use the OTP below to verify your email:</p>

      <div class="otp">${otp}</div>

      <p>This OTP is valid for 5 minutes.</p>

      <a href="#" class="button">Verify Email</a>

      <p>If you did not request this, please ignore this email.</p>
    </div>

    <div class="footer">
      © 2026 skillAssignment. All rights reserved.
    </div>

  </div>
</body>
</html>`;
};