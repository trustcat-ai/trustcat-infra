# Broker Guide — Earn 5% Commission on Every Compute Deal

Know AI startups, rendering studios, or ML researchers who need GPU compute? **Refer them to TrustCat.ai and earn 5% USDC commission** on every job they run.

## What's a Broker?

A **broker** connects clients (who need compute) with TrustCat.ai's provider network. You don't need technical skills—just relationships with potential clients.

### Key Benefits
- **5% Commission** on all compute revenue from your referrals
- **USDC Payments** within 24h of job completion
- **No Upfront Cost** — free to join, earn per successful referral
- **CatChain Tracking** — all deals logged immutably, no disputes
- **Recurring Revenue** — earn on repeat jobs from the same client

---

## How It Works

### 1. Register as a Broker
```bash
curl -X POST https://api.trustcat.ai/broker/register \
  -H "Content-Type: application/json" \
  -d '{
    "broker_id": "your_broker_id",
    "name": "Your Name or Company",
    "catchain_address": "0xYourWalletAddress",
    "contact_email": "you@example.com",
    "usdc_payment_address": "0xYourUSDCWallet"
  }'
```

**Registration:** Free, no upfront fees.

### 2. Get Your Referral Link

After approval, you'll receive:
- **Referral code:** `BROKER_ABC123`
- **Tracking URL:** `https://trustcat.ai/?ref=BROKER_ABC123`

Share this with potential clients.

### 3. Client Signs Up

When a client uses your link/code:
1. They get **$950 USDC AII grant** for their first AI workload
2. You're automatically linked as their broker in CatChain
3. You earn 5% on all their future jobs

### 4. Earn Commission
```
Client pays $1000 for compute job
  ↓
Split:
  → Provider: $950 (95%)
  → You (Broker): $50 (5%)
  ↓
USDC sent to your wallet within 24h
```

---

## Commission Structure

| Client Job Value | Provider Gets | Broker Gets (You) |
|------------------|---------------|-------------------|
| $500 | $475 | $25 |
| $1,000 | $950 | $50 |
| $5,000 | $4,750 | $250 |
| $10,000 | $9,500 | $500 |

**Recurring clients = recurring revenue.** If your referral spends $50k over 6 months, you earn $2,500.

---

## Target Clients

### Best Fit Clients
- **AI/ML Startups** training LLMs or diffusion models
- **Animation/VFX Studios** needing render farms
- **Research Labs** running complex simulations
- **Crypto Projects** training AI agents or running validation nodes
- **SaaS Companies** with compute-heavy inference workloads

### Ideal Client Profile
- Needs **high-end GPUs** (RTX 4090/5090 tier)
- Currently using AWS/GCP but wants lower costs
- Values **transparency** and **blockchain-verified** compute
- Prefers **USDC payments** over credit cards

---

## Sales Tools & Resources

### Pitch Deck
Download: https://trustcat.ai/broker-pitch-deck.pdf

**Key talking points:**
- "95% of payment goes to compute provider—best rates in the industry"
- "Every job logged on CatChain blockchain—full transparency"
- "USDC payments only—no sketchy billing, no surprise fees"
- "$950 USDC grant for first-time AI clients—try before you buy"

### Case Studies
- **AI Startup X:** Saved 40% vs AWS for LLM fine-tuning
- **VFX Studio Y:** Rendered 10k frames overnight at half the cost
- **Research Lab Z:** Trained diffusion model with verifiable compute provenance

### FAQ for Clients
**Q: Why TrustCat.ai vs AWS/Azure?**  
A: 30-50% cheaper, transparent blockchain logging, USDC payments, no lock-in.

**Q: What if the provider goes offline mid-job?**  
A: Full refund. We only charge for completed work.

**Q: Can I pay with credit card?**  
A: USDC only. Keeps costs low and transactions transparent.

---

## Tracking Your Earnings

### Dashboard
https://broker.trustcat.ai/your_id

**See:**
- Active clients referred
- Total compute revenue generated
- Your commission earned (pending + paid)
- CatChain transaction links for every payment

### CatChain Explorer
View all your deals on-chain:
```
https://catchain.trustcat.ai/broker/your_catchain_address
```

### Discord Notifications
Join `#broker-updates` for real-time alerts:
- "Client X just completed a $2k job—you earned $100 USDC"
- "New client signed up via your referral link"

---

## Best Practices

### Do This
✅ Target clients who already need GPU compute  
✅ Emphasize the **$950 AII grant** as a risk-free trial  
✅ Share CatChain links to show transparency  
✅ Build long-term relationships—recurring clients = recurring income  

### Don't Do This
❌ Spam or cold outreach without context  
❌ Over-promise on pricing (we're competitive, not free)  
❌ Misrepresent TrustCat.ai's capabilities  

---

## Payment Terms

- **Payment Schedule:** Within 24h of client job completion
- **Payment Method:** USDC to your wallet address
- **Minimum Payout:** $50 (commissions accumulate until threshold met)
- **CatChain Logging:** Every payment transaction recorded on-chain

---

## FAQ

**Q: Do I need to provide technical support to clients?**  
A: No. You refer, we handle onboarding and support. You just collect commission.

**Q: What if a client disputes a job?**  
A: All jobs are logged on CatChain. If there's a legit issue, we refund the client. Your commission is only paid on completed, verified jobs.

**Q: Can I broker for clients in any industry?**  
A: Yes, as long as the workload is legal and complies with our TOS (no crypto mining, no malicious workloads).

**Q: How do I get paid faster?**  
A: The more clients you refer, the more you earn. Payment is automatic once a job completes.

---

## Support

- **Discord:** #broker-support in [TrustCat.ai Discord](https://discord.gg/yourlink)
- **Email:** brokers@trustcat.ai
- **Sales Training:** Weekly calls on Wednesdays at 2pm EST

---

**Ready to start earning?** Register as a broker and share your referral link. Let's cook! 🚂
