/**
 * Rajat Sharma | DevOps Engineer Portfolio
 * Version: 2.0.0 (Cinematic GitOps Edition)
 * Tools: AWS, Jenkins, ArgoCD, Helm, Docker, Kubernetes
 */

const express = require("express");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ---------------- UI ROUTES ----------------
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "home.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "public", "about.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "public", "contact.html")));
app.get("/metrics", (req, res) => res.sendFile(path.join(__dirname, "public", "metrics.html")));
app.get("/logs", (req, res) => res.sendFile(path.join(__dirname, "public", "logs.html")));
app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "public", "dashboard.html")));

// ---------------- SYSTEM METRICS ENGINE (Detailed) ----------------
app.get("/api/metrics", (req, res) => {
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const loadAvg = os.loadavg(); // Returns 1, 5, and 15 minute load averages

    exec('docker ps --format "{{.Names}}" || true', (err, stdout) => {
        let containers = [];
        if (!err && stdout.trim()) {
            containers = stdout.trim().split("\n");
        }

        res.json({
            ok: true,
            hostname: os.hostname(),
            platform: os.platform(),
            architecture: os.arch(),
            cpuCores: os.cpus().length,
            cpuModel: os.cpus()[0].model,
            loadAverage: loadAvg,
            memory: {
                total: (totalMem / (1024 * 1024 * 1024)).toFixed(2) + " GB",
                used: (usedMem / (1024 * 1024 * 1024)).toFixed(2) + " GB",
                free: (freeMem / (1024 * 1024 * 1024)).toFixed(2) + " GB",
                percentage: ((usedMem / totalMem) * 100).toFixed(2) + "%"
            },
            uptime: {
                seconds: os.uptime(),
                formatted: new Date(os.uptime() * 1000).toISOString().substr(11, 8)
            },
            docker: {
                count: containers.length,
                list: containers
            },
            devopsStack: {
                ci: "Jenkins (Pipeline-as-Code)",
                cd: "ArgoCD (Pull-based GitOps)",
                cloud: "AWS (Elastic Kubernetes Service)",
                iac: "Terraform / Helm Charts"
            },
            timestamp: Date.now()
        });
    });
});

// ---------------- DOCKER OPERATIONS API ----------------
app.get("/api/containers", (req, res) => {
    // Detailed Docker info: ID, Name, Image, Status, Ports
    exec('docker ps --format "{{.ID}} | {{.Names}} | {{.Image}} | {{.Status}} | {{.Ports}}" || true', (err, stdout) => {
        if (err || !stdout.trim()) {
            return res.json({ ok: true, containers: [], message: "No active containers" });
        }

        const containers = stdout.trim().split("\n").map(line => {
            const parts = line.split(" | ");
            return {
                id: parts[0],
                name: parts[1],
                image: parts[2],
                status: parts[3],
                ports: parts[4]
            };
        });
        res.json({ ok: true, containers });
    });
});

// ---------------- REAL-TIME LOGS ENGINE ----------------
app.get("/get-logs", (req, res) => {
    // Fetches last 100 lines of the specific backend container
    const containerName = "ceo-backend"; 
    exec(`docker logs ${containerName} --tail 100 || true`, (err, stdout, stderr) => {
        if (err || stderr) {
            res.send("LOG_ERROR: Container not found or permissions missing.");
        } else {
            res.send(stdout || "Waiting for logs...");
        }
    });
});

// ---------------- TERMINAL COMMAND EXECUTOR (POWER-USER) ----------------
app.get("/run", (req, res) => {
    const cmd = req.query.cmd;
    
    // Security check: Don't allow empty commands
    if (!cmd) return res.status(400).send("ERROR: No command packet received.");

    console.log(`[EXECUTION]: Executing command -> ${cmd}`);
    
    exec(`${cmd} || true`, (err, stdout, stderr) => {
        if (err) return res.send(`EXEC_ERR: ${err.message}`);
        res.send(stdout || stderr || "Command executed. No output returned.");
    });
});

// ---------------- CONTACT & NOTIFICATIONS ----------------
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`[ALERT]: New Message from ${name} (${email})`);

    res.send(`
        <html>
            <head><title>Success</title></head>
            <body style="background:#050505; color:#00ffcc; font-family:'Courier New', monospace; display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; border: 5px double #00ffcc;">
                <h1 style="text-shadow: 0 0 10px #00ffcc;">SYNC COMPLETE</h1>
                <p style="font-size:1.2rem;">Message injected into Rajat's secure database.</p>
                <div style="margin-top:20px; padding:15px; border:1px solid #00ffcc;">
                    Status: 200 OK | Protocol: HTTPS | Origin: Portfolio-GitOps
                </div>
                <br>
                <a href="/" style="color:black; background:#00ffcc; padding:10px 25px; text-decoration:none; font-weight:bold; border-radius:3px;">BACK TO TERMINAL</a>
            </body>
        </html>
    `);
});

// ---------------- HEALTH & PIPELINE STATUS ----------------
app.get("/health", (req, res) => {
    res.json({ 
        status: "UP", 
        environment: "Production-Kubernetes",
        gitops: "ArgoCD Managed",
        build_info: {
            node_version: process.version,
            memory_usage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB"
        }
    });
});

// ---------------- SERVER INITIALIZATION ----------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
    ====================================================
    🚀 DEPLOYMENT SUCCESSFUL: RAJAT SHARMA PORTFOLIO
    🖥️  OS: ${os.type()} ${os.release()}
    📡  PORT: ${PORT}
    🛠️  STACK: JENKINS | DOCKER | ARGOCD | HELM | AWS
    ====================================================
    `);
});
