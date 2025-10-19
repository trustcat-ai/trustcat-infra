import { Block, ChainStats } from './types';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/trustcat-ai/trustcat-infra/main/catchain/blocks';

export async function fetchBlocks(): Promise<Block[]> {
  const blocks: Block[] = [];
  let blockNum = 0;
  let consecutiveErrors = 0;
  
  while (consecutiveErrors < 3) {
    try {
      const response = await fetch(`${GITHUB_RAW_BASE}/block-${blockNum}.json`, {
        cache: 'no-store' // Always fetch fresh for now
      });
      
      if (response.ok) {
        const block = await response.json();
        blocks.push(block);
        consecutiveErrors = 0;
      } else {
        consecutiveErrors++;
      }
      blockNum++;
    } catch (err) {
      consecutiveErrors++;
      blockNum++;
    }
  }
  
  return blocks.reverse(); // Newest first
}

export function calculateStats(blocks: Block[]): ChainStats {
  const providers = new Set<string>();
  const brokers = new Set<string>();
  let jobs = 0;
  let grants = 0;
  let totalUSDC = 0;

  blocks.forEach(block => {
    block.transactions.forEach(tx => {
      switch (tx.type) {
        case 'provider_registration':
          providers.add(tx.provider_id);
          totalUSDC += tx.registration_fee_usdc || 0;
          break;
        case 'compute_job':
          jobs++;
          totalUSDC += tx.cost_usdc || 0;
          break;
        case 'broker_registration':
          brokers.add(tx.broker_id);
          break;
        case 'aii_grant':
          grants++;
          totalUSDC += tx.grant_amount_usdc || 0;
          break;
      }
    });
  });

  return {
    totalBlocks: blocks.length,
    totalProviders: providers.size,
    totalJobs: jobs,
    totalUSDC,
    totalBrokers: brokers.size,
    totalGrants: grants,
  };
}

export function getTimeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function formatUSDC(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
