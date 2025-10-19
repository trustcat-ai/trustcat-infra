# CatChain — The Trust Ledger for TrustCat.ai Compute

**CatChain** is TrustCat.ai's immutable blockchain that logs every compute transaction, provider registration, broker deal, and AII grant. No centralized database. No manipulation. Just cryptographic proof of every event.

---

## What Is CatChain?

CatChain is a **compute-focused blockchain** that provides:
- **Immutable Audit Trail:** Every provider, client, and job logged forever
- **Cryptographic Verification:** SHA256 hashing ensures tamper-proof records
- **Transparent Payments:** All USDC flows recorded on-chain
- **Trust Through Math:** No need to "trust" TrustCat.ai—verify it yourself

### Core Principles
1. **No Shitcoins:** CatChain is a ledger, not a token. Payments are in USDC.
2. **No Middleman Tax:** Transparent revenue splits (95% provider, 5% broker)
3. **Open Verification:** Anyone can audit the chain via GitHub

---

## How CatChain Works

### Block Structure

Each block contains:
```json
{
  "block_number": 2,
  "timestamp": "2025-10-19T16:30:45Z",
  "previous_hash": "0xabc123...",
  "block_hash": "0xdef456...",
  "transaction_count": 1,
  "transactions": [
    {
      "type": "compute_job",
      "job_id": "job_12345",
      "client_id": "client_abc",
      "provider_id": "provider_003",
      "duration_hours": 24,
      "cost_usdc": 500,
      "broker_commission_usdc": 25,
      "provider_payout_usdc": 475
    }
  ]
}
```

### Chain Linkage
```
Block 0 (Genesis)
  ↓ previous_hash
Block 1
  ↓ previous_hash
Block 2
  ↓ previous_hash
Block 3
```

**If anyone tampers with Block 1:**
- Block 1's hash changes
- Block 2's `previous_hash` no longer matches
- **Chain breaks = tampering detected**

This is how Bitcoin/Ethereum work. CatChain uses the same cryptographic principles.

---

## Transaction Types

### 1. Provider Registration
```json
{
  "type": "provider_registration",
  "provider_id": "provider_003",
  "rig_specs": {
    "gpu": "RTX 5090",
    "cpu": "AMD 7950X",
    "ram_gb": 64
  },
  "catchain_address": "0xABC123...",
  "registration_fee_usdc": 100
}
```

**What it means:** A new GPU rig joined the TrustCat.ai network.

---

### 2. Compute Job
```json
{
  "type": "compute_job",
  "job_id": "job_12345",
  "client_id": "client_abc",
  "provider_id": "provider_001",
  "broker_id": "broker_xyz",
  "duration_hours": 24,
  "cost_usdc": 500,
  "broker_commission_usdc": 25,
  "provider_payout_usdc": 475
}
```

**What it means:** 
- Client paid $500 USDC for 24 hours of compute
- Provider earned $475
- Broker earned $25
- All verified on-chain

---

### 3. Broker Registration
```json
{
  "type": "broker_registration",
  "broker_id": "broker_xyz",
  "broker_name": "Crypto Bros LLC",
  "commission_rate": 0.05,
  "catchain_address": "0xDEF789..."
}
```

**What it means:** A new broker joined to refer clients and earn 5% commission.

---

### 4. AII Grant
```json
{
  "type": "aii_grant",
  "client_id": "client_abc",
  "grant_amount_usdc": 950,
  "conditions": "First-time AI workload",
  "grant_date": "2025-10-19T15:00:00Z"
}
```

**What it means:** A first-time AI client received a $950 USDC grant from TrustCat.ai's Adoption Investment Initiative.

---

## Using the Block Generator

### View Latest Blocks
```bash
ls -lh blocks/
```

### Create a New Provider Registration
```bash
python3 ../scripts/catchain_block_generator.py provider \
  provider_005 \
  "RTX 5090" \
  "AMD 7950X" \
  64 \
  "0xYourAddress"
```

### Create a Compute Job
```bash
python3 ../scripts/catchain_block_generator.py job \
  job_67890 \
  client_xyz \
  provider_005 \
  48 \
  1000
```

### Create an AII Grant
```bash
python3 ../scripts/catchain_block_generator.py aii client_xyz
```

### Create a Broker Registration
```bash
python3 ../scripts/catchain_block_generator.py broker \
  broker_abc \
  "AI Startups Inc" \
  "0xBrokerAddress"
```

