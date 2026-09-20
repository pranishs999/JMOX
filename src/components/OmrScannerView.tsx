import React, { useState } from 'react';
import {
  ScanLine,
  Camera,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Eye,
  FileCheck,
  Award,
  Sparkles,
  Check,
  X,
} from 'lucide-react';
import { StudentModel, OMRScannedItem } from '../types';

interface OmrScannerViewProps {
  students: StudentModel[];
  scannedQueue: OMRScannedItem[];
  onApproveScan: (item: OMRScannedItem) => void;
  onAddNewScan: (item: OMRScannedItem) => void;
}

export const OmrScannerView: React.FC<OmrScannerViewProps> = ({
  students,
  scannedQueue,
  onApproveScan,
  onAddNewScan,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(
    students[0]?.publicId || 'STU-98216'
  );
  const [currentScanResult, setCurrentScanResult] = useState<OMRScannedItem | null>(
    null
  );

  const handleTriggerScan = () => {
    setIsProcessing(true);
    setCurrentScanResult(null);

    const student =
      students.find((s) => s.publicId === selectedStudentId) || students[0];

    setTimeout(() => {
      setIsProcessing(false);
      const randomScore = Math.floor(38 + Math.random() * 12);
      const confidence = +(97 + Math.random() * 2.8).toFixed(1);

      const generatedAnswers: Record<number, string> = {
        1: 'C',
        2: 'A',
        3: 'D',
        4: 'B',
        5: 'C',
        6: 'A',
        7: 'B',
        8: 'D',
        9: 'A',
        10: 'C',
      };

      const newScan: OMRScannedItem = {
        id: `omr-${Date.now()}`,
        studentPublicId: student.publicId,
        studentName: student.fullName,
        detectedScore: randomScore,
        maxScore: 50,
        confidence,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        status: 'pending_review',
        answers: generatedAnswers,
      };

      setCurrentScanResult(newScan);
      onAddNewScan(newScan);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Optical Mark Recognition (OMR) Scanner
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            High-efficiency on-device bubble sheet scanning with corner fiducials and human-in-the-loop review
          </p>
        </div>

        {/* Candidate Selector for Simulator */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-neutral-400 whitespace-nowrap">
            Target Candidate:
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
          >
            {students.map((s) => (
              <option key={s.id} value={s.publicId}>
                {s.publicId} - {s.fullName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Scanner Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Viewfinder & Simulated Camera (8 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-2xl bg-neutral-900 border-2 border-amber-500/40 overflow-hidden shadow-2xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6">
            {/* Corner Fiducial Markers */}
            <div className="absolute top-4 left-4 font-mono text-emerald-400 font-black text-sm tracking-widest select-none">
              ┌── 1001 ──┐
            </div>
            <div className="absolute top-4 right-4 font-mono text-emerald-400 font-black text-sm tracking-widest select-none">
              ┌── 1002 ──┐
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-emerald-400 font-black text-sm tracking-widest select-none">
              └── 1003 ──┘
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-emerald-400 font-black text-sm tracking-widest select-none">
              └── 1004 ──┘
            </div>

            {/* Viewfinder Bounding Guide */}
            <div className="absolute inset-8 sm:inset-12 border-2 border-emerald-500/60 rounded-xl pointer-events-none flex flex-col justify-between p-3">
              <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300">
                <span>OMR-GRID-V2</span>
                <span>FROZEN FRAMES: 60FPS</span>
              </div>
              {/* Animated scanning line when processing */}
              {isProcessing && (
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />
              )}
              <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300">
                <span>CONTOUR ALIGNED</span>
                <span>TARGET: {selectedStudentId}</span>
              </div>
            </div>

            {/* Central View Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center z-10 space-y-3 my-auto">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all ${
                  isProcessing
                    ? 'bg-amber-500/20 border-amber-500 text-amber-400 animate-spin'
                    : 'bg-white/5 border-white/10 text-neutral-400'
                }`}
              >
                {isProcessing ? <RefreshCw size={28} /> : <ScanLine size={32} />}
              </div>

              <div>
                <h3 className="text-base font-bold text-white">
                  {isProcessing
                    ? 'Processing Bubble Intensities & Dark Mark Thresholds...'
                    : 'Position OMR Sheet Within Fiducial Frame'}
                </h3>
                <p className="text-xs text-neutral-400 max-w-sm mt-1">
                  Align corner fiducials to trigger auto-perspective warp and grayscale bubble segmentation.
                </p>
              </div>

              {/* Sample Bubble Sheet Preview in Viewfinder */}
              <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-left font-mono text-[10px] text-neutral-300 space-y-1 w-64 shadow-lg backdrop-blur-sm">
                <div className="flex justify-between border-b border-white/10 pb-1 text-amber-300">
                  <span>Q.1 - 5</span>
                  <span>DETECTION: READY</span>
                </div>
                <div className="flex justify-between">
                  <span>1. ◯ A ◯ B ● C ◯ D</span>
                  <span className="text-emerald-400">C (99%)</span>
                </div>
                <div className="flex justify-between">
                  <span>2. ● A ◯ B ◯ C ◯ D</span>
                  <span className="text-emerald-400">A (98%)</span>
                </div>
                <div className="flex justify-between">
                  <span>3. ◯ A ◯ B ◯ C ● D</span>
                  <span className="text-emerald-400">D (99%)</span>
                </div>
              </div>
            </div>

            {/* Capture Button Bar */}
            <div className="z-10 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <span className="text-xs text-neutral-400 font-mono">
                Model: OpenCV On-Device Edge Pipeline
              </span>
              <button
                onClick={handleTriggerScan}
                disabled={isProcessing}
                id="btn-capture-omr"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors shadow disabled:opacity-50"
              >
                <Camera size={16} />
                <span>
                  {isProcessing ? 'Analyzing Bubbles...' : 'Capture & Process Sheet'}
                </span>
              </button>
            </div>
          </div>

          {/* Latest Result Banner */}
          {currentScanResult && (
            <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">
                    Sheet Evaluated: {currentScanResult.studentPublicId} (
                    {currentScanResult.studentName})
                  </div>
                  <div className="text-[11px] text-emerald-200">
                    Detected Score: <strong>{currentScanResult.detectedScore} / 50 pts</strong> • Confidence: {currentScanResult.confidence}%
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                Ready for Review
              </span>
            </div>
          )}
        </div>

        {/* Right: Human-in-the-Loop Review Queue (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-neutral-900/70 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileCheck size={16} className="text-amber-400" />
                  Verification Queue ({scannedQueue.length})
                </h3>
                <p className="text-[11px] text-neutral-400">
                  Human verification required before score publishing
                </p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Audit Active
              </span>
            </div>

            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {scannedQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-neutral-950/70 border border-white/5 space-y-2 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">
                        {item.studentName}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {item.studentPublicId} • {item.timestamp}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                        item.status === 'verified'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      }`}
                    >
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                    <div>
                      <span className="text-neutral-400">Score:</span>{' '}
                      <strong className="text-white font-mono">
                        {item.detectedScore} / {item.maxScore}
                      </strong>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Optical Confidence: <span className="text-emerald-400">{item.confidence}%</span>
                    </div>
                  </div>

                  {item.status === 'pending_review' && (
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => onApproveScan(item)}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors"
                      >
                        <Check size={12} />
                        <span>Approve & Publish Score</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
