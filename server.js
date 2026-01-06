/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Final Cinematic Server – Clean, Stable, Professional
 */

const express = require("express");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const app = express();

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


// ---------------- HOME ----------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});


// ---------------- ABOUT ----------------
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});


// ---------------- CONTACT PAGE ----------------
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});


// ---------------- CONTACT SUBMIT ----------------
app.post("/contact", (req, res) => {
  console.log("New Contact Message:", req.body);

  res.send(`
    <html>
      <body style="background:black;color:cyan;font-family:monospace;padding:40px;text-align:center;">
        <h2>Your message has been received</h2>
        <p>Thank you for contacting Rajat Sharma</p>
        <a href="/" style="color:#00ffff;">Back to Home</a>
      </body>
    </html>
  `);
});


// ---------------- METRICS UI PAGE ----------------
app.get("/metrics", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "metrics.html"));
});


// ---------------- SYSTEM METRICS API ----------------
app.get("/api/metrics", (req, res) => {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;

  exec('docker ps --format "{{.Names}}" || true', (err, stdout) => {
    let containers = [];

    if (!err && stdout.trim()) {
      containers = stdout.trim().split("\n");
    }

    res.json({
      ok: true,
      cpuCores: os.cpus().length,
      usedMem: used,
      totalMem: total,
      freeMem: free,
      uptimeSec: os.uptime(),
      dockerCount: containers.length,
      containers: containers,
      timestamp: Date.now()
    });
  });
});


// ---------------- DOCKER CONTAINER DETAILS API ----------------
app.get("/api/containers", (req, res) => {
  exec('docker ps --format "{{.ID}} {{.Names}} {{.Image}} {{.Status}}" || true',
    (err, stdout) => {
      if (err || !stdout.trim()) {
        return res.json({ ok: true, containers: [] });
      }

      const containers = stdout.trim().split("\n").map(line => {
        const p = line.split(" ");
        return {
          id: p[0],
          name: p[1],
          image: p[2],
          status: p.slice(3).join(" ")
        };
      });

      res.json({ ok: true, containers });
    }
  );
});


// ---------------- LOGS UI ----------------
app.get("/logs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "logs.html"));
});


// ---------------- DOCKER LOGS API ----------------
app.get("/get-logs", (req, res) => {
  // Yahan humne container name 'ceo-backend' kar diya hai jo pipeline se aata hai
  exec("docker logs ceo-backend --tail 50 || true", (err, stdout) => {
    res.send(stdout || "No Docker logs found");
  });
});


// ---------------- HEALTH CHECK ----------------
app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy", 
    time: new Date().toISOString(),
    stack: "GitOps Enabled" 
  });
});


// ---------------- DASHBOARD UI PAGE ----------------
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});


// ---------------- COMMAND EXECUTOR API ----------------
app.get("/run", (req, res) => {
  const cmd = req.query.cmd;

  exec(cmd + " || true", (err, stdout) => {
    res.send(stdout || "No output");
  });
});

// ==========================================================
// 🚀 NEW SECTION: GITOPS & CLOUD INFRASTRUCTURE (Added for Rajat)
// ==========================================================

app.get("/api/gitops-status", (req, res) => {
    res.json({
        engine: "ArgoCD",
        pipeline: "Jenkins CI/CD",
        repository: "github.com/Rajat-shamra/ci-cd-demo",
        syncPolicy: "Automated (Self-Healing)",
        deploymentStrategy: "Rolling Update",
        cloudProvider: "AWS",
        cluster: "MicroK8s / EKS",
        helmVersion: "v3.x"
    });
});

app.get("/gitops", (req, res) => {
    // Ye ek naya page hoga tumhare portfolio mein
    res.sendFile(path.join(__dirname, "public", "gitops.html"));
});


// ---------------- START SERVER ----------------
app.listen(3000, () => {
  console.log("✔ Rajat Sharma Portfolio running at: http://localhost:3000");
  console.log("✔ GitOps Engine Active: Monitoring Jenkins & ArgoCD");
});
