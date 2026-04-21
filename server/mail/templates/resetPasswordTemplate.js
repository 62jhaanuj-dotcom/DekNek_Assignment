exports.resetPassword = (name, resetLink) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Reset Your Password</title>
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
      border-radius: 8px 8px 0 0;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 30px 20px;
      text-align: left;
    }

    .reset-button {
      background-color: #3b82f6;
      color: white;
      padding: 12px 30px;
      text-decoration: none;
      border-radius: 4px;
      display: inline-block;
      margin: 20px 0;
      font-weight: bold;
    }

    .reset-button:hover {
      background-color: #2563eb;
    }

    .warning {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 10px 15px;
      margin: 20px 0;
      border-radius: 4px;
      color: #92400e;
    }

    .footer {
      color: #666666;
      font-size: 12px;
      margin-top: 30px;
      border-top: 1px solid #e5e7eb;
      padding-top: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>

    <div class="content">
      <p>Hi ${name},</p>

      <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>

      <p>Click the button below to reset your password:</p>

      <center>
        <a href="${resetLink}" class="reset-button">Reset Password</a>
      </center>

      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all; background-color: #f3f4f6; padding: 10px; border-radius: 4px;">
        ${resetLink}
      </p>

      <div class="warning">
        <strong>⏰ Important:</strong> This reset link will expire in 1 hour. If the link expires, you can request a new one.
      </div>

      <p>If you have any issues, please contact our support team.</p>

      <p>Best regards,<br>DekNek Team</p>
    </div>

    <div class="footer">
      <p>This is an automated message, please do not reply to this email.</p>
      <p>&copy; 2026 DekNek. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;
};
