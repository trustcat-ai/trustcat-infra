import { ChainStats } from '../lib/types';
import { formatUSDC } from '../lib/blockchain';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
}

function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="stat-card group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-muted text-sm font-medium uppercase tracking-wider mb-2">
            {label}
          </p>
          <p className="text-4xl font-bold text-white group-hover:gradient-text transition-all">
            {value}
          </p>
        </div>
        <div className="text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function StatsGrid({ stats }: { stats: ChainStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard label="Total Blocks" value={stats.totalBlocks} icon="🔗" />
      <StatCard label="Providers" value={stats.totalProviders} icon="⚡" />
      <StatCard label="Jobs Completed" value={stats.totalJobs} icon="✅" />
      <StatCard label="Total USDC" value={formatUSDC(stats.totalUSDC)} icon="💰" />
    </div>
  );
}
