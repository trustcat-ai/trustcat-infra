#!/usr/bin/env python3
"""
TrustCat.ai CatChain Block Generator
Automates creation of blockchain blocks for compute transactions
"""

import json
import hashlib
import os
from datetime import datetime, timezone
from pathlib import Path

class CatChainBlock:
    def __init__(self, block_number, previous_hash, transactions):
        self.block_number = block_number
        self.timestamp = datetime.now(timezone.utc).isoformat()
        self.previous_hash = previous_hash
        self.transactions = transactions
        self.block_hash = self._generate_hash()
    
    def _generate_hash(self):
        """Generate SHA256 hash of block contents"""
        block_string = json.dumps({
            "block_number": self.block_number,
            "timestamp": self.timestamp,
            "previous_hash": self.previous_hash,
            "transactions": self.transactions
        }, sort_keys=True)
        return hashlib.sha256(block_string.encode()).hexdigest()
    
    def to_dict(self):
        """Convert block to dictionary"""
        return {
            "block_number": self.block_number,
            "timestamp": self.timestamp,
            "previous_hash": self.previous_hash,
            "block_hash": self.block_hash,
            "transactions": self.transactions,
            "transaction_count": len(self.transactions)
        }
    
    def save(self, blocks_dir="catchain/blocks"):
        """Save block to JSON file"""
        Path(blocks_dir).mkdir(parents=True, exist_ok=True)
        filename = f"{blocks_dir}/block-{self.block_number}.json"
        
        with open(filename, 'w') as f:
            json.dump(self.to_dict(), f, indent=2)
        
        print(f"✅ Block {self.block_number} created")
        print(f"   Hash: {self.block_hash[:16]}...")
        print(f"   Transactions: {len(self.transactions)}")
        print(f"   Saved to: {filename}")
        return filename


class CatChain:
    def __init__(self, blocks_dir="catchain/blocks"):
        self.blocks_dir = blocks_dir
        Path(blocks_dir).mkdir(parents=True, exist_ok=True)
    
    def get_latest_block(self):
        """Get the most recent block in the chain"""
        block_files = sorted(Path(self.blocks_dir).glob("block-*.json"))
        
        if not block_files:
            return None
        
        latest_file = block_files[-1]
        with open(latest_file, 'r') as f:
            return json.load(f)
    
    def get_next_block_number(self):
        """Calculate next block number"""
        latest = self.get_latest_block()
        return 0 if latest is None else latest["block_number"] + 1
    
    def add_block(self, transactions):
        """Add a new block to the chain"""
        latest = self.get_latest_block()
        
        if latest is None:
            # Genesis block
            previous_hash = "0" * 64
            block_number = 0
        else:
            previous_hash = latest["block_hash"]
            block_number = latest["block_number"] + 1
        
        # Create and save new block
        block = CatChainBlock(block_number, previous_hash, transactions)
        block.save(self.blocks_dir)
        
        return block
    
    def verify_chain(self):
        """Verify integrity of entire blockchain"""
        block_files = sorted(Path(self.blocks_dir).glob("block-*.json"))
        
        if not block_files:
            print("⚠️  No blocks found")
            return False
        
        print(f"🔍 Verifying {len(block_files)} blocks...")
        
        previous_hash = None
        for block_file in block_files:
            with open(block_file, 'r') as f:
                block = json.load(f)
            
            # Check previous hash linkage (skip genesis block)
            if block["block_number"] > 0:
                if block["previous_hash"] != previous_hash:
                    print(f"❌ Block {block['block_number']}: Hash mismatch!")
                    return False
            
            # Verify block's own hash
            computed_hash = CatChainBlock(
                block["block_number"],
                block["previous_hash"],
                block["transactions"]
            )._generate_hash()
            
            if computed_hash != block["block_hash"]:
                print(f"❌ Block {block['block_number']}: Hash corruption!")
                return False
            
            print(f"✅ Block {block['block_number']} verified")
            previous_hash = block["block_hash"]
        
        print("🎉 Chain integrity verified!")
        return True


# ===== Transaction Templates =====

def provider_registration(provider_id, gpu_model, cpu_model, ram_gb, 
                          catchain_address, registration_fee=100):
    """Create provider registration transaction"""
    return {
        "type": "provider_registration",
        "provider_id": provider_id,
        "rig_specs": {
            "gpu": gpu_model,
            "cpu": cpu_model,
            "ram_gb": ram_gb
        },
        "catchain_address": catchain_address,
        "registration_fee_usdc": registration_fee,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

def compute_job(job_id, client_id, provider_id, duration_hours, 
                cost_usdc, broker_id=None, broker_commission=0):
    """Create compute job transaction"""
    return {
        "type": "compute_job",
        "job_id": job_id,
        "client_id": client_id,
        "provider_id": provider_id,
        "broker_id": broker_id,
        "duration_hours": duration_hours,
        "cost_usdc": cost_usdc,
        "broker_commission_usdc": broker_commission,
        "provider_payout_usdc": cost_usdc - broker_commission,
        "start_time": datetime.now(timezone.utc).isoformat(),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

def broker_registration(broker_id, broker_name, catchain_address, 
                        commission_rate=0.05):
    """Create broker registration transaction"""
    return {
        "type": "broker_registration",
        "broker_id": broker_id,
        "broker_name": broker_name,
        "commission_rate": commission_rate,
        "catchain_address": catchain_address,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

def aii_grant(client_id, grant_amount=950, conditions="First-time AI workload"):
    """Create AII grant transaction"""
    return {
        "type": "aii_grant",
        "client_id": client_id,
        "grant_amount_usdc": grant_amount,
        "conditions": conditions,
        "grant_date": datetime.now(timezone.utc).isoformat()
    }


# ===== CLI Interface =====

if __name__ == "__main__":
    import sys
    
    chain = CatChain()
    
    if len(sys.argv) < 2:
        print("Usage:")
        print("  python catchain_block_generator.py verify")
        print("  python catchain_block_generator.py provider <id> <gpu> <cpu> <ram> <address>")
        print("  python catchain_block_generator.py job <job_id> <client_id> <provider_id> <hours> <cost>")
        print("  python catchain_block_generator.py broker <id> <name> <address>")
        print("  python catchain_block_generator.py aii <client_id>")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "verify":
        chain.verify_chain()
    
    elif command == "provider":
        tx = provider_registration(
            sys.argv[2],  # provider_id
            sys.argv[3],  # gpu
            sys.argv[4],  # cpu
            int(sys.argv[5]),  # ram
            sys.argv[6]   # address
        )
        chain.add_block([tx])
    
    elif command == "job":
        tx = compute_job(
            sys.argv[2],  # job_id
            sys.argv[3],  # client_id
            sys.argv[4],  # provider_id
            int(sys.argv[5]),  # hours
            float(sys.argv[6])  # cost
        )
        chain.add_block([tx])
    
    elif command == "broker":
        tx = broker_registration(
            sys.argv[2],  # broker_id
            sys.argv[3],  # name
            sys.argv[4]   # address
        )
        chain.add_block([tx])
    
    elif command == "aii":
        tx = aii_grant(sys.argv[2])  # client_id
        chain.add_block([tx])
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)
