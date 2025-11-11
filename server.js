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
            background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
            color: #fff;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            overflow: hidden;
          }
          .glow-box {
            text-align: center;
            padding: 60px 100px;
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 25px rgba(0, 255, 255, 0.3);
            animation: pulse 4s infinite;
          }
          h1 {
            font-size: 3.5rem;
            letter-spacing: 1px;
            margin-bottom: 15px;
            background: linear-gradient(to right, #00f5d4, #00bbf9, #4361ee);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          h2 {
            font-size: 1.6rem;
            color: #c8d6e5;
            margin-bottom: 30px;
          }
          p {
            font-size: 1.1rem;
            color: #b2bec3;
          }
          footer {
            position: absolute;
            bottom: 15px;
            font-size: 0.9rem;
            color: #b2bec3;
            opacity: 0.8;
          }
          @keyframes pulse {
            0% { box-shadow: 0 0 25px rgba(0, 255, 255, 0.3); }
            50% { box-shadow: 0 0 45px rgba(0, 255, 255, 0.6); }
            100% { box-shadow: 0 0 25px rgba(0, 255, 255, 0.3); }
          }
        </style>
      </head>
      <body>
        <div class="glow-box">
          <h1>Welcome Rajat!</h1>
          <h2>Your CI/CD Pipeline has been created successfully 🎯</h2>
          <p>Continuous Integration & Deployment powered by Jenkins, Docker, GitHub, and AWS.</p>
          <p style="margin-top: 15px;">Each commit automatically triggers a build & redeployment.</p>
        </div>
        <footer>© 2025 Rajat Sharma | DevOps Automation Demo</footer>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('🚀 App running on port 3000...');
});
