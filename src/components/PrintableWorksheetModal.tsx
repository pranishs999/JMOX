import React, { useState } from 'react';
import { ProblemSetModel } from '../types';
import { DiagramRenderer } from './DiagramRenderer';
import { Printer, X, Eye, EyeOff, CheckCircle, FileText } from 'lucide-react';

interface PrintableWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  problemSet: ProblemSetModel;
}

export const PrintableWorksheetModal: React.FC<PrintableWorksheetModalProps> = ({
  isOpen,
  onClose,
  problemSet,
}) => {
  const [showAnswerKey, setShowAnswerKey] = useState(false);

  if (!isOpen) return null;

  const { header, blocks } = problemSet;

  const handlePrint = () => {
    window.print();
  };

  // Flatten all questions for OMR bubble grid
  const allQuestions = blocks.flatMap((b) => b.questions);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex justify-center p-2 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible">
      {/* Container Dialog */}
      <div className="bg-neutral-900 border border-white/20 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col overflow-hidden print:border-none print:shadow-none print:bg-white print:w-full print:max-w-none print:rounded-none">
        {/* Modal Controls Bar (Hidden during Print) */}
        <div className="p-4 bg-neutral-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-amber-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Official Examination Paper Preview & Print
              </h3>
              <p className="text-xs text-neutral-400">
                Print-ready format adhering to the JMOX Academic Mathematics Division standard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              id="btn-toggle-answer-key"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                showAnswerKey
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-neutral-800 border-white/10 text-neutral-300 hover:text-white'
              }`}
            >
              {showAnswerKey ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>{showAnswerKey ? 'Hide Marking Scheme' : 'Show Teacher Answer Key'}</span>
            </button>

            <button
              onClick={handlePrint}
              id="btn-trigger-print"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md"
            >
              <Printer size={15} />
              <span>Print Paper (PDF)</span>
            </button>

            <button
              onClick={onClose}
              id="btn-close-printable"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Paper Sheet (White canvas for authentic paper rendering) */}
        <div className="p-6 sm:p-10 bg-white text-black font-serif overflow-y-auto max-h-[85vh] print:max-h-none print:overflow-visible print:p-0">
          {/* Outer Olympiad Border */}
          <div className="border-4 border-black p-6 sm:p-8 rounded-sm">
            {/* Inner Thin Border */}
            <div className="border border-black p-6 sm:p-8">
              {/* Header */}
              <div className="text-center border-b-2 border-black pb-4">
                <div className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-700">
                  {header.instituteName || 'JMS BRANCH – HRIC'}
                </div>
                <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider mt-1 text-black font-serif">
                  {header.divisionName.split('\n')[0] || 'HETAUDA RESEARCH & INNOVATION CENTER'}
                </h1>
                {header.divisionName.split('\n')[1] && (
                  <div className="text-sm font-bold uppercase tracking-widest text-neutral-800 mt-0.5">
                    {header.divisionName.split('\n')[1]}
                  </div>
                )}
                <div className="mt-2 text-lg sm:text-xl font-extrabold uppercase tracking-wide underline underline-offset-4 decoration-2">
                  {header.assessmentTitle}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-sans font-semibold border-t border-black/30 pt-2 px-2">
                  <div><strong>Academic Year:</strong> {header.academicYear}</div>
                  <div><strong>Class / Batch:</strong> {header.className} {header.batchName ? `(${header.batchName})` : ''}</div>
                  <div><strong>Time Allowed:</strong> {header.durationMinutes} Minutes</div>
                  <div><strong>Maximum Marks:</strong> {header.totalMarks} Marks</div>
                </div>
              </div>

              {/* Candidate Identification Box */}
              <div className="my-4 border border-black p-3 bg-neutral-50 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6">
                  <div className="flex items-center">
                    <span className="font-bold w-36">Candidate Full Name:</span>
                    <span className="flex-1 border-b border-black border-dotted"></span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-36">Public ID / Roll No:</span>
                    <span className="flex-1 border-b border-black border-dotted font-mono">STU-________</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-36">Center / Examination Hall:</span>
                    <span className="flex-1 border-b border-black border-dotted">Hetauda Central Campus</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold w-36">Invigilator Signature:</span>
                    <span className="flex-1 border-b border-black border-dotted"></span>
                  </div>
                </div>
              </div>

              {/* Instructions Summary */}
              <div className="mb-6 p-3 bg-neutral-100/70 border border-neutral-300 text-[11px] font-sans leading-relaxed">
                <strong className="block font-bold text-neutral-900 mb-1">GENERAL INSTRUCTIONS:</strong>
                <ol className="list-decimal list-inside space-y-0.5 text-neutral-800">
                  {header.instructions.map((inst, i) => (
                    <li key={i}>{inst}</li>
                  ))}
                </ol>
              </div>

              {/* Sections / Blocks & Questions */}
              <div className="space-y-8">
                {blocks.map((block) => {
                  const blockTotalMarks = block.questions.reduce((sum, q) => sum + q.positiveMarks, 0);

                  return (
                    <div key={block.id} className="border-t-2 border-black pt-4">
                      {/* Block Title Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-black text-white px-3 py-1.5 font-sans mb-4">
                        <div className="font-bold text-sm tracking-wide uppercase">
                          {block.title}
                        </div>
                        <div className="text-xs font-mono font-semibold">
                          Total Weightage: {blockTotalMarks} Marks
                        </div>
                      </div>

                      {block.description && (
                        <p className="text-xs italic text-neutral-700 font-sans mb-3 px-1">
                          {block.description} {block.instructions ? `• ${block.instructions}` : ''}
                        </p>
                      )}

                      {/* Questions in Block */}
                      <div className="space-y-6">
                        {block.questions.map((q) => (
                          <div key={q.id} className="text-xs font-sans pb-4 border-b border-neutral-200 last:border-b-0">
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <div className="font-bold text-sm text-black flex items-center gap-1.5 font-serif">
                                <span className="underline">Q.{q.questionNumber}</span>
                                {q.tag && (
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-200 rounded text-neutral-700 uppercase font-bold">
                                    {q.tag}
                                  </span>
                                )}
                              </div>
                              <div className="text-neutral-700 font-mono font-bold text-[11px]">
                                [{q.positiveMarks} {q.positiveMarks === 1 ? 'Mark' : 'Marks'}
                                {q.negativeMarks ? `, -${q.negativeMarks} Neg.` : ''}]
                              </div>
                            </div>

                            <p className="text-neutral-900 leading-relaxed text-xs sm:text-sm font-serif">
                              {q.text}
                            </p>

                            {/* Render Diagram if present */}
                            {q.diagram && q.diagram.type !== 'none' && (
                              <div className="my-2 p-2 bg-neutral-50 rounded border border-neutral-200 max-w-sm mx-auto text-center">
                                <DiagramRenderer diagram={q.diagram} className="bg-transparent border-0 my-1" />
                              </div>
                            )}

                            {/* MCQ Options */}
                            {q.options && q.options.length > 0 && (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pl-4">
                                {q.options.map((opt) => (
                                  <div key={opt.id} className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full border border-black flex items-center justify-center font-bold text-[11px] font-mono">
                                      {opt.id}
                                    </span>
                                    <span className="text-neutral-800 text-xs">{opt.text}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Numerical Answer Space */}
                            {q.type === 'numerical' && (
                              <div className="mt-2 pl-4 flex items-center gap-2">
                                <span className="font-semibold text-neutral-700 text-xs">Answer:</span>
                                <span className="w-28 h-6 border border-black border-dashed rounded flex items-center px-2 font-mono text-xs">
                                  {showAnswerKey ? q.correctAnswer : ''}
                                </span>
                              </div>
                            )}

                            {/* Teacher Answer Key & Solution (Visible only when toggled) */}
                            {showAnswerKey && (
                              <div className="mt-3 p-2.5 bg-amber-50 border border-amber-300 rounded text-xs font-sans text-amber-950">
                                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                                  <CheckCircle size={14} className="text-amber-700" />
                                  <span>Answer Key: {q.correctAnswer}</span>
                                </div>
                                <div className="text-[11px] leading-relaxed text-neutral-800 font-serif">
                                  <strong>Step Explanation:</strong> {q.explanation}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Physical OMR Bubble Grid at the end */}
              <div className="mt-8 border-t-2 border-black pt-4 font-sans page-break-inside-avoid">
                <div className="text-center font-bold uppercase text-xs tracking-wider mb-2">
                  Official Candidate Answer Sheet Grid (Fill in with HB pencil or blue/black pen)
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 border border-black p-3 bg-neutral-50 text-xs">
                  {allQuestions.map((q) => (
                    <div key={q.id} className="flex items-center justify-between border-b border-neutral-300 pb-1">
                      <span className="font-mono font-bold text-[11px]">Q.{q.questionNumber}</span>
                      {q.options && q.options.length > 0 ? (
                        <div className="flex items-center gap-1">
                          {q.options.map((opt) => (
                            <span
                              key={opt.id}
                              className={`w-4 h-4 rounded-full border border-black flex items-center justify-center text-[9px] font-mono font-bold ${
                                showAnswerKey && opt.id === q.correctAnswer
                                  ? 'bg-black text-white'
                                  : 'bg-white text-black'
                              }`}
                            >
                              {opt.id}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="w-12 h-4 border border-black border-dotted text-[9px] flex items-center justify-center font-mono">
                          {showAnswerKey ? q.correctAnswer : ''}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* End of paper marker */}
              <div className="mt-8 text-center text-xs font-mono font-bold uppercase tracking-widest text-neutral-500">
                — End of Assessment Paper • HRIC Academic Mathematics Division —
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
