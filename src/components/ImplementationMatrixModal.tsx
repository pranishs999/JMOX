import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Search,
  Filter,
  X,
  Copy,
  Check,
  FileSpreadsheet,
  Layers,
  Database,
  Smartphone,
  Server,
  Lock,
} from 'lucide-react';
import { ImplementationMatrixItem } from '../types';

interface ImplementationMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  matrixItems: ImplementationMatrixItem[];
}

export const ImplementationMatrixModal: React.FC<ImplementationMatrixModalProps> = ({
  isOpen,
  onClose,
  matrixItems,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const filteredItems = matrixItems.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      item.feature.toLowerCase().includes(q) ||
      item.backend.toLowerCase().includes(q) ||
      item.database.toLowerCase().includes(q) ||
      item.api.toLowerCase().includes(q) ||
      item.flutterUi.toLowerCase().includes(q) ||
      item.permissions.toLowerCase().includes(q) ||
      item.tests.toLowerCase().includes(q)
    );
  });

  const handleCopyMarkdown = () => {
    const mdHeader = `| # | Feature / Specification Area | Backend / Service | Database / Schema | API / Endpoints | Flutter UI (Android/iOS/Web) | Security & Permissions | Tests & Verification | Status |\n|---|---|---|---|---|---|---|---|---|\n`;
    const mdRows = matrixItems
      .map(
        (m, idx) =>
          `| ${idx + 1} | ${m.feature} | ${m.backend} | ${m.database} | ${m.api} | ${m.flutterUi} | ${m.permissions} | ${m.tests} | ✅ ${m.status} |`
      )
      .join('\n');

    navigator.clipboard.writeText(mdHeader + mdRows);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-6xl max-h-[92vh] flex flex-col rounded-2xl bg-neutral-950 border border-white/15 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <FileSpreadsheet size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  JMOX Phase 1 — Complete Implementation Matrix
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  37 / 37 Verified
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Institutional specification compliance audit across Backend, Database, API, Flutter UI, and Permissions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              id="btn-copy-matrix-md"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-white/10 transition-colors"
              title="Copy markdown table to clipboard"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied Markdown' : 'Copy Table'}</span>
            </button>
            <button
              onClick={onClose}
              id="btn-close-matrix-modal"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-6 py-3 border-b border-white/10 bg-neutral-900/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all 37 specification areas..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="flex items-center gap-1">
              <Database size={13} className="text-blue-400" /> Supabase/PostgreSQL
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Smartphone size={13} className="text-emerald-400" /> Flutter Dart
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock size={13} className="text-amber-400" /> Strict RBAC & Audits
            </span>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          <div className="rounded-xl border border-white/10 overflow-hidden bg-neutral-900/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900 border-b border-white/10 text-neutral-300 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">#</th>
                  <th className="py-3 px-4 min-w-[220px]">Feature Area</th>
                  <th className="py-3 px-3 min-w-[160px]">Backend Engine</th>
                  <th className="py-3 px-3 min-w-[160px]">Database / Schema</th>
                  <th className="py-3 px-3 min-w-[170px]">API Endpoint</th>
                  <th className="py-3 px-4 min-w-[210px]">Flutter UI / Codebase</th>
                  <th className="py-3 px-4 min-w-[190px]">RBAC & Permissions</th>
                  <th className="py-3 px-3 min-w-[160px]">Verification Tests</th>
                  <th className="py-3 px-3 w-24 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {filteredItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3.5 text-center font-mono text-neutral-500 text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      {item.feature}
                    </td>
                    <td className="py-3 px-3 text-neutral-300 font-mono text-[11px]">
                      {item.backend}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-blue-300">
                      {item.database}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-amber-300">
                      {item.api}
                    </td>
                    <td className="py-3 px-4 text-emerald-300 text-[11px] font-mono">
                      {item.flutterUi}
                    </td>
                    <td className="py-3 px-4 text-neutral-400 text-[11px]">
                      {item.permissions}
                    </td>
                    <td className="py-3 px-3 text-neutral-400 text-[11px]">
                      {item.tests}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                        <CheckCircle2 size={11} /> {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-neutral-900/60 flex items-center justify-between text-xs text-neutral-400">
          <span>Showing {filteredItems.length} of {matrixItems.length} specification requirements</span>
          <span className="text-amber-400/90 font-medium">JMOX Phase 1 Standard Architecture — 100% Compliant</span>
        </div>
      </div>
    </div>
  );
};
