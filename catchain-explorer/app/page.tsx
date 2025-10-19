'use client';

import { useEffect, useState } from 'react';
import { Block, ChainStats } from './lib/types';
import { fetchBlocks, calculateStats } from './lib/blockchain';
import StatsGrid from './components/StatsGrid';
import BlockCard from './components/BlockCard';
import Link from 'next/link';

// Force static export
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass-card mx-auto max-w-7xl my-8 p-8 md:p-16 text-center">
        <div className="animate-float">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 relative">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <path
                  d="M100 40 C80 40, 60 50, 50 70 L50 100 C50 120, 60 140, 80 150 L100 160 L120 150 C140 140, 150 120, 150 100 L150 70 C150 50, 140 40, 120 40 L100 40 Z M70 80 C70 75, 72 70, 76 70 C80 70, 82 75, 82 80 C82 85, 80 90, 76 90 C72 90, 70 85, 70 80 Z M118 80 C118 75, 120 70, 124 70 C128 70, 130 75, 130 80 C130 85, 128 90, 124 90 C120 90, 118 85, 118 80 Z M100 110 L90 115 C85 117, 80 115, 78 110 M100 110 L110 115 C115 117, 120 115, 122 110"
                  stroke="#4a9eff"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-glow"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-cat bg-clip-text text-transparent">
              CatChain
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-dark-muted max-w-2xl mx-auto mb-2">
            TrustCat.ai Compute Ledger
          </p>
          <p className="text-primary-cat text-lg md:text-xl font-semibold tracking-wide">
            Welcome to the Trust Machine
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link 
            href="https://github.com/trustcat-ai/trustcat-infra" 
            target="_blank"
            className="glass-card-hover px-6 py-3 text-sm font-medium hover:text-primary-cat transition-colors"
          >
            📖 GitHub
          </Link>
          <Link 
            href="https://x.com/TrustCatAI" 
            target="_blank"
            className="glass-card-hover px-6 py-3 text-sm font-medium hover:text-primary-cat transition-colors"
          >
            🐦 @TrustCatAI
          </Link>
          <Link 
            href="https://github.com/trustcat-ai/trustcat-infra/tree/main/docs" 
            className="glass-card-hover px-6 py-3 text-sm font-medium hover:text-primary-cat transition-colors"
          >
            📚 Docs
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        {/* Stats */}
        <StatsGrid stats={stats} />

        {/* Search Bar */}
        <div className="glass-card p-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="text-primary-cat text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search by block number, provider ID, client ID, job ID..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-dark-muted text-lg"
            />
          </div>
        </div>

        {/* Blocks */}
        <div className="space-y-6">
          {loading ? (
            <div className="glass-card p-12 text-center">
              <p className="text-2xl text-dark-muted animate-pulse-slow">
                Loading blocks from CatChain...
              </p>
            </div>
          ) : blocks.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-2xl text-dark-muted">
                No blocks found. Check GitHub repository.
              </p>
            </div>
          ) : (
            blocks.map(block => (
              <BlockCard key={block.block_number} block={block} />
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-border mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-8">
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                <path
                  d="M100 40 C80 40, 60 50, 50 70 L50 100 C50 120, 60 140, 80 150 L100 160 L120 150 C140 140, 150 120, 150 100 L150 70 C150 50, 140 40, 120 40 L100 40 Z M70 80 C70 75, 72 70, 76 70 C80 70, 82 75, 82 80 C82 85, 80 90, 76 90 C72 90, 70 85, 70 80 Z M118 80 C118 75, 120 70, 124 70 C128 70, 130 75, 130 80 C130 85, 128 90, 124 90 C120 90, 118 85, 118 80 Z M100 110 L90 115 C85 117, 80 115, 78 110 M100 110 L110 115 C115 117, 120 115, 122 110"
                  stroke="#4a9eff"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-dark-text">TrustCat.ai</span>
          </div>
          <p className="text-dark-muted">
            CatChain: An immutable ledger for compute transactions
          </p>
          <p className="text-sm text-dark-muted">
            No shitcoins. No rugs. No middlemen. Just compute, adoption, and trust.
          </p>
        </div>
      </footer>
    </div>
  );
}
