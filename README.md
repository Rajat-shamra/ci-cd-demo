# 🚀 CI-CD Demo: GitHub + Jenkins + Docker + Helm + Kubernetes

This project demonstrates a complete end-to-end CI/CD pipeline using:

- GitHub for source code management
- Jenkins for CI/CD automation
- Docker for container image builds inside Minikube
- Helm for Kubernetes deployment
- Minikube as local Kubernetes cluster
- SonarQube for code quality analysis (optional)

---

## 📌 Architecture Overview

GitHub → Jenkins CI/CD → Docker Build (Minikube Daemon)  
      → Helm Deployment → Kubernetes (Minikube)  
      → Service (NodePort) → Application Accessible in Browser

---

## 📌 What This Pipeline Automates

### ✔ 1. Auto-trigger from GitHub
Whenever code is pushed, a GitHub Webhook automatically triggers Jenkins.

### ✔ 2. Jenkins CI Steps
Jenkins performs:
- Pull latest code from GitHub  
- Install Node.js dependencies  
- Build Docker image inside Minikube  
- Build and tag Docker image  
- Deploy through Helm  
- Verify deployment  
- Run health checks  
- Expose application URL  
- Generate a deployment summary report  

### ✔ 3. Docker Image Build
- Jenkins points Docker client to Minikube daemon  
- No external registry required  
- Images are instantly available to Kubernetes  

### ✔ 4. Helm Deployment
Helm deploys:
- Deployment  
- Service (NodePort)  
- Auto rollback behavior  
- Configurable image & version  

### ✔ 5. Kubernetes Deployment
- Deploys Node.js app on Minikube  
- Ensures service always runs on port 3000  
- Performs continuous readiness/health checks  

---

## 📌 Folder Structure

ci-cd-demo/  
│  
├── Dockerfile  
├── server.js  
├── package.json  
├── package-lock.json  
│  
├── helm/  
│   └── node-app/  
│       ├── templates/  
│       ├── Chart.yaml  
│       ├── values.yaml  
│  
└── README.md  

---

## 📌 Technologies Used

| Technology | Purpose |
|-----------|----------|
| GitHub | Code versioning + webhook trigger |
| Jenkins | Full CI/CD automation |
| Node.js | Application runtime |
| Docker | Containerization |
| Minikube | Kubernetes environment |
| Kubernetes | Container orchestration |
| Helm | Release management |
| SonarQube | Code quality analysis |

---

## 📌 Jenkins Pipeline Features

- GitHub Webhook integration  
- Zero downtime Helm deployment  
- Automatic old release cleanup  
- Automated health checks  
- Generates deployment report (rajat.txt)  
- Uses Minikube’s Docker daemon  
- Fully automated end-to-end CI/CD  

---

## 📌 Final Output Example

After successful pipeline execution, Jenkins prints:

Deployment Successful  
Minikube URL:  
http://<MINIKUBE-IP>:<NODEPORT>  

Report saved to: rajat.txt  

---

## 📌 Optional Manual Deployment

minikube start  
helm upgrade --install node-app helm/node-app  
  --set image.repository=rajatsharma/node-cicd-demo  
  --set image.tag=latest  

---

## 📌 Future Enhancements

- Add Prometheus + Grafana monitoring  
- Add Canary deployments  
- Add Kubernetes Ingress  
- Push Docker image to DockerHub/ECR  

---

## 📌 Author

**Rajat Sharma – DevOps Engineer**  
CI/CD | Kubernetes | Jenkins | Docker | Helm | AWS | Automation  

---

⭐ If you like this project, please star the repository.
# ci-cd-demo
