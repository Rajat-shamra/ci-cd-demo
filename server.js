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
            font-family: 'Poppins', sans-serif;
            height: 100vh;
            background: linear-gradient(120deg, #001f3f, #003366, #0059b3, #0099ff);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            overflow: hidden;
          }
          .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 70px 120px;
            border-radius: 30px;
            box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: fadeIn 2s ease-in-out;
          }
          h1 {
            font-size: 4.2rem;
            margin-bottom: 15px;
            background: linear-gradient(to right, #00ffff, #00ccff, #0066ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: slideDown 1.2s ease;
          }
          h2 {
            font-size: 1.9rem;
            color: #bfe3ff;
            margin-bottom: 25px;
            animation: fadeIn 2s ease-in-out;
          }
          p {
            font-size: 1.2rem;
            color: #dcefff;
            line-height: 1.6;
            margin-bottom: 25px;
          }
          .info-box {
            font-size: 1rem;
            background: rgba(0, 255, 255, 0.08);
            padding: 12px 25px;
            border-radius: 10px;
            display: inline-block;
            margin-top: 20px;
            color: #aeefff;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
          }
          footer {
            position: absolute;
            bottom: 10px;
            width: 100%;
            text-align: center;
            font-size: 0.9rem;
            color: #b0d8ff;
          }
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes slideDown {
            0% { opacity: 0; transform: translateY(-30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .light {
            position: absolute;
            width: 15px;
            height: 15px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            animation: float 8s ease-in-out infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(-50px); opacity: 1; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome Rajat!</h1>
          <h2>Your CI/CD Pipeline Has Been Created Successfully 🚀</h2>
          <p>This application is fully automated using <b>Jenkins</b>, <b>Docker</b>, <b>GitHub</b>, and <b>AWS</b>.<br>
          Every new commit from GitHub triggers Jenkins to build and redeploy automatically.</p>
          <div class="info-box">
            🌐 Last Deployed: 11-Nov-2025 | Build ID: #1 | Environment: AWS EC2 (Ubuntu)
          </div>
        </div>
        <footer>© 2025 Rajat Sharma | DevOps CI/CD Demo</footer>

        <!-- Floating particles -->
        <div class="light" style="top: 15%; left: 20%; animation-delay: 1s;"></div>
        <div class="light" style="top: 70%; left: 50%; animation-delay: 3s;"></div>
        <div class="light" style="top: 40%; left: 80%; animation-delay: 5s;"></div>
        <div class="light" style="top: 85%; left: 30%; animation-delay: 2s;"></div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('🚀 App running on port 3000...');
});
