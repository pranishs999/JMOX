import React, { useState } from 'react';
import {
  Library,
  BookOpen,
  Download,
  FileText,
  ExternalLink,
  CheckCircle2,
  Bookmark,
  Sparkles,
  Search,
} from 'lucide-react';
import { BookModel, MaterialModel } from '../types';

interface ResourcesViewProps {
  books: BookModel[];
  materials: MaterialModel[];
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({
  books,
  materials,
}) => {
  const [activeTab, setActiveTab] = useState<'materials' | 'books'>('materials');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDownload = (material: MaterialModel) => {
    setDownloadToast(`Preparing download: ${material.title} (${material.fileSize})`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  const filteredMaterials = materials.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.level.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Curated Literature & Competition Materials
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Standard Olympiad references, downloadable problem sets, and non-routine solutions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-neutral-900 border border-white/10 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('materials')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'materials'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Problem Sets ({materials.length})
            </button>
            <button
              onClick={() => setActiveTab('books')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'books'
                  ? 'bg-white text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Classic Textbooks ({books.length})
            </button>
          </div>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadToast && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400"
        />
        <input
          type="text"
          placeholder={
            activeTab === 'materials'
              ? 'Filter problem sets by topic or title...'
              : 'Search books by author or title...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900/80 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
        />
      </div>

      {/* 1. Problem Sets & Materials Tab */}
      {activeTab === 'materials' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaterials.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    {m.category}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {m.fileSize}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {m.title}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2">
                  {m.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] text-neutral-500 font-mono">
                  Added: {m.createdAt}
                </span>
                <button
                  onClick={() => handleDownload(m)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white text-neutral-200 hover:text-black text-xs font-semibold transition-colors"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 2. Classic Textbooks Tab */}
      {activeTab === 'books' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBooks.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl bg-neutral-900/70 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div className="h-44 overflow-hidden relative group">
                <img
                  src={b.coverImageUrl}
                  alt={b.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                  {b.level}
                </span>
              </div>

              <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-0.5">{b.author}</p>
                  <p className="text-[11px] text-neutral-400 mt-2 line-clamp-3">
                    {b.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">
                    Olympiad Core
                  </span>
                  <a
                    href={b.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    <span>Reference</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
