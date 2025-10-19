import { Block } from '../lib/types';
import { getTimeAgo } from '../lib/blockchain';
import TransactionCard from './TransactionCard';

export default function BlockCard({ block }: { block: Block }) {
  return (
    <div className="block-card animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-dark-border">
        <div>
          <h3 className="text-2xl font-bold gradient-text">
            Block #{block.block_number}
          </h3>
          <p className="text-dark-muted text-sm mt-1">
            {getTimeAgo(block.timestamp)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-dark-muted text-xs uppercase tracking-wide">Transactions</p>
          <p className="text-2xl font-bold text-white">{block.transaction_count}</p>
        </div>
      </div>

      {/* Hashes */}
      <div className="space-y-3">
        <div>
          <p className="text-dark-muted text-xs uppercase tracking-wide mb-2">Block Hash</p>
          <div className="hash-box text-primary-purple">
            {block.block_hash}
          </div>
        </div>
        
        {block.block_number > 0 && (
          <div>
            <p className="text-dark-muted text-xs uppercase tracking-wide mb-2">Previous Hash</p>
            <div className="hash-box text-dark-muted">
              {block.previous_hash}
            </div>
          </div>
        )}
      </div>

      {/* Transactions */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white">Transactions</h4>
        {block.transactions.map((tx, idx) => (
          <TransactionCard key={idx} tx={tx} />
        ))}
      </div>
    </div>
  );
}
