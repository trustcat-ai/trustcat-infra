import { Transaction } from '../lib/types';
import { formatUSDC } from '../lib/blockchain';

const TX_TYPE_COLORS = {
  provider_registration: 'bg-primary-green text-white',
  compute_job: 'bg-primary-blue text-white',
  broker_registration: 'bg-primary-orange text-white',
  aii_grant: 'bg-purple-600 text-white',
};

export default function TransactionCard({ tx }: { tx: Transaction }) {
  const typeLabel = tx.type.replace(/_/g, ' ');
  const colorClass = TX_TYPE_COLORS[tx.type] || 'bg-gray-600 text-white';

  return (
    <div className="bg-black/20 rounded-xl p-5 border-l-4 border-primary-purple space-y-4">
      <span className={`tx-badge ${colorClass}`}>
        {typeLabel}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tx.type === 'provider_registration' && (
          <>
            <Field label="Provider ID" value={tx.provider_id} />
            <Field label="GPU" value={tx.rig_specs?.gpu} />
            <Field label="CPU" value={tx.rig_specs?.cpu} />
            <Field label="RAM" value={`${tx.rig_specs?.ram_gb}GB`} />
            <Field label="Registration Fee" value={formatUSDC(tx.registration_fee_usdc)} />
          </>
        )}

        {tx.type === 'compute_job' && (
          <>
            <Field label="Job ID" value={tx.job_id} mono />
            <Field label="Client" value={tx.client_id} mono />
            <Field label="Provider" value={tx.provider_id} mono />
            <Field label="Duration" value={`${tx.duration_hours}h`} />
            <Field label="Total Cost" value={formatUSDC(tx.cost_usdc)} highlight />
            {tx.broker_id && <Field label="Broker" value={tx.broker_id} mono />}
            {tx.broker_commission_usdc > 0 && (
              <Field label="Broker Commission" value={formatUSDC(tx.broker_commission_usdc)} />
            )}
            <Field label="Provider Payout" value={formatUSDC(tx.provider_payout_usdc)} highlight />
          </>
        )}

        {tx.type === 'broker_registration' && (
          <>
            <Field label="Broker ID" value={tx.broker_id} mono />
            <Field label="Name" value={tx.broker_name} />
            <Field label="Commission Rate" value={`${(tx.commission_rate * 100).toFixed(1)}%`} />
          </>
        )}

        {tx.type === 'aii_grant' && (
          <>
            <Field label="Client ID" value={tx.client_id} mono />
            <Field label="Grant Amount" value={formatUSDC(tx.grant_amount_usdc)} highlight />
            <Field label="Conditions" value={tx.conditions} span={2} />
          </>
        )}
      </div>
    </div>
  );
}

function Field({ 
  label, 
  value, 
  mono = false, 
  highlight = false,
  span = 1 
}: { 
  label: string; 
  value: any; 
  mono?: boolean; 
  highlight?: boolean;
  span?: number;
}) {
  return (
    <div className={`${span > 1 ? `md:col-span-${span}` : ''}`}>
      <p className="text-dark-muted text-xs uppercase tracking-wide mb-1">{label}</p>
      <p className={`text-white font-medium ${mono ? 'font-mono text-sm' : ''} ${highlight ? 'text-primary-green font-bold' : ''}`}>
        {value || 'N/A'}
      </p>
    </div>
  );
}
