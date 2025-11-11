const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Rajat Sharma | CI/CD Pipeline</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #001f3f, #0074D9, #00BFFF);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            overflow: hidden;
            text-align: center;
          }
          h1 {
            font-size: 4rem;
            font-weight: bold;
            background: linear-gradient(to right, #00ffcc, #33ccff, #0066ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 30px;
            animation: fadeIn 3s ease-in-out;
          }
          h2 {
            font-size: 2rem;
            color: #cce7ff;
            margin-bottom: 40px;
            animation: slideUp 3s ease-in-out;
          }
          p {
            font-size: 1.3rem;
            color: #d8e6f3;
            max-width: 800px;
            line-height: 1.5;
            animation: fadeIn 4s ease-in-out;
          }
          .container {
            background: rgba(255, 255, 255, 0.1);
            padding: 60px 80px;
            border-radius: 25px;
            box-shadow: 0 0 30px rgba(0, 255, 255, 0.4);
            backdrop-filter: blur(6px);
            border: 2px solid rgba(255, 255, 255, 0.2);
          }
          footer {
            position: absolute;
            bottom: 20px;
            font-size: 1rem;
            color: #a8c0ff;
            opacity: 0.9;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes slideUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome Rajat!</h1>
          <h2>Your CI/CD Pipeline Has Been Created Successfully 🚀</h2>
          <p>
            This application is automatically deployed using Jenkins, Docker, GitHub, and AWS.<br>
            Every time you push code to GitHub, Jenkins builds, tests, and deploys the latest version automatically.
          </p>
        </div>
        <footer>© 2025 Rajat Sharma | DevOps CI/CD Demo</footer>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('🚀 App running on port 3000...');
});
