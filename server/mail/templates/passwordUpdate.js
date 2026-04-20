exports.passwordUpdate = (name) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Updated</title>
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

    .alert {
      margin: 20px 0;
      padding: 12px;
      background-color: #dc2626;
      color: #ffffff;
      border-radius: 5px;
      font-size: 14px;
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

    .footer {
      margin-top: 30px;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      skillAssignment
    </div>

    <div class="content">
      <h2>Password Updated Successfully</h2>

      <p>Hello ${name},</p>

      <p>Your account password has been successfully updated.</p>

      <a href="#" class="button">Go to Dashboard</a>

      <div class="alert">
        If you did NOT make this change, please reset your password immediately.
      </div>

      <p>For security, we recommend using a strong and unique password.</p>
    </div>

    <div class="footer">
      © 2026 skillAssignment. All rights reserved.
    </div>

  </div>
</body>
</html>`;
};