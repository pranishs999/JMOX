import { useState } from 'react'
import { Download, Trophy } from 'lucide-react'

interface RankingRecord {
  rank: number
  student_public_id: string
  student_name: string
  class_name: string
  total_score: number
  max_possible: number
  percentage: number
  section_scores: string
  is_tied: boolean
}

export default function RankingsPage() {
  const [scope, setScope] = useState<'class' | 'cross-class'>('class')
  const [selectedPaper, setSelectedPaper] = useState('paper-1')

  const rankingsData: RankingRecord[] = [
    {
      rank: 1,
      student_public_id: 'STU-1001',
      student_name: 'Alice Johnson',
      class_name: 'Class 10-A',
      total_score: 92,
      max_possible: 100,
      percentage: 92.0,
      section_scores: 'Sec A: 30/30 | Sec B: 32/35 | Sec C: 30/35',
      is_tied: false,
    },
    {
      rank: 2,
      student_public_id: 'STU-1002',
      student_name: 'Bob Smith',
      class_name: 'Class 10-A',
      total_score: 85,
      max_possible: 100,
      percentage: 85.0,
      section_scores: 'Sec A: 28/30 | Sec B: 27/35 | Sec C: 30/35',
      is_tied: false,
    },
    {
      rank: 3,
      student_public_id: 'STU-1004',
      student_name: 'David Miller',
      class_name: 'Class 10-B',
      total_score: 85,
      max_possible: 100,
      percentage: 85.0,
      section_scores: 'Sec A: 25/30 | Sec B: 30/35 | Sec C: 30/35',
      is_tied: true,
    },
    {
      rank: 4,
      student_public_id: 'STU-1003',
      student_name: 'Charlie Brown',
      class_name: 'Class 9-A',
      total_score: 72,
      max_possible: 100,
      percentage: 72.0,
      section_scores: 'Sec A: 24/30 | Sec B: 24/35 | Sec C: 24/35',
      is_tied: false,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">Competition Leaderboard & Rankings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Standard competition ranking with section-score tie breaking & cross-class percentage ordering
          </p>
        </div>
        <button
          onClick={() => alert('Downloading official leaderboard CSV...')}
          className="flex items-center gap-2 px-4 py-2 bg-white text-gray-950 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          Export Rankings CSV
        </button>
      </div>

      {/* Scope & Paper Filter Bar */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Scope Selector Tabs */}
          <div className="flex bg-gray-950 p-1 rounded-lg border border-white/[0.08] w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setScope('class')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                scope === 'class'
                  ? 'bg-white text-gray-950 shadow-sm'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Class-Wise Rankings
            </button>
            <button
              type="button"
              onClick={() => setScope('cross-class')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                scope === 'cross-class'
                  ? 'bg-white text-gray-950 shadow-sm'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              Cross-Class Leaderboard
            </button>
          </div>

          {/* Paper Select Dropdown */}
          <div className="w-full sm:w-72">
            <select
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="w-full bg-gray-950 border border-white/[0.08] text-gray-300 text-sm rounded-lg px-3.5 py-2 focus:outline-none focus:border-gray-500 cursor-pointer"
            >
              <option value="paper-1">JMO 2026 Preliminary Exam (Paper 1)</option>
              <option value="paper-2">JMO 2026 Finals (Paper 2)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Official Competition Leaderboard ({scope === 'class' ? 'Class-Wise' : 'Cross-Class'})
          </h3>
          <span className="text-xs text-gray-500 font-mono">Tie-Breaker Enabled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Rank</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Public ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Class</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Score</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Percentage</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Section Breakup</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {rankingsData.map((rk) => (
                <tr key={rk.student_public_id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3.5 text-center font-bold">
                    {rk.rank === 1 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-extrabold">
                        🥇 1
                      </span>
                    ) : rk.rank === 2 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-300/20 text-slate-200 border border-slate-300/30 text-xs font-extrabold">
                        🥈 2
                      </span>
                    ) : rk.rank === 3 ? (
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-amber-700/20 text-amber-400 border border-amber-700/30 text-xs font-extrabold">
                        🥉 3
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">{rk.rank}</span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-gray-400">{rk.student_public_id}</td>
                  <td className="px-4 py-3.5 font-medium text-white flex items-center gap-2">
                    {rk.student_name}
                    {rk.is_tied && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                        Tied
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3.5 text-gray-400 text-xs">{rk.class_name}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-white">{rk.total_score} / {rk.max_possible}</td>
                  <td className="px-4 py-3.5 text-right font-medium text-gray-300">{rk.percentage}%</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 font-mono">
                    {rk.section_scores}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
