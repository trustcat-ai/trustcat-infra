export interface Transaction {
  type: 'provider_registration' | 'compute_job' | 'broker_registration' | 'aii_grant';
  timestamp?: string;
  [key: string]: any;
}

export interface Block {
  block_number: number;
  timestamp: string;
  previous_hash: string;
  block_hash: string;
  transaction_count: number;
  transactions: Transaction[];
}

export interface ChainStats {
  totalBlocks: number;
  totalProviders: number;
  totalJobs: number;
  totalUSDC: number;
  totalBrokers: number;
  totalGrants: number;
}
