const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Rajat Sharma | CI/CD Pipeline</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Poppins', sans-serif;
            height: 100vh;
            background: linear-gradient(120deg, #001f3f, #003366, #0059b3, #0099ff);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            overflow: hidden;
          }
          .card {
            text-align: center;
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(10px);
            padding: 80px 130px;
            border-radius: 30px;
            box-shadow: 0 0 40px rgba(0, 255, 255, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.2);
            animation: fadeIn 2s ease-in-out;
          }
          h1 {
            font-size: 4rem;
            margin-bottom: 10px;
            background: linear-gradient(to right, #00ffff, #00ccff, #007bff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: slideDown 1.5s ease;
          }
          h2 {
            font-size: 2rem;
            margin-bottom: 25px;
            color: #cce7ff;
          }
          p {
            font-size: 1.3rem;
            color: #e6f3ff;
            max-width: 800px;
            margin-bottom: 30px;
          }
          .buttons {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-top: 20px;
          }
          .btn {
            font-size: 1.1rem;
            padding: 12px 28px;
            border-radius: 50px;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
          }
          .btn-like {
            background: linear-gradient(45deg, #ff6b6b, #ff4b4b);
            color: white;
            box-shadow: 0 0 15px rgba(255, 107, 107, 0.6);
          }
          .btn-like:hover {
            transform: scale(1.1);
            box-shadow: 0 0 25px rgba(255, 0, 0, 0.8);
          }
          .btn-commit {
            background: linear-gradient(45deg, #00ffcc, #0099ff);
            color: white;
            box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
          }
          .btn-commit:hover {
            transform: scale(1.1);
            box-shadow: 0 0 25px rgba(0, 255, 255, 0.8);
          }
          .heart {
            font-size: 2rem;
            color: #ff4b4b;
            animation: pulse 1.5s infinite;
            margin-top: 30px;
          }
          footer {
            position: absolute;
            bottom: 15px;
            color: #a8c0ff;
            font-size: 1rem;
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
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.2); opacity: 1; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Welcome Rajat!</h1>
          <h2>Your CI/CD Pipeline Has Been Created Successfully 🚀</h2>
          <p>This application is deployed using <b>Jenkins</b>, <b>Docker</b>, <b>GitHub</b>, and <b>AWS EC2</b>.<br>
          Every push from GitHub automatically triggers a new build and deployment.</p>
          <div class="buttons">
            <button class="btn btn-like">❤️ Like</button>
            <button class="btn btn-commit">💾 Commit</button>
          </div>
          <div class="heart">💖</div>
        </div>
        <footer>© 2025 Rajat Sharma | DevOps CI/CD Demo</footer>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('🚀 Rajat CI/CD Dashboard running on port 3000...');
});