### Verify Chain Integrity
```bash
python3 ../scripts/catchain_block_generator.py verify
```

**Output:**
```
🔍 Verifying 5 blocks...
✅ Block 0 verified
✅ Block 1 verified
✅ Block 2 verified
✅ Block 3 verified
✅ Block 4 verified
🎉 Chain integrity verified!
```

---

## Verifying CatChain Yourself

### Option 1: Manual Verification (No Code)

1. **Open any block:** `cat blocks/block-2.json`
2. **Copy the `previous_hash`**
3. **Open the previous block:** `cat blocks/block-1.json`
4. **Compare `block_hash` from Block 1 with `previous_hash` from Block 2**
5. **They should match** ✅

If they don't match, the chain has been tampered with.

---

### Option 2: Automated Verification (Python)
```bash
cd ~/trustcat-infra
python3 scripts/catchain_block_generator.py verify
```

This script:
1. Reads all blocks in order
2. Verifies each `previous_hash` links correctly
3. Recalculates each `block_hash` to ensure no content changes
4. Reports any tampering

---

## Current Chain Stats

| Metric | Value |
|--------|-------|
| **Total Blocks** | 5 |
| **Genesis Block** | Block 0 (Oct 19, 2025) |
| **Latest Block** | Block 4 |
| **Providers Registered** | 2 |
| **Jobs Completed** | 1 |
| **AII Grants Issued** | 1 |
| **Brokers Registered** | 1 |
| **Total USDC Logged** | $1,550 ($100+$100 reg fees, $500 job, $950 grant) |

*Stats as of Block 4*

---

## CatChain vs Traditional Compute Platforms

| Feature | CatChain (TrustCat.ai) | AWS/GCP/Azure |
|---------|------------------------|---------------|
| **Transparency** | Every transaction on-chain | Black box billing |
| **Verification** | Anyone can audit | Trust the company |
| **Revenue Split** | 95% to provider, visible | Hidden margins |
| **Payment Method** | USDC (blockchain-native) | Credit cards, wire transfers |
| **Audit Trail** | Immutable, cryptographic | Logs can be edited |

---

## Roadmap

### Phase 1 (✅ Complete)
- Genesis block created
- Automation script live
- 5+ transaction types supported
- GitHub repository published

### Phase 2 (In Progress)
- Block explorer web UI
- Real-time chain stats dashboard
- Integration with k3s job completion hooks
- ENS subdomain linking (e.g., `provider-001.trustcat.eth` → CatChain address)

### Phase 3 (Future)
- Smart contract deployment on Base L2
- Automated USDC payments via blockchain
- Cross-chain verification (Ethereum mainnet anchoring)
- Public API for chain queries

---

## FAQ

**Q: Is CatChain a cryptocurrency?**  
A: No. CatChain is a ledger for logging compute transactions. Payments happen in USDC, not a custom token.

**Q: Can I mine CatChain blocks?**  
A: No. Blocks are created by TrustCat.ai when real-world events occur (provider registers, job completes, etc.). This isn't proof-of-work mining.

**Q: What if TrustCat.ai goes offline?**  
A: The entire chain is on GitHub. Anyone can fork it, verify it, and continue the ledger.

**Q: How is this different from a database?**  
A: Databases can be edited or deleted. CatChain uses cryptographic hashing—once a block is created, tampering is mathematically detectable.

**Q: Can I query CatChain programmatically?**  
A: Yes! All blocks are JSON files. Parse them with any language:
```bash
# Example: Find all jobs for provider_001
grep -r "provider_001" blocks/*.json
```

**Q: What prevents duplicate job IDs or fake transactions?**  
A: Currently, TrustCat.ai admins create blocks. Phase 3 will add smart contract enforcement on Base L2 for trustless validation.

---

## Contributing

Want to propose a new transaction type or improve the block generator?

1. Fork the repo: https://github.com/trustcat-ai/trustcat-infra
2. Make changes to `scripts/catchain_block_generator.py`
3. Test with `python3 scripts/catchain_block_generator.py verify`
4. Submit a PR

---

## Links

- **Main Repo:** https://github.com/trustcat-ai/trustcat-infra
- **Blocks:** https://github.com/trustcat-ai/trustcat-infra/tree/main/catchain/blocks
- **Discord:** [Your Discord Link]
- **X (Twitter):** [@TrustCatAI](https://x.com/TrustCatAI)

---

**CatChain: Trust Through Math, Not Marketing.** 🚂
