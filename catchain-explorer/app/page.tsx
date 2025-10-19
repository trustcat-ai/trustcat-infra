'use client';

import { useEffect, useState } from 'react';
import { Block, ChainStats } from './lib/types';
import { fetchBlocks, calculateStats } from './lib/blockchain';

export const dynamic = 'error';

export default function Home() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [stats, setStats] = useState<ChainStats>({
    totalBlocks: 0,
    totalProviders: 0,
    totalJobs: 0,
    totalUSDC: 0,
    totalBrokers: 0,
    totalGrants: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlocks() {
      try {
        const fetchedBlocks = await fetchBlocks();
        setBlocks(fetchedBlocks);
        setStats(calculateStats(fetchedBlocks));
      } catch (error) {
        console.error('Error loading blocks:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBlocks();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* ASCII Header */}
      <div className="terminal-box mb-8">
        <pre className="text-green-400 text-xs md:text-sm overflow-x-auto">
{`
 ██████╗ █████╗ ████████╗ ██████╗██╗  ██╗ █████╗ ██╗███╗   ██╗
██╔════╝██╔══██╗╚══██╔══╝██╔════╝██║  ██║██╔══██╗██║████╗  ██║
██║     ███████║   ██║   ██║     ███████║███████║██║██╔██╗ ██║
██║     ██╔══██║   ██║   ██║     ██╔══██║██╔══██║██║██║╚██╗██║
╚██████╗██║  ██║   ██║   ╚██████╗██║  ██║██║  ██║██║██║ ╚████║
 ╚═════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝
                                                                
TrustCat.ai Compute Ledger | Immutable Infrastructure Log
───────────────────────────────────────────────────────────────
`}
        </pre>
        <div className="flex gap-4 text-xs mt-2">
          <a href="https://github.com/trustcat-ai/trustcat-infra" target="_blank" className="text-terminal-blue hover:underline">
            [github]
          </a>
          <a href="https://x.com/TrustCatAI" target="_blank" className="text-terminal-blue hover:underline">
            [@TrustCatAI]
          </a>
          <a href="https://github.com/trustcat-ai/trustcat-infra/tree/main/docs" className="text-terminal-blue hover:underline">
            [docs]
          </a>
        </div>
      </div>

      {/* Stats - Terminal Table */}
      <div className="terminal-box mb-8">
        <div className="terminal-header">CHAIN STATISTICS</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-green-600 mb-1">TOTAL_BLOCKS</div>
            <div className="text-2xl text-green-400">{stats.totalBlocks}</div>
          </div>
          <div>
            <div className="text-green-600 mb-1">PROVIDERS</div>
            <div className="text-2xl text-green-400">{stats.totalProviders}</div>
          </div>
          <div>
            <div className="text-green-600 mb-1">JOBS_COMPLETE</div>
            <div className="text-2xl text-green-400">{stats.totalJobs}</div>
          </div>
          <div>
            <div className="text-green-600 mb-1">TOTAL_USDC</div>
            <div className="text-2xl text-terminal-amber">${stats.totalUSDC.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="terminal-box mb-8">
        <input
          type="text"
          placeholder="$ search [block|provider|client|job]"
          className="w-full bg-transparent border-none outline-none text-green-400 placeholder-green-600 text-sm"
        />
      </div>

      {/* Blocks */}
      <div className="space-y-4">
        {loading ? (
          <div className="terminal-box text-center py-12">
            <div className="text-green-400 animate-pulse">Loading blockchain data<span className="cursor"></span></div>
          </div>
        ) : blocks.length === 0 ? (
          <div className="terminal-box text-center py-12 text-terminal-red">
            ERROR: No blocks found
          </div>
        ) : (
          blocks.map(block => (
            <div key={block.block_number} className="block-box">
              {/* Block Header */}
              <div className="flex justify-between items-start mb-4 pb-3 border-b border-green-500/30">
                <div>
                  <div className="text-terminal-amber text-lg">BLOCK #{block.block_number}</div>
                  <div className="text-green-600 text-xs mt-1">
                    {new Date(block.timestamp).toISOString()}
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="text-green-600">TX_COUNT</div>
                  <div className="text-green-400 text-lg">{block.transaction_count}</div>
                </div>
              </div>

              {/* Hashes */}
              <div className="space-y-2 mb-4 text-xs">
                <div>
                  <span className="text-green-600">HASH: </span>
                  <span className="hash-display">{block.block_hash}</span>
                </div>
                {block.block_number > 0 && (
                  <div>
                    <span className="text-green-600">PREV: </span>
                    <span className="hash-display">{block.previous_hash}</span>
                  </div>
                )}
              </div>

              {/* Transactions */}
              <div>
                <div className="text-green-600 text-xs mb-2">TRANSACTIONS:</div>
                {block.transactions.map((tx, idx) => (
                  <div key={idx} className="tx-row text-xs">
                    <div className="flex justify-between mb-2">
                      <span className="text-terminal-amber uppercase">[{tx.type.replace(/_/g, '_')}]</span>
                    </div>
                    
                    {tx.type === 'provider_registration' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-green-400">
                        <div><span className="text-green-600">ID:</span> {tx.provider_id}</div>
                        <div><span className="text-green-600">GPU:</span> {tx.rig_specs?.gpu}</div>
                        <div><span className="text-green-600">CPU:</span> {tx.rig_specs?.cpu}</div>
                        <div><span className="text-green-600">RAM:</span> {tx.rig_specs?.ram_gb}GB</div>
                        <div className="col-span-2"><span className="text-green-600">FEE:</span> ${tx.registration_fee_usdc} USDC</div>
                      </div>
                    )}

                    {tx.type === 'compute_job' && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-green-400">
                        <div><span className="text-green-600">JOB:</span> {tx.job_id}</div>
                        <div><span className="text-green-600">CLIENT:</span> {tx.client_id}</div>
                        <div><span className="text-green-600">PROVIDER:</span> {tx.provider_id}</div>
                        <div><span className="text-green-600">DURATION:</span> {tx.duration_hours}h</div>
                        <div><span className="text-green-600">COST:</span> <span className="text-terminal-amber">${tx.cost_usdc}</span></div>
                        <div><span className="text-green-600">PAYOUT:</span> <span className="text-terminal-amber">${tx.provider_payout_usdc}</span></div>
                      </div>
                    )}

                    {tx.type === 'broker_registration' && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-green-400">
                        <div><span className="text-green-600">ID:</span> {tx.broker_id}</div>
                        <div><span className="text-green-600">NAME:</span> {tx.broker_name}</div>
                        <div><span className="text-green-600">RATE:</span> {(tx.commission_rate * 100).toFixed(1)}%</div>
                      </div>
                    )}

                    {tx.type === 'aii_grant' && (
                      <div className="grid grid-cols-2 gap-2 text-green-400">
                        <div><span className="text-green-600">CLIENT:</span> {tx.client_id}</div>
                        <div><span className="text-green-600">AMOUNT:</span> <span className="text-terminal-amber">${tx.grant_amount_usdc}</span></div>
                        <div className="col-span-2"><span className="text-green-600">CONDITION:</span> {tx.conditions}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="terminal-box mt-8 text-xs text-center text-green-600">
        <div>TrustCat.ai | Immutable Compute Infrastructure</div>
        <div className="mt-1">No shitcoins. No rugs. Just math.</div>
      </div>
    </div>
  );
}
