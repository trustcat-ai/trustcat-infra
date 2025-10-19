# Provider Onboarding — Plug Your Rigs Into TrustCat.ai

Got high-end GPU compute sitting idle? Turn it into **USDC revenue** by joining the TrustCat.ai compute network.

## Why TrustCat.ai?

- **95% Revenue Share** — You keep 95%, brokers get 5% (if applicable)
- **USDC Payments** — Paid within 24h of job completion, no shitcoins
- **CatChain Trust** — Every job logged immutably on our blockchain
- **Enterprise Clients** — AI training, rendering, inference workloads
- **No Middleman Tax** — Direct client connections via k3s cluster

---

## Requirements

### Minimum Specs
- **GPU:** RTX 4090 or better (RTX 5090 preferred)
- **CPU:** AMD Ryzen 7950X / Intel i9-13900K or better
- **RAM:** 64GB+ DDR5
- **Storage:** 2TB+ NVMe SSD
- **Network:** 10Gbps+ uplink, static IP preferred
- **Uptime:** 99%+ availability commitment

### Software Stack
- **OS:** Ubuntu 22.04 LTS (preferred) or similar Linux distro
- **Docker:** Latest stable
- **NVIDIA Drivers:** 550+ with CUDA 12.4+
- **k3s Agent:** Installed via our onboarding script

### Payment Setup
- **USDC Wallet:** Base L2 preferred (lower fees)
- **ENS Domain:** Optional but recommended (e.g., `provider-001.trustcat.eth`)

---

## Onboarding Process

### Step 1: Register on CatChain

Submit your rig specs + **$100 USDC registration fee** to get verified:
```bash
curl -X POST https://api.trustcat.ai/provider/register \
  -H "Content-Type: application/json" \
  -d '{
    "provider_id": "your_provider_id",
    "rig_specs": {
      "gpu_model": "RTX 5090",
      "gpu_count": 1,
      "gpu_vram_gb": 32,
      "cpu_model": "AMD 7950X",
      "cpu_cores": 16,
      "ram_gb": 64,
      "storage_tb": 2,
      "network_speed_gbps": 10,
      "location": "US-East"
    },
    "catchain_address": "0xYourWalletAddress",
    "usdc_payment_tx": "0xRegistrationFeeTxHash"
  }'
```

**What happens next:**
1. We verify your payment on Base L2
2. Your rig specs get logged on CatChain (Block #X)
3. You receive k3s cluster credentials within 24h

### Step 2: Install k3s Agent

Once approved, you'll receive an installation script:
```bash
# Provided after registration approval
curl -sfL https://install.trustcat.ai/k3s-agent.sh | \
  K3S_URL=https://k3s.trustcat.ai:6443 \
  K3S_TOKEN=your_secret_token \
  sh -
```

**Manual verification:**
```bash
# Check k3s is running
sudo systemctl status k3s-agent

# Verify GPU access in k3s
kubectl get nodes -o wide
kubectl describe node your-node-name | grep -i nvidia
```

### Step 3: Configure Monitoring

Install our monitoring stack to track uptime and job performance:
```bash
# Install Prometheus node exporter
sudo docker run -d \
  --name node-exporter \
  --net="host" \
  --pid="host" \
  -v "/:/host:ro,rslave" \
  prom/node-exporter:latest \
  --path.rootfs=/host

# Install NVIDIA GPU exporter
sudo docker run -d \
  --name nvidia-exporter \
  --gpus all \
  -p 9835:9835 \
  mindprince/nvidia_gpu_prometheus_exporter:latest
```

**Access your dashboard:** `https://monitor.trustcat.ai/provider/your_id`

### Step 4: Test Job Execution

We'll send a test workload to verify everything works:
```bash
# You'll see a test pod deployed to your node
kubectl get pods -n test-provider-001

# Check logs
kubectl logs -n test-provider-001 test-job-xxxxx
```

**Expected output:** CUDA test passes, GPU utilization logged.

---

## Earning Revenue

### How Jobs Are Assigned
1. Client requests compute via TrustCat.ai
2. Our scheduler assigns job to available provider
3. Job runs in isolated k3s namespace
4. Upon completion, payment flows automatically

### Payment Flow
```
Client pays $1000 USDC
  ↓
TrustCat.ai contract splits:
  → Provider: $950 (95%)
  → Broker: $50 (5%, if applicable)
  → CatChain fee: $0 (absorbed by TrustCat.ai during bootstrap phase)
  ↓
USDC sent to your wallet within 24h
```

### Revenue Tracking
- **Live Dashboard:** https://provider.trustcat.ai/your_id
- **CatChain Explorer:** View all your completed jobs on-chain
- **Discord Alerts:** Get notified when jobs complete and payments process

### Example Earnings
| Job Type | Duration | Rate | Your Cut (95%) |
|----------|----------|------|----------------|
| AI Training | 24h | $500 | $475 |
| Rendering | 12h | $300 | $285 |
| Inference | 1h | $50 | $47.50 |

**Average provider with 1x RTX 5090:** $3k-$8k/month depending on utilization.

---

## FAQ

**Q: What if my rig goes offline during a job?**  
A: Client is refunded, you don't get paid. Maintain 99%+ uptime to stay in good standing.

**Q: Can I run other workloads on my rig simultaneously?**  
A: No. When a job is assigned, 100% of resources must be dedicated to the client.

**Q: What happens if I want to leave the network?**  
A: Give 7 days notice. Complete any active jobs, then remove the k3s agent. Registration fee is non-refundable.

**Q: How do I handle security/privacy for client workloads?**  
A: All jobs run in isolated k8s namespaces. You don't see client data, just resource utilization metrics.

**Q: What's the registration fee for?**  
A: Covers CatChain block creation, k3s setup, and ensures serious providers only.

---

## Support

- **Discord:** #provider-support in [TrustCat.ai Discord](https://discord.gg/yourlink)
- **Email:** providers@trustcat.ai
- **Docs:** https://docs.trustcat.ai

---

**Ready to plug in?** Complete Step 1 and let's get your rig earning USDC. 🚂
