const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Rajat CI/CD Demo</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #1e3c72, #2a5298);
            color: white;
            text-align: center;
            margin: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
          }
          p {
            font-size: 1.2rem;
            color: #d1e7ff;
          }
          .box {
            background: rgba(255, 255, 255, 0.1);
            padding: 30px 60px;
            border-radius: 20px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>Welcome Rajat!</h1>
          <p>Your CI/CD pipeline has been created successfully.</p>
          <p>Deployment powered by Jenkins + Docker + GitHub + AWS 🚀</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
