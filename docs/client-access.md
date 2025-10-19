# Client Access Guide — Get High-End GPU Compute on TrustCat.ai

Need GPUs for AI training, rendering, or inference? TrustCat.ai gives you **enterprise-grade compute** at **transparent prices** with **blockchain-verified jobs**.

## Why TrustCat.ai?

- **30x RTX 5090 rigs** ready to deploy
- **USDC payments** — no credit cards, no surprise fees
- **CatChain logging** — every job immutably recorded
- **$950 USDC AII grant** for first-time AI workloads
- **SSH/Docker/k8s access** — use your existing workflows

---

## Getting Started

### 1. Sign Up
```bash
curl -X POST https://api.trustcat.ai/client/register \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "your_client_id",
    "company_name": "Your Company",
    "contact_email": "you@example.com",
    "use_case": "AI training / Rendering / Inference",
    "estimated_monthly_spend_usdc": 5000
  }'
```

**First-time AI clients:** Mention code `AII2025` to get your **$950 USDC grant**.

### 2. Fund Your Account

Send USDC to your TrustCat.ai wallet (provided after registration):
- **Network:** Base L2 (lower fees) or Ethereum mainnet
- **Minimum:** $100 USDC
- **No lockup:** Unused funds are refundable

### 3. Request Compute

#### Option A: Web Dashboard
https://client.trustcat.ai/request-compute

- Select GPU type (RTX 4090, RTX 5090)
- Choose duration (hourly, daily, weekly)
- Upload workload or provide Docker image
- Click "Deploy"

#### Option B: CLI
```bash
# Install TrustCat CLI
npm install -g @trustcat/cli

# Authenticate
trustcat login --api-key your_api_key

# Request compute
trustcat deploy \
  --gpu rtx5090 \
  --duration 24h \
  --docker-image your/ai-training:latest \
  --entrypoint "python train.py"
```

#### Option C: Direct k8s Access
```bash
# Download your kubeconfig
curl -H "Authorization: Bearer your_api_key" \
  https://api.trustcat.ai/client/kubeconfig > ~/.kube/trustcat-config

# Deploy to your namespace
export KUBECONFIG=~/.kube/trustcat-config
kubectl apply -f your-deployment.yaml
```

---

## Access Methods

### SSH Access
```bash
# Connect to your assigned node
ssh -i ~/.ssh/trustcat-key client-001@node-rtx5090-03.trustcat.ai

# GPU is available via NVIDIA Docker runtime
nvidia-smi
```

### Docker Access
```bash
# Run your container on assigned GPU
docker run --gpus all \
  -v /data:/workspace \
  your/ai-model:latest \
  python train.py
```

### Kubernetes Access
```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: ai-training-job
  namespace: client-001
spec:
  template:
    spec:
      containers:
      - name: trainer
        image: your/ai-model:latest
        resources:
          limits:
            nvidia.com/gpu: 1
        command: ["python", "train.py"]
      restartPolicy: Never
```

---

## Pricing

### RTX 5090 Pricing
| Duration | Rate | Effective Hourly |
|----------|------|------------------|
| 1 hour | $25 | $25/hr |
| 24 hours | $500 | $20.83/hr (17% discount) |
| 7 days | $3,000 | $17.86/hr (29% discount) |

### RTX 4090 Pricing
| Duration | Rate | Effective Hourly |
|----------|------|------------------|
| 1 hour | $15 | $15/hr |
| 24 hours | $300 | $12.50/hr (17% discount) |
| 7 days | $1,800 | $10.71/hr (29% discount) |

**AII Grant:** First-time AI clients get **$950 USDC credit**—run ~38 hours of RTX 5090 compute free.

---

## Payment & Billing

### How Payment Works
1. You pre-fund your account with USDC
2. Jobs are charged hourly/daily based on usage
3. CatChain logs every job (duration, cost, provider)
4. Refunds issued if provider goes offline mid-job

### Viewing Invoices
- **Dashboard:** https://client.trustcat.ai/billing
- **CatChain Explorer:** See on-chain job records at https://catchain.trustcat.ai/client/your_address

### Auto-Refills
Set up auto-refill to keep compute running:
```bash
trustcat billing set-auto-refill \
  --threshold 100 \
  --amount 1000
```
(When balance drops below $100, automatically refill with $1000 USDC)

---

## Use Cases

### AI Model Training
```bash
# Fine-tune Llama 3 on RTX 5090
trustcat deploy \
  --gpu rtx5090 \
  --duration 48h \
  --docker-image huggingface/transformers:latest \
  --command "python train_llama.py --dataset custom --epochs 10"
```

### Rendering
```bash
# Blender render farm
trustcat deploy \
  --gpu rtx5090 \
  --duration 12h \
  --docker-image blender:latest \
  --command "blender -b scene.blend -o //output -F PNG -x 1 -a"
```

### Inference API
```bash
# Deploy Stable Diffusion API
trustcat deploy \
  --gpu rtx5090 \
  --duration 7d \
  --docker-image your/stable-diffusion-api:latest \
  --port 8000
```

---

## Job Monitoring

### Real-Time Dashboard
https://client.trustcat.ai/jobs/active

**See:**
- GPU utilization %
- Job runtime
- Estimated completion time
- Current cost

### Logs
```bash
# Stream logs from your job
trustcat logs job-12345 --follow

# Or via kubectl
kubectl logs -f -n client-001 your-pod-name
```

### Alerts
Set up Discord/Slack/email alerts:
```bash
trustcat alerts create \
  --event job_completed \
  --webhook https://hooks.slack.com/your-webhook
```

---

## FAQ

**Q: What if I need more GPUs than listed?**  
A: Contact us at clients@trustcat.ai—we can provision multi-GPU setups.

**Q: Can I reserve compute in advance?**  
A: Yes. Use `--start-time` flag to schedule jobs for future dates.

**Q: What's the cancellation policy?**  
A: Cancel anytime. You're only charged for compute used (prorated hourly).

**Q: Is my data secure?**  
A: Jobs run in isolated k8s namespaces. Providers can't access your data, only resource metrics.

**Q: What networks do you support for USDC?**  
A: Base L2 (preferred), Ethereum mainnet, Arbitrum, Optimism.

---

## Support

- **Discord:** #client-support in [TrustCat.ai Discord](https://discord.gg/yourlink)
- **Email:** clients@trustcat.ai
- **Docs:** https://docs.trustcat.ai
- **Status Page:** https://status.trustcat.ai

---

**Ready to deploy?** Sign up and claim your **$950 AII grant** today. 🚂
